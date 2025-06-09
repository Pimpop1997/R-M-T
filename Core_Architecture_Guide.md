
# Core Architecture Guide

## Core Version: v1.0.0

## Backend
- Node.js (v18+)
- ExpressJS
- Supabase as backend database
- JWT for authentication
- Bcrypt for password hashing

## Frontend
- ReactJS
- Tailwind CSS

## Structure Conventions
- API path: /api/[module_name]/action
- DB Schema: Supabase schema per module
- Security: JWT expires in 1 hour, Bcrypt password hashing
