// Admin module backend entry point
// API: GET /api/admin/users, POST /api/admin/credit, POST /api/admin/interest, POST /api/admin/mining-machine, POST /api/admin/pet-bonus, GET /api/admin/logins, GET /api/admin/transactions, POST /api/admin/chat, POST /api/admin/loan/approve
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

async function isAdmin(userId) {
  // สมมุติ admin id = 1 หรือ users table มี is_admin
  if (userId === 1) return true;
  const { data: user } = await supabase.from('users').select('is_admin').eq('id', userId).single();
  return !!user?.is_admin;
}

export async function getUsers(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { data: users, error } = await supabase.from('users').select('id,username,email,credit,created_at');
  if (error) return res.status(500).json({ error: 'โหลด users ไม่สำเร็จ' });
  return res.json({ users });
}

export async function adminCreditAction(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { target, amount, action } = req.body; // action: 'transfer'|'seize'
  if (!target || !amount || amount <= 0) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  const { data: user } = await supabase.from('users').select('credit').eq('username', target).single();
  if (!user) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
  let newCredit = user.credit;
  if (action === 'transfer') newCredit += amount;
  if (action === 'seize') newCredit = Math.max(0, newCredit - amount);
  await supabase.from('users').update({ credit: newCredit }).eq('username', target);
  await supabase.from('credit_transactions').insert({ from_id: null, to_id: user.id, amount, type: action });
  return res.json({ message: 'สำเร็จ' });
}

export async function setInterest(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { percent } = req.body;
  if (typeof percent !== 'number' || percent < 0) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  await supabase.from('interest_rate').upsert({ id: 1, percent_per_hour: percent });
  return res.json({ message: 'บันทึกดอกเบี้ยสำเร็จ' });
}

export async function manageMiningMachine(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { action, id, name, rate, price } = req.body;
  if (action === 'add') {
    if (!name || !rate || !price) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
    await supabase.from('mining_machines').insert({ name, rate, price });
  } else if (action === 'remove') {
    if (!id) return res.status(400).json({ error: 'ต้องระบุ id' });
    await supabase.from('mining_machines').delete().eq('id', id);
  }
  return res.json({ message: 'สำเร็จ' });
}

export async function setPetBonus(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { percent } = req.body;
  if (typeof percent !== 'number' || percent < 0) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  await supabase.from('pet_bonus').upsert({ id: 1, percent });
  return res.json({ message: 'บันทึกโบนัสสัตว์เลี้ยงสำเร็จ' });
}

export async function getLogins(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { data: logs, error } = await supabase.from('security_logs').select('*').order('time', { ascending: false }).limit(100);
  if (error) return res.status(500).json({ error: 'โหลด log ไม่สำเร็จ' });
  return res.json({ logs });
}

export async function getTransactions(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { data: txs, error } = await supabase.from('credit_transactions').select('*').order('created_at', { ascending: false }).limit(100);
  if (error) return res.status(500).json({ error: 'โหลดธุรกรรมไม่สำเร็จ' });
  return res.json({ transactions: txs });
}

export async function adminChat(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { to, text } = req.body;
  if (!to || !text) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  // สมมุติ admin ส่งข้อความถึง user (insert to messages table)
  const { data: user } = await supabase.from('users').select('id').eq('username', to).single();
  if (!user) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
  await supabase.from('messages').insert({ text, sender: 'admin', to_id: user.id });
  return res.json({ message: 'ส่งข้อความสำเร็จ' });
}

export async function approveLoan(req, res) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { loan_id } = req.body;
  if (!loan_id) return res.status(400).json({ error: 'ต้องระบุ loan_id' });
  await supabase.from('loans').update({ status: 'อนุมัติแล้ว' }).eq('id', loan_id);
  return res.json({ message: 'อนุมัติสินเชื่อสำเร็จ' });
}

// ตัวอย่าง Express route mapping (pseudo)
// app.get('/api/admin/users', getUsers)
// app.post('/api/admin/credit', adminCreditAction)
// app.post('/api/admin/interest', setInterest)
// app.post('/api/admin/mining-machine', manageMiningMachine)
// app.post('/api/admin/pet-bonus', setPetBonus)
// app.get('/api/admin/logins', getLogins)
// app.get('/api/admin/transactions', getTransactions)
// app.post('/api/admin/chat', adminChat)
// app.post('/api/admin/loan/approve', approveLoan)
