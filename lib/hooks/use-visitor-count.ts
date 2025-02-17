import { useState, useEffect } from 'react'

interface CounterResponse {
  id: number
  name: string
  count: number
  created_at: string
  updated_at: string
  namespace_id: number
  namespace: {
    id: number
    name: string
    created_at: string
    updated_at: string
  }
}

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('https://api.counterapi.dev/v1/cbpg-math/visit/up')
        const data: CounterResponse = await response.json()
        if (data && typeof data.count === 'number') {
          setCount(data.count)
        } else {
          setCount(0) // Fallback to 0 if we get invalid data
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error)
        setCount(0) // Fallback to 0 on error
      }
    }

    fetchCount()
  }, [])

  return count
} 