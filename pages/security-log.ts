// Security Log module backend entry point
// API: GET /api/security-log
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

export async function getSecurityLogs(req, res) {
  // เฉพาะ admin หรือเจ้าของเท่านั้นที่ดู log ตัวเองได้
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  // ตรวจสอบสิทธิ์ (mock: สมมุติ admin id = 1)
  const isAdmin = userId === 1;
  const { data: logs, error } = await supabase
    .from('security_logs')
    .select('id,user:users(username),ip,fingerprint,time')
    .order('time', { ascending: false })
    .limit(isAdmin ? 100 : 20);
  if (error) return res.status(500).json({ error: 'โหลด log ไม่สำเร็จ' });
  // ถ้าไม่ใช่ admin ให้กรองเฉพาะ log ของตัวเอง
  const filtered = isAdmin ? logs : logs.filter(l => l.user_id === userId);
  return res.json({ logs: filtered });
}

// ตัวอย่าง Express route mapping (pseudo)
// app.get('/api/security-log', getSecurityLogs)
