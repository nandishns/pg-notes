import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const COUNTER_URL = "https://api.counterapi.dev/v1/cbpg-math/visit/up"

export async function GET() {
  try {
    const response = await fetch(COUNTER_URL, { cache: "no-store" })
    if (!response.ok) {
      return NextResponse.json({ count: null }, { status: 200 })
    }
    const data = await response.json()
    const count = typeof data?.count === "number" ? data.count : null
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
