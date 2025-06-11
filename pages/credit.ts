// Credit module backend entry point
// API: POST /api/credit/transfer, POST /api/credit/loan, GET /api/credit/history
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

export async function transferCredit(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { to_email, amount } = req.body;
  if (!to_email || !amount || amount <= 0) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  // ดึงผู้รับ
  const { data: toUser } = await supabase.from('users').select('id').eq('email', to_email).single();
  if (!toUser) return res.status(404).json({ error: 'ไม่พบผู้รับ' });
  // ตรวจสอบเครดิตผู้ส่ง (สมมุติ field credit)
  const { data: fromUser } = await supabase.from('users').select('credit').eq('id', userId).single();
  if (!fromUser || fromUser.credit < amount) return res.status(400).json({ error: 'เครดิตไม่พอ' });
  // ทำธุรกรรม (ควรใช้ transaction จริง)
  await supabase.from('users').update({ credit: fromUser.credit - amount }).eq('id', userId);
  await supabase.from('users').update({ credit: (toUser.credit || 0) + amount }).eq('id', toUser.id);
  await supabase.from('credit_transactions').insert({ from_id: userId, to_id: toUser.id, amount, type: 'transfer' });
  return res.json({ message: 'โอนเครดิตสำเร็จ' });
}

export async function requestLoan(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'จำนวนไม่ถูกต้อง' });
  await supabase.from('loans').insert({ user_id: userId, amount, status: 'รออนุมัติ' });
  return res.status(201).json({ message: 'ขอสินเชื่อสำเร็จ' });
}

export async function getCreditHistory(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { data: txs, error } = await supabase
    .from('credit_transactions')
    .select('id,from_id,to_id,amount,type,created_at')
    .or(`from_id.eq.${userId},to_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: 'โหลดประวัติไม่สำเร็จ' });
  return res.json({ transactions: txs });
}

// ตัวอย่าง Express route mapping (pseudo)
// app.post('/api/credit/transfer', transferCredit)
// app.post('/api/credit/loan', requestLoan)
// app.get('/api/credit/history', getCreditHistory)
