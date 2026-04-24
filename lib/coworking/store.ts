/**
 * Coworking data store.
 *
 * Behaviour:
 *   - If NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or
 *     NEXT_PUBLIC_SUPABASE_ANON_KEY) are configured, all reads/writes go
 *     through the Supabase PostgREST API over HTTP (no extra dependency).
 *   - Otherwise, we fall back to an in-memory store seeded with the same
 *     demo data as the SQL schema. This lets the feature work end-to-end
 *     during development and preview deployments even before the admin
 *     has wired up Supabase.
 */

import type {
  CoworkingAvailability,
  CoworkingBookingInput,
  CoworkingSpace,
  SpaceWithAvailability,
} from "./types"

// ---------------------------------------------------------------------
// Supabase configuration (optional)
// ---------------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY

export function isSupabaseEnabled(): boolean {
  return Boolean(SUPABASE_URL && (SUPABASE_ANON || SUPABASE_SERVICE))
}

function sbHeaders(useService = false): HeadersInit {
  const key = useService && SUPABASE_SERVICE ? SUPABASE_SERVICE : SUPABASE_ANON
  return {
    apikey: key ?? "",
    Authorization: `Bearer ${key ?? ""}`,
    "Content-Type": "application/json",
  }
}

async function sbFetch<T>(
  path: string,
  init: RequestInit = {},
  useService = false,
): Promise<T> {
  if (!SUPABASE_URL) throw new Error("Supabase not configured")
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: { ...sbHeaders(useService), ...(init.headers ?? {}) },
    cache: "no-store",
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Supabase error ${res.status}: ${txt}`)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

// ---------------------------------------------------------------------
// In-memory fallback (demo data that mirrors supabase/schema.sql)
// ---------------------------------------------------------------------
const demoSpaces: CoworkingSpace[] = [
  {
    id: "space-open-desk",
    slug: "open-desk",
    name: "Poste Open Space",
    type: "desk",
    description:
      "Un poste de travail flexible dans un espace lumineux et collaboratif, idéal pour freelances et étudiants.",
    capacity: 1,
    price_hour: 8,
    price_day: 35,
    price_month: 450,
    currency: "TND",
    amenities: ["Wi-Fi fibre", "Café illimité", "Imprimante", "Casiers"],
    image_url: null,
    total_units: 20,
    is_active: true,
    sort_order: 10,
  },
  {
    id: "space-dedicated-desk",
    slug: "dedicated-desk",
    name: "Poste Dédié",
    type: "private_desk",
    description:
      "Votre bureau attitré, disponible 24/7, avec rangements sécurisés et adresse professionnelle.",
    capacity: 1,
    price_hour: null,
    price_day: 45,
    price_month: 650,
    currency: "TND",
    amenities: ["Wi-Fi fibre", "Adresse pro", "Casier sécurisé", "Accès 24/7"],
    image_url: null,
    total_units: 12,
    is_active: true,
    sort_order: 20,
  },
  {
    id: "space-private-office",
    slug: "private-office",
    name: "Bureau Privé",
    type: "office",
    description:
      "Bureau fermé pour équipes de 2 à 8 personnes, entièrement meublé et personnalisable.",
    capacity: 6,
    price_hour: null,
    price_day: 180,
    price_month: 2200,
    currency: "TND",
    amenities: ["Salle privative", "Wi-Fi fibre", "Écran 4K", "Tableau blanc"],
    image_url: null,
    total_units: 6,
    is_active: true,
    sort_order: 30,
  },
  {
    id: "space-meeting-s",
    slug: "meeting-room-s",
    name: "Salle de Réunion — 4 pers.",
    type: "meeting_room",
    description:
      "Salle vitrée pour 4 personnes, parfaite pour vos rendez-vous clients et entretiens.",
    capacity: 4,
    price_hour: 25,
    price_day: 150,
    price_month: null,
    currency: "TND",
    amenities: ["Écran TV", "Visio", "Tableau blanc", "Wi-Fi fibre"],
    image_url: null,
    total_units: 3,
    is_active: true,
    sort_order: 40,
  },
  {
    id: "space-meeting-l",
    slug: "meeting-room-l",
    name: "Salle de Réunion — 10 pers.",
    type: "meeting_room",
    description:
      "Grande salle de réunion équipée visio, pour ateliers et comités de direction.",
    capacity: 10,
    price_hour: 45,
    price_day: 280,
    price_month: null,
    currency: "TND",
    amenities: ["Visio HD", "Projecteur", "Paperboard", "Catering possible"],
    image_url: null,
    total_units: 2,
    is_active: true,
    sort_order: 50,
  },
  {
    id: "space-event-hall",
    slug: "event-hall",
    name: "Salle Événementielle",
    type: "event_space",
    description:
      "Espace modulable jusqu'à 40 personnes pour formations, workshops et lancements.",
    capacity: 40,
    price_hour: null,
    price_day: 600,
    price_month: null,
    currency: "TND",
    amenities: ["Sonorisation", "Projecteur", "Scène", "Pause-café incluse"],
    image_url: null,
    total_units: 1,
    is_active: true,
    sort_order: 60,
  },
]

function buildAvailability(spaces: CoworkingSpace[]): Record<string, CoworkingAvailability> {
  return Object.fromEntries(
    spaces.map((s) => [
      s.id,
      {
        space_id: s.id,
        available_units: Math.max(s.total_units - 2, 0),
        status: s.total_units <= 2 ? "limited" : "available",
        opens_at: "08:00",
        closes_at: "20:00",
        note: "Horaires d'ouverture : Lun–Sam, 08h–20h.",
        updated_at: new Date().toISOString(),
      },
    ]),
  )
}

// Use a global so the in-memory data survives across hot reloads AND
// across Next.js route handler invocations in the same process.
const GLOBAL_KEY = "__mbs_coworking_store__"
type MemoryStore = {
  spaces: CoworkingSpace[]
  availability: Record<string, CoworkingAvailability>
  bookings: Array<
    CoworkingBookingInput & { id: string; status: string; created_at: string }
  >
}

function getMemoryStore(): MemoryStore {
  const g = globalThis as unknown as Record<string, MemoryStore | undefined>
  if (!g[GLOBAL_KEY]) {
    const spaces = JSON.parse(JSON.stringify(demoSpaces)) as CoworkingSpace[]
    g[GLOBAL_KEY] = {
      spaces,
      availability: buildAvailability(spaces),
      bookings: [],
    }
  }
  return g[GLOBAL_KEY]!
}

// ---------------------------------------------------------------------
// Public API — used by server routes
// ---------------------------------------------------------------------
export async function listSpacesWithAvailability(): Promise<SpaceWithAvailability[]> {
  if (isSupabaseEnabled()) {
    const spaces = await sbFetch<CoworkingSpace[]>(
      "/coworking_spaces?is_active=eq.true&order=sort_order.asc",
    )
    const avail = await sbFetch<CoworkingAvailability[]>(
      "/coworking_availability?select=*",
    )
    const availMap = new Map(avail.map((a) => [a.space_id, a]))
    return spaces.map((s) => ({ ...s, availability: availMap.get(s.id) ?? null }))
  }
  const mem = getMemoryStore()
  return mem.spaces
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((s) => ({ ...s, availability: mem.availability[s.id] ?? null }))
}

export async function listAllSpaces(): Promise<SpaceWithAvailability[]> {
  if (isSupabaseEnabled()) {
    const spaces = await sbFetch<CoworkingSpace[]>(
      "/coworking_spaces?order=sort_order.asc",
      {},
      true,
    )
    const avail = await sbFetch<CoworkingAvailability[]>(
      "/coworking_availability?select=*",
      {},
      true,
    )
    const availMap = new Map(avail.map((a) => [a.space_id, a]))
    return spaces.map((s) => ({ ...s, availability: availMap.get(s.id) ?? null }))
  }
  const mem = getMemoryStore()
  return mem.spaces
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((s) => ({ ...s, availability: mem.availability[s.id] ?? null }))
}

export async function updateAvailability(
  spaceId: string,
  patch: Partial<Omit<CoworkingAvailability, "space_id" | "updated_at">>,
): Promise<CoworkingAvailability> {
  if (isSupabaseEnabled()) {
    const rows = await sbFetch<CoworkingAvailability[]>(
      `/coworking_availability?space_id=eq.${spaceId}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(patch),
      },
      true,
    )
    if (rows.length > 0) return rows[0]
    const inserted = await sbFetch<CoworkingAvailability[]>(
      `/coworking_availability`,
      {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ space_id: spaceId, ...patch }),
      },
      true,
    )
    return inserted[0]
  }
  const mem = getMemoryStore()
  const current: CoworkingAvailability = mem.availability[spaceId] ?? {
    space_id: spaceId,
    available_units: 0,
    status: "available",
    opens_at: null,
    closes_at: null,
    note: null,
    updated_at: new Date().toISOString(),
  }
  const next: CoworkingAvailability = {
    ...current,
    ...patch,
    updated_at: new Date().toISOString(),
  }
  mem.availability[spaceId] = next
  return next
}

