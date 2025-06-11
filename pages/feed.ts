// Feed module backend entry point
// API: POST /api/feed/post, GET /api/feed, POST /api/feed/comment, POST /api/feed/like
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

export async function createPost(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { content, image } = req.body;
  if (!content) return res.status(400).json({ error: 'เนื้อหาโพสต์ว่าง' });
  const { error } = await supabase.from('posts').insert({ user_id: userId, content, image });
  if (error) return res.status(500).json({ error: 'โพสต์ไม่สำเร็จ' });
  return res.status(201).json({ message: 'โพสต์สำเร็จ' });
}

export async function getFeed(req, res) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id,content,image,created_at,user:users(username,avatar),likes,dislikes,comments:comments(id,user:users(username),text,created_at)')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: 'โหลดฟีดไม่สำเร็จ' });
  return res.json({ posts });
}

export async function addComment(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { post_id, text } = req.body;
  if (!post_id || !text) return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  const { error } = await supabase.from('comments').insert({ post_id, user_id: userId, text });
  if (error) return res.status(500).json({ error: 'คอมเมนต์ไม่สำเร็จ' });
  return res.status(201).json({ message: 'คอมเมนต์สำเร็จ' });
}

export async function likePost(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'ไม่ได้เข้าสู่ระบบ' });
  const { post_id, type } = req.body; // type: 'like' | 'dislike'
  if (!post_id || !['like','dislike'].includes(type)) return res.status(400).json({ error: 'ข้อมูลไม่ถูกต้อง' });
  // เพิ่ม/ลบ like/dislike (simple version: update counter)
  const field = type === 'like' ? 'likes' : 'dislikes';
  const { error } = await supabase.rpc('increment_post_field', { post_id, field });
  if (error) return res.status(500).json({ error: 'กดไลค์/ดิสไลค์ไม่สำเร็จ' });
  return res.json({ message: 'สำเร็จ' });
}

// ตัวอย่าง Express route mapping (pseudo)
// app.post('/api/feed/post', createPost)
// app.get('/api/feed', getFeed)
// app.post('/api/feed/comment', addComment)
// app.post('/api/feed/like', likePost)
