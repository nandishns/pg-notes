import { useState, useEffect } from "react"

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/visit", { cache: "no-store" })
        const data = await response.json()
        if (cancelled) return
        if (data && typeof data.count === "number") {
          setCount(data.count)
        } else {
          setCount(0)
        }
      } catch (error) {
        if (cancelled) return
        console.error("Error fetching visitor count:", error)
        setCount(0)
      }
    }

    fetchCount()
    return () => {
      cancelled = true
    }
  }, [])

  return count
}
