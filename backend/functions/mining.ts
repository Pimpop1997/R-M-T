// Mining module backend entry point
// API: GET /api/mining/machines, POST /api/mining/start, POST /api/mining/stop
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

function getUserIdFromReq(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.id;
  } catch {
    return null;
  }
}

export async function getMiningMachines(req, res) {
  const { data: machines, error } = await supabase.from('mining_machines').select('id,name,rate,price');
  if (error) return res.status(500).json({ error: 'โหลดเครื่องขุดไม่สำเร็จ' });
  return res.json({ machines });
}

export async function startMining(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { machine_id } = req.body;
  if (!machine_id) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  // ตรวจสอบเครื่องขุด
  const { data: machine } = await supabase.from('mining_machines').select('id,rate').eq('id', machine_id).single();
  if (!machine) return res.status(404).json({ error: 'ไม่พบเครื่องขุด' });
  // บันทึกการเริ่มขุด (mock: สร้าง mining_session)
  await supabase.from('mining_sessions').insert({ user_id: userId, machine_id, started_at: new Date().toISOString() });
  return res.status(201).json({ message: 'เริ่มขุดสำเร็จ' });
}

export async function stopMining(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  // หยุด session ล่าสุด (mock: อัปเดต ended_at)
  const { data: session } = await supabase.from('mining_sessions').select('id,started_at,machine_id').eq('user_id', userId).is('ended_at', null).order('started_at', { ascending: false }).limit(1).single();
  if (!session) return res.status(404).json({ error: 'ไม่พบ session ที่กำลังขุด' });
  const ended_at = new Date().toISOString();
  await supabase.from('mining_sessions').update({ ended_at }).eq('id', session.id);
  // คำนวณเครดิตที่ขุดได้ (mock: rate * ชั่วโมง)
  const { data: machine } = await supabase.from('mining_machines').select('rate').eq('id', session.machine_id).single();
  const hours = (new Date(ended_at).getTime() - new Date(session.started_at).getTime()) / 3600000;
  const credit = machine ? machine.rate * hours : 0;
  // เพิ่มเครดิตให้ user (สมมุติ field credit)
  const { data: user } = await supabase.from('users').select('credit').eq('id', userId).single();
  await supabase.from('users').update({ credit: (user.credit || 0) + credit }).eq('id', userId);
  return res.json({ message: 'หยุดขุดสำเร็จ', credit_earned: credit });
}

// ตัวอย่าง Express route mapping (pseudo)
// app.get('/api/mining/machines', getMiningMachines)
// app.post('/api/mining/start', startMining)
// app.post('/api/mining/stop', stopMining)
