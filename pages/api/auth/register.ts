import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../utils/supabaseServer';
import { signToken, hashPassword } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  }

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .or(`username.eq.${username},email.eq.${email}`)
    .maybeSingle();

  if (existing) return res.status(400).json({ error: 'username หรือ email ถูกใช้แล้ว' });

  const password_hash = await hashPassword(password);
  const { data, error } = await supabase
    .from('users')
    .insert({ username, email, password_hash })
    .select('id,username,email')
    .single();

  if (error || !data) return res.status(500).json({ error: 'สมัครสมาชิกไม่สำเร็จ' });

  const token = signToken({ id: data.id });
  return res.status(201).json({ token, user: data });
}
