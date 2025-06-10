# credit Module Context Snapshot

- Frontend Path: /pages/credit.tsx
- Backend Path: (mock data, will connect API later)
- Tech Stack: React + Tailwind (frontend)

API Spec:
- (Mock data, will connect to backend for credit transfer, loan, and status later)

DB Schema:

- Table: credits

  - id: serial, primary key
  - user_id: uuid
  - amount: integer
  - updated_at: timestamp

- Table: credit_transfers

  - id: serial, primary key
  - from_user: uuid
  - to_user: uuid
  - amount: integer
  - created_at: timestamp

- Table: credit_loans

  - id: serial, primary key
  - user_id: uuid
  - amount: integer
  - interest_rate: float
  - status: text (รออนุมัติ/อนุมัติแล้ว/ชำระแล้ว)
  - created_at: timestamp
  - updated_at: timestamp

UI Components:

- CreditPage (แสดงยอดเครดิต, โอนเครดิต, ยืมเครดิต, ติดตามสถานะ)

Dependencies:

- Tailwind CSS
- components/Navbar

Security:
- (จะเพิ่มระบบ auth และตรวจสอบสิทธิ์ในอนาคต)

Testing:
- Manual UI/UX test, mock data, credit/loan flow

Version: v1.0.0 (Mock, will connect API later)
