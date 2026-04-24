import { NextResponse } from "next/server"
import { createBooking } from "@/lib/coworking/store"
import type { CoworkingBookingInput } from "@/lib/coworking/types"

// Public endpoint — creates a booking / quote request.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CoworkingBookingInput>

    if (!body.full_name || !body.email || !body.client_type) {
      return NextResponse.json(
        { error: "full_name, email and client_type are required" },
        { status: 400 },
      )
    }

    const sanitized: CoworkingBookingInput = {
      client_type: body.client_type === "company" ? "company" : "individual",
      full_name: String(body.full_name).slice(0, 200),
      email: String(body.email).slice(0, 200),
      company_name: body.company_name ? String(body.company_name).slice(0, 200) : null,
      phone: body.phone ? String(body.phone).slice(0, 40) : null,
      space_slug: body.space_slug ? String(body.space_slug).slice(0, 100) : null,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      start_time: body.start_time || null,
      end_time: body.end_time || null,
      attendees:
        typeof body.attendees === "number" && body.attendees > 0
          ? Math.min(body.attendees, 500)
          : null,
      message: body.message ? String(body.message).slice(0, 2000) : null,
    }

    const { id } = await createBooking(sanitized)
    return NextResponse.json({ ok: true, id })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
