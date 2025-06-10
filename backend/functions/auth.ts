// Auth module backend entry point

// Implement API endpoints here
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
  const { data: exist } = await supabase.from('users').select('id').or(`username.eq.${username},email.eq.${email}`).single();
  if (exist) return res.status(409).json({ error: 'username หรือ email ถูกใช้แล้ว' });
  const password_hash = await bcrypt.hash(password, 10);
  const { error } = await supabase.from('users').insert({ username, email, password_hash });
  if (error) return res.status(500).json({ error: 'สมัครสมาชิกไม่สำเร็จ' });
  return res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ' });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
  const { data: user } = await supabase.from('users').select('*').eq('email', email).single();
  if (!user) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
}

export async function profile(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    const { data: user } = await supabase.from('users').select('id,username,email,created_at').eq('id', payload.id).single();
    if (!user) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
    return res.json({ user });
  } catch {
    return res.status(401).json({ error: 'Token ไม่ถูกต้อง' });
  }
}

// ตัวอย่าง Express route mapping (pseudo)
// app.post('/api/auth/register', register)
// app.post('/api/auth/login', login)
// app.get('/api/auth/profile', profile)
