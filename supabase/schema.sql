-- =====================================================================
--  MBSkills Coworking — Supabase / PostgreSQL schema
--  Run this file in the Supabase SQL editor (or via `psql`).
--
--  Tables
--    1. coworking_spaces       → desks, rooms, meeting rooms, etc.
--    2. coworking_availability → per-space daily availability snapshot
--    3. coworking_bookings     → booking / quote requests (optional but used)
--    4. coworking_admins       → whitelisted admin emails (optional,
--                                 only needed if you use Supabase Auth
--                                 instead of the built-in password gate).
--
--  RLS is enabled on every table. Public READ is allowed on spaces and
--  availability so the marketing site can consume them without a key.
--  Inserts/updates must go through the service-role key (used on the
--  server by the /api/coworking/admin routes).
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- 1) Spaces (desks, private offices, meeting rooms, event halls, ...)
-- ---------------------------------------------------------------------
create table if not exists public.coworking_spaces (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  type           text not null check (type in (
                    'desk',           -- hot-desk / open space
                    'private_desk',   -- dedicated desk
                    'office',         -- private office / team room
                    'meeting_room',   -- meeting / conference room
                    'event_space'     -- training / event hall
                  )),
  description    text,
  capacity       integer not null default 1 check (capacity >= 1),
  price_hour     numeric(10, 2),
  price_day      numeric(10, 2),
  price_month    numeric(10, 2),
  currency       text not null default 'TND',
  amenities      text[] not null default '{}',
  image_url      text,
  total_units    integer not null default 1,
  is_active      boolean not null default true,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists coworking_spaces_active_idx
  on public.coworking_spaces (is_active, sort_order);

-- ---------------------------------------------------------------------
-- 2) Availability (live snapshot per space, updated by the admin panel)
-- ---------------------------------------------------------------------
create table if not exists public.coworking_availability (
  id              uuid primary key default gen_random_uuid(),
  space_id        uuid not null references public.coworking_spaces(id)
                    on delete cascade,
  available_units integer not null default 0 check (available_units >= 0),
  status          text not null default 'available' check (status in (
                    'available', 'limited', 'full', 'closed'
                  )),
  opens_at        time,
  closes_at       time,
  note            text,
  updated_at      timestamptz not null default now(),
  unique (space_id)
);

create index if not exists coworking_availability_space_idx
  on public.coworking_availability (space_id);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_spaces_updated_at on public.coworking_spaces;
create trigger trg_spaces_updated_at
  before update on public.coworking_spaces
  for each row execute procedure public.set_updated_at();

drop trigger if exists trg_avail_updated_at on public.coworking_availability;
create trigger trg_avail_updated_at
  before update on public.coworking_availability
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------
-- 3) Bookings / requests
-- ---------------------------------------------------------------------
create table if not exists public.coworking_bookings (
  id             uuid primary key default gen_random_uuid(),
  space_id       uuid references public.coworking_spaces(id) on delete set null,
  space_slug     text,
  client_type    text not null check (client_type in ('individual', 'company')),
  full_name      text not null,
  company_name   text,
  email          text not null,
  phone          text,
  start_date     date,
  end_date       date,
  start_time     time,
  end_time       time,
  attendees      integer,
  message        text,
  status         text not null default 'pending' check (status in (
                   'pending', 'confirmed', 'cancelled', 'completed'
                 )),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists coworking_bookings_status_idx
  on public.coworking_bookings (status, created_at desc);

drop trigger if exists trg_bookings_updated_at on public.coworking_bookings;
create trigger trg_bookings_updated_at
  before update on public.coworking_bookings
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------
-- 4) Admin whitelist (optional — used if you enable Supabase Auth)
-- ---------------------------------------------------------------------
create table if not exists public.coworking_admins (
  email       text primary key,
  created_at  timestamptz not null default now()
);

-- =====================================================================
--  Row Level Security
-- =====================================================================
alter table public.coworking_spaces        enable row level security;
alter table public.coworking_availability  enable row level security;
alter table public.coworking_bookings      enable row level security;
alter table public.coworking_admins        enable row level security;

