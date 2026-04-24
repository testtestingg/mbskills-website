import { NextResponse } from "next/server"
import { listSpacesWithAvailability } from "@/lib/coworking/store"

// Public endpoint — returns active spaces with their live availability.
export async function GET() {
  try {
    const data = await listSpacesWithAvailability()
    return NextResponse.json(
      { spaces: data },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
