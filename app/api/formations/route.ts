import { NextResponse } from "next/server"
import { formations } from "@/lib/data/formations"

export async function GET() {
  return NextResponse.json(formations)
}
