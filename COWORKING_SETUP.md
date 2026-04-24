# MBSkills Coworking — Setup Guide

This document explains how to set up the new **Coworking Space** feature.

## 📁 What was added

### Pages
| Route | Purpose |
|-------|---------|
| `/` (homepage) | New highlight section between the bootcamps and the features section, plus a coworking chip + CTA button in the hero. |
| `/coworking` | Full public coworking page — spaces grid with live availability, audience split (individuals / companies), reservation form, contact info. |
| `/adminmbs` | **Hidden** admin dashboard (noindex, nofollow) to manage spaces, availability and view bookings. |

### API routes
| Route | Method | Access |
|-------|--------|--------|
| `/api/coworking` | `GET` | Public — returns active spaces + their availability |
| `/api/coworking/bookings` | `POST` | Public — creates a reservation request |
| `/api/coworking/admin/login` | `POST` / `DELETE` | Admin gate (password) / logout |
| `/api/coworking/admin/spaces` | `GET` / `PATCH` | Admin — list all spaces, update space / availability |
| `/api/coworking/admin/bookings` | `GET` | Admin — list all booking requests |

### Shared library
- `lib/coworking/types.ts` — TypeScript types + display-label helpers
- `lib/coworking/store.ts` — Data store: Supabase when configured, otherwise an in-memory fallback seeded with demo data (so the feature works out-of-the-box)
- `lib/coworking/admin-auth.ts` — httpOnly-cookie auth for `/adminmbs`

### Components
- `components/coworking-highlight-section.tsx` — the homepage highlight

### Database
- `supabase/schema.sql` — full PostgreSQL/Supabase schema (run manually in the Supabase SQL editor).

---

## 🗄️ Database setup (Supabase)

1. Open your Supabase project → **SQL Editor** → paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) → Run.
2. This creates **4 tables**: `coworking_spaces`, `coworking_availability`, `coworking_bookings`, `coworking_admins`, plus indexes, triggers, RLS policies and seed data.
3. RLS is configured so anonymous users can `SELECT` active spaces / availability and `INSERT` a booking, but only the service-role key can mutate.

## 🔑 Environment variables

Create `.env.local` (copy to Vercel as well):

```env
# ---- Supabase (optional — without these, an in-memory demo store is used) ----
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ---- Admin password for /adminmbs ----
# Default (if unset): "mbskills-admin" — CHANGE THIS in production.
ADMIN_MBS_PASSWORD=your-strong-password-here
```

> ⚠️ Make sure `SUPABASE_SERVICE_ROLE_KEY` is **never** exposed to the client.
> It is used only server-side inside the `/api/coworking/admin/*` routes.

## 🚀 Running

```bash
npm install     # or pnpm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Even before you set up Supabase, the feature is fully usable: the store falls back to a seeded in-memory dataset that mirrors the SQL seed, so:
- `/coworking` shows 6 realistic spaces with availability
- `/adminmbs` lets you edit them in real time (changes survive hot reloads during the same process)

## 🔒 Accessing the admin

1. Navigate to **`/adminmbs`** (no link exposed in the nav or footer).
2. Enter the `ADMIN_MBS_PASSWORD` value. An 8h httpOnly cookie is set.
3. You can now:
   - Edit every space (name, pricing, capacity, amenities, visibility)
   - Update live availability (available units, status, opening hours, public note)
   - View all booking requests

## ✨ What stayed untouched

- The Aurora background, GlassmorphismNav, RotatingText and all hero animations
- Existing pages (`/formation`, `/a-propos`, `/contact`, `/car-dealerships`) are unchanged
- The brand palette (navy `#0a1327`, accent `#04a3fe`) and all existing sections
- No dependencies were added — the coworking store talks to Supabase via `fetch` against the PostgREST endpoint
