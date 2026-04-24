/**
 * Lightweight admin auth for /adminmbs.
 *
 * The admin enters a password on /adminmbs which is POSTed to
 * /api/coworking/admin/login; on success the server sets an
 * httpOnly cookie ("mbs_admin=1") that every /api/coworking/admin/*
 * route checks via isAdmin().
 *
 * The password comes from the ADMIN_MBS_PASSWORD env var. If that
 * variable is not set, a safe default ("mbskills-admin") is used so
 * the feature works out of the box in preview environments.
 */

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const ADMIN_COOKIE = "mbs_admin"
export const ADMIN_COOKIE_VALUE = "1"

export function getAdminPassword(): string {
  return process.env.ADMIN_MBS_PASSWORD || "mbskills-admin"
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies()
  return store.get(ADMIN_COOKIE)?.value === ADMIN_COOKIE_VALUE
}

export function requireAdminResponse(): NextResponse {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 })
}
