import { NextResponse } from "next/server"
import { isAdmin, requireAdminResponse } from "@/lib/coworking/admin-auth"
import { listBookings } from "@/lib/coworking/store"

export async function GET() {
  if (!(await isAdmin())) return requireAdminResponse()
  try {
    const bookings = await listBookings()
    return NextResponse.json({ bookings })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
