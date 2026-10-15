import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const COUNTER_URL = "https://abacus.jasoncameron.dev/hit/cbpg-math-pgnotes/views"

export async function GET() {
  try {
    const response = await fetch(COUNTER_URL, { cache: "no-store" })
    if (!response.ok) {
      return NextResponse.json({ count: null }, { status: 200 })
    }
    const data = await response.json()
    const count = typeof data?.value === "number" ? data.value : null
    return NextResponse.json(
      { count },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    )
  } catch {
    return NextResponse.json({ count: null }, { status: 200 })
  }
}
