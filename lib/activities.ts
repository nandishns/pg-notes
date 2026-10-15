export interface ActivityPhoto {
  id: string
  name: string
  date: string
  thumbnailUrl: string
  fullUrl: string
}

export async function fetchActivities(): Promise<ActivityPhoto[]> {
  try {
    const res = await fetch("/api/activities")
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data?.photos) ? (data.photos as ActivityPhoto[]) : []
  } catch {
    return []
  }
}
