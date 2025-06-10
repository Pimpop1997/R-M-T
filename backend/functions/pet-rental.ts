// Pet Rental module backend entry point
// API: GET /api/pet-rental, POST /api/pet-rental/rent
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

export async function getPets(req, res) {
  const { data: pets, error } = await supabase.from('pets').select('id,name,bonus,price,type');
  if (error) return res.status(500).json({ error: 'โหลดรายการสัตว์เลี้ยงไม่สำเร็จ' });
  return res.json({ pets });
}

export async function rentPet(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { pet_id } = req.body;
  if (!pet_id) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  // ตรวจสอบว่าสัตว์เลี้ยงมีอยู่จริง
  const { data: pet } = await supabase.from('pets').select('id,price').eq('id', pet_id).single();
  if (!pet) return res.status(404).json({ error: 'ไม่พบสัตว์เลี้ยง' });
  // ตรวจสอบเครดิตผู้ใช้ (สมมุติ field credit)
  const { data: user } = await supabase.from('users').select('credit').eq('id', userId).single();
  if (!user || user.credit < pet.price) return res.status(400).json({ error: 'เครดิตไม่พอ' });
  // หักเครดิตและบันทึกการเช่า (ควรใช้ transaction จริง)
  await supabase.from('users').update({ credit: user.credit - pet.price }).eq('id', userId);
  await supabase.from('pet_rentals').insert({ user_id: userId, pet_id });
  return res.status(201).json({ message: 'เช่าสัตว์เลี้ยงสำเร็จ' });
}

// ตัวอย่าง Express route mapping (pseudo)
// app.get('/api/pet-rental', getPets)
// app.post('/api/pet-rental/rent', rentPet)
