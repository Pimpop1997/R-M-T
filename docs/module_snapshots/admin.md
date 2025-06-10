# admin Module Context Snapshot

- Frontend Path: /frontend/src/modules/admin (UI อยู่ที่ /pages/admin.tsx)
- Backend Path: /backend/functions/admin.ts (mock)
- Tech Stack: React + Tailwind (frontend), Node.js + Supabase (backend)

API Spec (mock):
- GET /admin/users — ค้นหาสมาชิก
- POST /admin/credit — โอน/ยึดเครดิตสมาชิก
- POST /admin/interest — ปรับดอกเบี้ยรายชั่วโมง
- POST /admin/mining-machine — เพิ่ม/ลบ/แก้ไขเครื่องขุด
- POST /admin/pet-bonus — ปรับโบนัสสัตว์เลี้ยง
- GET /admin/logins — ดูประวัติล็อกอิน
- GET /admin/transactions — ดูประวัติธุรกรรม
- POST /admin/chat — แชทกับสมาชิก
- POST /admin/loan/approve — อนุมัติสินเชื่อ

DB Schema (mock):
- users(id, username, email, credit, ...)
- mining_machines(id, name, rate, price)
- pet_bonus(percent)
- interest_rate(percent_per_hour)
- credit_transactions(id, user_id, amount, type, ...)
- loans(id, user_id, amount, status)

UI Components:
- ค้นหาสมาชิก, ดู/แชทกับสมาชิก, ดูประวัติล็อกอิน/ธุรกรรม
- จัดการเครดิต: โอน/ยึดเครดิตสมาชิก (input, select, ปุ่ม)
- ปรับดอกเบี้ยรายชั่วโมง (input + ปุ่มบันทึก)
- ขาย/จัดการเครื่องขุดเหรียญ (ตาราง, เพิ่ม/ลบ/แก้ไข)
- ปรับโบนัสสัตว์เลี้ยง (input + ปุ่มบันทึก)
- อนุมัติสินเชื่อ (mock)
- ธีมแฮกเกอร์ สีเขียว-ดำ Responsive

Dependencies:
- React, TailwindCSS

Security:
- เฉพาะ admin เท่านั้นที่เข้าถึงได้ (mock)
- ตรวจสอบ log และธุรกรรมได้

Testing:
- ทดสอบ UI/UX ด้วย mock data/action

Version: v1.1.0 (อัปเดต 2025-06-09, เพิ่มฟีเจอร์ควบคุมระบบ admin)
