# feed Module Context Snapshot

- Frontend Path: /pages/feed.tsx
- Backend Path: /backend/functions/feed.ts
- Tech Stack: React + Tailwind (frontend), Node.js + Supabase (backend)

API Spec:

- GET /api/feed — ดึงโพสต์ทั้งหมด (Auth: JWT)
- POST /api/posts — สร้างโพสต์ใหม่ (Auth: JWT, { content, image })
- POST /api/posts/:id/like — กดไลค์โพสต์ (Auth: JWT)
- POST /api/posts/:id/dislike — กดดิสไลค์โพสต์ (Auth: JWT)
- POST /api/posts/:id/comment — คอมเมนต์โพสต์ (Auth: JWT, { text })

DB Schema:

- Table: posts
  - id: serial, primary key
  - user_id: uuid, not null
  - content: text
  - image: text (nullable)
  - likes: integer, default 0
  - dislikes: integer, default 0
  - created_at: timestamp

- Table: comments
  - id: serial, primary key
  - post_id: integer, not null
  - user_id: uuid, not null
  - text: text
  - created_at: timestamp

UI Components:

- FeedPage (responsive, hacker theme)
- Create Post Form
- Post Card (avatar, username, content, image, like/dislike, comment)
- CommentBox
- Error/Loading State

Dependencies:

- contexts/AuthContext.tsx
- components/Navbar
- Tailwind CSS

Security:

- ใช้ JWT Auth ทุก endpoint
- ตรวจสอบสิทธิ์ user ก่อนโพสต์/คอมเมนต์/like/dislike

Testing:

- ทดสอบดึงโพสต์, สร้างโพสต์, like/dislike, คอมเมนต์ (API จริง)
- ทดสอบ UI/UX ทุกขนาดหน้าจอ
- ทดสอบ error/success state

Version: v1.1.0 (API จริง, ไม่มี mock, UI/UX hacker theme)
