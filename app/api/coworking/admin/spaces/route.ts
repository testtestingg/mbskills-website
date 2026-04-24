import { NextResponse } from "next/server"
import { isAdmin, requireAdminResponse } from "@/lib/coworking/admin-auth"
import { listAllSpaces, updateSpace, updateAvailability } from "@/lib/coworking/store"
import type {
  AvailabilityStatus,
  CoworkingSpace,
} from "@/lib/coworking/types"

export async function GET() {
  if (!(await isAdmin())) return requireAdminResponse()
  try {
    const spaces = await listAllSpaces()
    return NextResponse.json({ spaces })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// Update a space + its availability in a single call.
export async function PATCH(req: Request) {
  if (!(await isAdmin())) return requireAdminResponse()
  try {
    const body = (await req.json()) as {
      id: string
      space?: Partial<Omit<CoworkingSpace, "id">>
      availability?: {
        available_units?: number
        status?: AvailabilityStatus
        opens_at?: string | null
        closes_at?: string | null
        note?: string | null
      }
    }

    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    if (body.space && Object.keys(body.space).length > 0) {
      await updateSpace(body.id, body.space)
    }
    if (body.availability && Object.keys(body.availability).length > 0) {
      await updateAvailability(body.id, body.availability)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
