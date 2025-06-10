# chat Module Context Snapshot

- Frontend Path: /pages/chat.tsx
- Backend Path: (Supabase Realtime/Storage, mock data, will connect API later)
- Tech Stack: React + Tailwind (frontend), Supabase (backend)

API Spec:
- (Mock data, will connect to Supabase Realtime/Storage API for messages and image upload)

DB Schema:
- Table: messages
  - id: serial, primary key
  - sender: text
  - text: text
  - image_url: text (nullable)
  - created_at: timestamp

UI Components:
- ChatPage (แชทสาธารณะ, ส่งข้อความ, แนบรูปภาพ, แสดงข้อความเรียลไทม์)

Dependencies:
- @supabase/supabase-js
- Tailwind CSS
- components/Navbar

Security:
- (จะเพิ่มระบบ auth และตรวจสอบสิทธิ์ในอนาคต)

Testing:
- Manual UI/UX test, mock data, realtime message flow

Version: v1.0.0 (Mock, will connect API later)
