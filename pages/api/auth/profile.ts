import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../utils/supabaseServer';
import { verifyToken } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no token' });

  const token = auth.replace('Bearer ', '');
  const payload = verifyToken(token) as any;
  if (!payload) return res.status(401).json({ error: 'invalid token' });

  const { data: user, error } = await supabase
    .from('users')
    .select('id,username,email,created_at')
    .eq('id', payload.id)
    .single();

  if (error || !user) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });

  return res.json({ user });
}
