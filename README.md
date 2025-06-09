<<<<<<< HEAD
# My Social App (Modular Edition)

## วิธีเริ่มต้นใช้งาน

1. ติดตั้ง dependencies
   ```
   npm install
   ```

2. สร้างไฟล์ `.env.local` (อ้างอิงจาก `.env.local.example`) กรอกค่า Supabase Project
3. รันโปรเจค
   ```
   npm run dev
   ```

4. (ถ้าใช้งานฐานข้อมูล) รัน `schema.sql` ที่ Supabase SQL Editor

## Deploy บน Vercel

1. Push โค้ดขึ้น GitHub
2. นำ repo ไปเชื่อมกับ Vercel (https://vercel.com/import)
3. ตั้งค่า Environment variables ตาม Supabase
4. Deploy!

## โครงสร้างโปรเจค (สำคัญ)

- pages/         : Next.js pages
- public/        : ไฟล์ assets
- components/    : React component
- contexts/, utils/, docs/ : โมดูล/ไกด์/ฟังก์ชันเสริม
- schema.sql     : Database schema
- .env.local     : Environment variable
- .github/       : Workflow/CI/CD
=======
# R-M-T
>>>>>>> 8393000593564239e61ddc8b6db12b0253491328
