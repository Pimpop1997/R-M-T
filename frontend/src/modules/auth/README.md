# Auth Module

Implements user registration, login and profile fetch using Supabase and JWT.

### Related API routes

- `POST /api/auth/register` – register new account
- `POST /api/auth/login` – login and receive JWT
- `GET /api/auth/profile` – fetch profile by sending `Authorization: Bearer <token>`

See `docs/module_snapshots/auth.md` for full schema and design notes.
