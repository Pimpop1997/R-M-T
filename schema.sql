-- User table
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  username text unique not null,
  email text unique not null,
  password_hash text not null,
  name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Post table
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  content text,
  image_url text,
  created_at timestamptz default now()
);
