export type SpaceType =
  | "desk"
  | "private_desk"
  | "office"
  | "meeting_room"
  | "event_space"

export type AvailabilityStatus = "available" | "limited" | "full" | "closed"

export interface CoworkingSpace {
  id: string
  slug: string
  name: string
  type: SpaceType
  description: string | null
  capacity: number
  price_hour: number | null
  price_day: number | null
  price_month: number | null
  currency: string
  amenities: string[]
  image_url: string | null
  total_units: number
  is_active: boolean
  sort_order: number
}

export interface CoworkingAvailability {
  space_id: string
  available_units: number
  status: AvailabilityStatus
  opens_at: string | null
  closes_at: string | null
  note: string | null
  updated_at: string
}

export interface SpaceWithAvailability extends CoworkingSpace {
  availability: CoworkingAvailability | null
}

export interface CoworkingBookingInput {
  space_slug?: string | null
  client_type: "individual" | "company"
  full_name: string
  company_name?: string | null
  email: string
  phone?: string | null
  start_date?: string | null
  end_date?: string | null
  start_time?: string | null
  end_time?: string | null
  attendees?: number | null
  message?: string | null
}

export const SPACE_TYPE_LABELS: Record<SpaceType, string> = {
  desk: "Poste flexible",
  private_desk: "Poste dédié",
  office: "Bureau privé",
  meeting_room: "Salle de réunion",
  event_space: "Espace événementiel",
}

export const STATUS_LABELS: Record<AvailabilityStatus, string> = {
  available: "Disponible",
  limited: "Places limitées",
  full: "Complet",
  closed: "Fermé",
}

export const STATUS_COLORS: Record<AvailabilityStatus, string> = {
  available: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  limited: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  full: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  closed: "bg-slate-500/15 text-slate-300 border-slate-500/30",
}
