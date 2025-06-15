import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../utils/supabaseServer';
import { signToken, comparePassword } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });

  const { data: user, error } = await supabase
    .from('users')
    .select('id,username,email,password_hash')
    .eq('email', email)
    .single();

  if (error || !user) return res.status(400).json({ error: 'อีเมลไม่ถูกต้อง' });

  const match = await comparePassword(password, user.password_hash);
  if (!match) return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง' });

  const token = signToken({ id: user.id });
  return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
}