-- Public (anon) READ access
drop policy if exists "public read spaces" on public.coworking_spaces;
create policy "public read spaces"
  on public.coworking_spaces for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "public read availability" on public.coworking_availability;
create policy "public read availability"
  on public.coworking_availability for select
  to anon, authenticated
  using (true);

-- Public can INSERT a booking request (but not read others)
drop policy if exists "public insert booking" on public.coworking_bookings;
create policy "public insert booking"
  on public.coworking_bookings for insert
  to anon, authenticated
  with check (true);

-- Admin mutations go through the service-role key on the server, which
-- bypasses RLS. No additional policies required for that path.

-- =====================================================================
--  Seed data (idempotent — safe to re-run)
-- =====================================================================
insert into public.coworking_spaces
  (slug, name, type, description, capacity, price_hour, price_day, price_month,
   amenities, total_units, sort_order, image_url)
values
  ('open-desk', 'Poste Open Space', 'desk',
   'Un poste de travail flexible dans un espace lumineux et collaboratif, idéal pour freelances et étudiants.',
   1, 8, 35, 450,
   array['Wi-Fi fibre','Café illimité','Imprimante','Casiers'], 20, 10, null),
  ('dedicated-desk', 'Poste Dédié', 'private_desk',
   'Votre bureau attitré, disponible 24/7, avec rangements sécurisés et adresse professionnelle.',
   1, null, 45, 650,
   array['Wi-Fi fibre','Adresse pro','Casier sécurisé','Accès 24/7'], 12, 20, null),
  ('private-office', 'Bureau Privé', 'office',
   'Bureau fermé pour équipes de 2 à 8 personnes, entièrement meublé et personnalisable.',
   6, null, 180, 2200,
   array['Salle privative','Wi-Fi fibre','Écran 4K','Tableau blanc'], 6, 30, null),
  ('meeting-room-s', 'Salle de Réunion — 4 pers.', 'meeting_room',
   'Salle vitrée pour 4 personnes, parfaite pour vos rendez-vous clients et entretiens.',
   4, 25, 150, null,
   array['Écran TV','Visio','Tableau blanc','Wi-Fi fibre'], 3, 40, null),
  ('meeting-room-l', 'Salle de Réunion — 10 pers.', 'meeting_room',
   'Grande salle de réunion équipée visio, pour ateliers et comités de direction.',
   10, 45, 280, null,
   array['Visio HD','Projecteur','Paperboard','Catering possible'], 2, 50, null),
  ('event-hall', 'Salle Événementielle', 'event_space',
   'Espace modulable jusqu''à 40 personnes pour formations, workshops et lancements.',
   40, null, 600, null,
   array['Sonorisation','Projecteur','Scène','Pause-café incluse'], 1, 60, null)
on conflict (slug) do update set
  name         = excluded.name,
  description  = excluded.description,
  price_hour   = excluded.price_hour,
  price_day    = excluded.price_day,
  price_month  = excluded.price_month,
  amenities    = excluded.amenities,
  total_units  = excluded.total_units,
  sort_order   = excluded.sort_order;

-- One availability row per space (filled with sensible defaults)
insert into public.coworking_availability
  (space_id, available_units, status, opens_at, closes_at, note)
select s.id,
       greatest(s.total_units - 2, 0),
       case when s.total_units <= 2 then 'limited' else 'available' end,
       '08:00'::time,
       '20:00'::time,
       'Horaires d''ouverture : Lun–Sam, 08h–20h.'
from public.coworking_spaces s
on conflict (space_id) do nothing;
 
-- =====================================================================
--  After running this file, set these environment variables in .env.local
--  (and on Vercel) to let the Next.js app talk to Supabase:
--
--    NEXT_PUBLIC_SUPABASE_URL         = https://xxxx.supabase.co
--    NEXT_PUBLIC_SUPABASE_ANON_KEY    = <anon key>
--    SUPABASE_SERVICE_ROLE_KEY        = <service role key>   -- server only
--    ADMIN_MBS_PASSWORD               = <any strong password> -- /adminmbs gate
-- =====================================================================
