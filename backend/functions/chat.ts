// Chat module backend entry point
// API: GET /api/chat, POST /api/chat/message
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

export async function getChat(req, res) {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('id,text,sender,created_at,image_url')
    .order('created_at', { ascending: true })
    .limit(100);
  if (error) return res.status(500).json({ error: 'โหลดแชทไม่สำเร็จ' });
  return res.json({ messages });
}

export async function sendMessage(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { text, image_url } = req.body;
  if (!text && !image_url) return res.status(400).json({ error: 'ข้อความว่าง' });
  // ดึง username จาก users
  const { data: user } = await supabase.from('users').select('username').eq('id', userId).single();
  if (!user) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
  const { error } = await supabase.from('messages').insert({ text, sender: user.username, image_url });
  if (error) return res.status(500).json({ error: 'ส่งข้อความไม่สำเร็จ' });
  return res.status(201).json({ message: 'ส่งข้อความสำเร็จ' });
}

// ตัวอย่าง Express route mapping (pseudo)
// app.get('/api/chat', getChat)
// app.post('/api/chat/message', sendMessage)
