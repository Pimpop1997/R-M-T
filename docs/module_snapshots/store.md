# pet-rental Module Context Snapshot

- Frontend Path: /pages/pet-rental.tsx
- Backend Path: (mock data, will connect API later)
- Tech Stack: React + Tailwind (frontend)

API Spec:
- (Mock data, will connect to backend for pet rental, admin management later)

DB Schema:

- Table: pets
  - id: serial, primary key
  - name: text
  - bonus: float (0.1 = 10%)
  - price: integer
  - type: text (รายวัน/รายเดือน)

UI Components:

- PetRentalPage (เช่าสัตว์เลี้ยง, แสดงโบนัส, ราคาค่าเช่า, ปุ่มเช่า, สถานะ)
- AdminPetDashboard (เพิ่ม/แก้ไข/ลบสัตว์เลี้ยง, ปรับโบนัส/ราคา/ประเภท)

Dependencies:

- Tailwind CSS
- components/Navbar

Security:
- (จะเพิ่มระบบ auth และตรวจสอบสิทธิ์ในอนาคต)

Testing:
- Manual UI/UX test, mock data, pet rental flow

Version: v1.0.0 (Mock, will connect API later)