export async function updateSpace(
  spaceId: string,
  patch: Partial<Omit<CoworkingSpace, "id">>,
): Promise<CoworkingSpace> {
  if (isSupabaseEnabled()) {
    const rows = await sbFetch<CoworkingSpace[]>(
      `/coworking_spaces?id=eq.${spaceId}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(patch),
      },
      true,
    )
    return rows[0]
  }
  const mem = getMemoryStore()
  const idx = mem.spaces.findIndex((s) => s.id === spaceId)
  if (idx === -1) throw new Error("Space not found")
  mem.spaces[idx] = { ...mem.spaces[idx], ...patch }
  return mem.spaces[idx]
}

export async function createBooking(
  input: CoworkingBookingInput,
): Promise<{ id: string }> {
  if (isSupabaseEnabled()) {
    const rows = await sbFetch<Array<{ id: string }>>(
      `/coworking_bookings`,
      {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(input),
      },
      true,
    )
    return { id: rows[0].id }
  }
  const mem = getMemoryStore()
  const id = `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  mem.bookings.push({
    id,
    status: "pending",
    created_at: new Date().toISOString(),
    ...input,
  })
  return { id }
}

export async function listBookings() {
  if (isSupabaseEnabled()) {
    return await sbFetch<Array<Record<string, unknown>>>(
      `/coworking_bookings?order=created_at.desc`,
      {},
      true,
    )
  }
  return getMemoryStore().bookings.slice().reverse()
}
