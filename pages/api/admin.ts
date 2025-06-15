// Next.js API Route for admin module (migrated from backend/functions/admin.ts)
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

function getUserIdFromReq(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return payload.id;
  } catch {
    return null;
  }
}

async function isAdmin(userId: any) {
  if (userId === 1) return true;
  const { data: user } = await supabase.from('users').select('is_admin').eq('id', userId).single();
  return !!user?.is_admin;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Route mapping by method & query param (e.g. ?action=users)
  const action = req.query.action || req.body.action;
  if (req.method === 'GET' && action === 'users') return getUsers(req, res);
  if (req.method === 'POST' && action === 'credit') return adminCreditAction(req, res);
  if (req.method === 'POST' && action === 'interest') return setInterest(req, res);
  if (req.method === 'POST' && action === 'mining-machine') return manageMiningMachine(req, res);
  if (req.method === 'POST' && action === 'pet-bonus') return setPetBonus(req, res);
  if (req.method === 'GET' && action === 'logins') return getLogins(req, res);
  if (req.method === 'GET' && action === 'transactions') return getTransactions(req, res);
  if (req.method === 'POST' && action === 'chat') return adminChat(req, res);
  if (req.method === 'POST' && action === 'loan-approve') return approveLoan(req, res);
  return res.status(404).json({ error: 'Not found' });
}

// ...Paste all exported functions from backend/functions/admin.ts below (getUsers, adminCreditAction, etc.)
// ...existing code from admin.ts (copy all export async function ...)

// --- Paste all exported functions from admin.ts here ---

export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { data: users, error } = await supabase.from('users').select('id,username,email,credit,created_at');
  if (error) return res.status(500).json({ error: 'โหลด users ไม่สำเร็จ' });
  return res.json({ users });
}

export async function adminCreditAction(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { target, amount, action } = req.body;
  if (!target || !amount || amount <= 0) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  const { data: user } = await supabase.from('users').select('id,credit').eq('username', target).single();
  if (!user) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
  let newCredit = user.credit;
  if (action === 'transfer') newCredit += amount;
  if (action === 'seize') newCredit = Math.max(0, newCredit - amount);
  await supabase.from('users').update({ credit: newCredit }).eq('username', target);
  await supabase.from('credit_transactions').insert({ from_id: null, to_id: user.id, amount, type: action });
  return res.json({ message: 'สำเร็จ' });
}

export async function setInterest(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { percent } = req.body;
  if (typeof percent !== 'number' || percent < 0) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  await supabase.from('interest_rate').upsert({ id: 1, percent_per_hour: percent });
  return res.json({ message: 'บันทึกดอกเบี้ยสำเร็จ' });
}

export async function manageMiningMachine(req: NextApiRequest, res: NextApiResponse) {
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

export async function setPetBonus(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { percent } = req.body;
  if (typeof percent !== 'number' || percent < 0) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  await supabase.from('pet_bonus').upsert({ id: 1, percent });
  return res.json({ message: 'บันทึกโบนัสสัตว์เลี้ยงสำเร็จ' });
}

export async function getLogins(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { data: logs, error } = await supabase.from('security_logs').select('*').order('time', { ascending: false }).limit(100);
  if (error) return res.status(500).json({ error: 'โหลด log ไม่สำเร็จ' });
  return res.json({ logs });
}

export async function getTransactions(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { data: txs, error } = await supabase.from('credit_transactions').select('*').order('created_at', { ascending: false }).limit(100);
  if (error) return res.status(500).json({ error: 'โหลดธุรกรรมไม่สำเร็จ' });
  return res.json({ transactions: txs });
}

export async function adminChat(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  // ...implement chat admin logic here...
  return res.json({ message: 'admin chat endpoint' });
}

export async function approveLoan(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserIdFromReq(req);
  if (!await isAdmin(userId)) return res.status(403).json({ error: 'forbidden' });
  const { loan_id } = req.body;
  if (!loan_id) return res.status(400).json({ error: 'ต้องระบุ loan_id' });
  await supabase.from('loans').update({ status: 'อนุมัติแล้ว' }).eq('id', loan_id);
  return res.json({ message: 'อนุมัติสินเชื่อสำเร็จ' });
}
