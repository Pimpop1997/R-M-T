# Prompt Template Context Snapshot

- File Path: /docs/Prompt_Template.md
- Purpose: ใช้เป็นเทมเพลตมาตรฐานสำหรับสร้างและอธิบายโมดูลใหม่ในโปรเจกต์ ThaiSocial
- โครงสร้างประกอบด้วย:
  - Context Snapshot (Frontend/Backend Path, Tech Stack)
  - API Spec (RESTful endpoints)
  - DB Schema (ตารางหลักและฟิลด์สำคัญ)
  - UI Components (ชื่อและพฤติกรรม)
  - Dependencies (ไลบรารี/โมดูลที่เกี่ยวข้อง)
  - Security (มาตรการความปลอดภัย)
  - Testing (แนวทางการทดสอบ)
  - Version (ความเข้ากันได้)
  - Output (ข้อกำหนดการส่งงาน)

- ข้อควรปฏิบัติ:
  - ทุกโมดูลใหม่ควรมีเอกสารตามเทมเพลตนี้ใน docs/module_snapshots/[module_name].md
  - ทุกครั้งที่สร้างหรือแก้ไขโมดูล ให้ update เอกสาร snapshot ให้ตรงกับโค้ดจริง
  - ใช้เทมเพลตนี้เป็นแนวทางในการสื่อสารและส่งงานระหว่างทีม

- อัปเดตล่าสุด: 2025-06-09

## Recommended Full Prompt Template



You are a full-stack developer.
Create the [MODULE_NAME] module for our ThaiSocial platform.

Context Snapshot:
- Frontend Path: /frontend/src/modules/[module_name]
- Backend Path: /backend/functions/[module_name].ts
- Tech Stack: React + Tailwind (frontend), Node.js + Supabase (backend)

API Spec:
- POST /api/[module_name]/action → {...} → {...} → {errors}

DB Schema:
- Table: [table_name]
  - id: UUID, primary key
  - ...

UI Components:
- [List component names and behavior]

Dependencies:
- [utils/auth.ts], Supabase Client v2.0.1

Security:
- Uses JWT, expires in 1hr
- Password hashed with bcrypt

Testing:
- 80% unit test coverage
- Integration: test [scenario X, Y]

Version: v1.0.0 (Compatible with Core v1.0.0)

**Output:**
- Create all code files for this module in correct paths
- Generate a .zip archive called [module_name].zip
- Include README.md with install instructions

Respond with the zip contents only. No extra explanation.
