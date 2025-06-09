
# Auth Module Context Snapshot

- Frontend Path: /frontend/src/modules/auth
- Backend Path: /backend/functions/auth.ts
- Tech Stack: React + Tailwind (frontend), Node.js + Supabase (backend)

API Spec:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

DB Schema:
- Table: users
  - id: UUID, primary key
  - username: text, unique, not null
  - email: text, unique, not null
  - password_hash: text, not null
  - created_at: timestamp, default now()

UI Components:
- RegisterForm
- LoginForm
- UserProfile

Dependencies:
- utils/auth.ts, Supabase Client v2.0.1

Security:
- Uses JWT, expires in 1hr
- Password hashed with bcrypt

Testing:
- 80% unit test coverage
- Integration: test register → login → get profile

Version: v1.0.0 (Compatible with Core v1.0.0)
