import { NextResponse } from "next/server"
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_VALUE,
  getAdminPassword,
} from "@/lib/coworking/admin-auth"

export async function POST(req: Request) {
  try {
    const { password } = (await req.json()) as { password?: string }
    if (!password || password !== getAdminPassword()) {
      return NextResponse.json({ error: "invalid_credentials" }, { status: 401 })
    }
    const res = NextResponse.json({ ok: true })
    res.cookies.set(ADMIN_COOKIE, ADMIN_COOKIE_VALUE, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    })
    return res
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 })
  return res
}

export const dynamic = "force-dynamic"
