import { NextResponse } from "next/server"

const FOLDER_ID = process.env.GOOGLE_DRIVE_ACTIVITIES_FOLDER_ID
const API_KEY = process.env.GOOGLE_DRIVE_API_KEY

interface DriveFile {
  id: string
  name: string
  mimeType: string
  modifiedTime: string
  createdTime?: string
}

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
}

export async function GET() {
  if (!FOLDER_ID || !API_KEY) {
    return NextResponse.json({ photos: [] }, { headers: cacheHeaders })
  }
  try {
    const fields = "files(id,name,mimeType,modifiedTime,createdTime)"
    const q = `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&orderBy=createdTime desc&pageSize=200&fields=${encodeURIComponent(fields)}&key=${API_KEY}`
    const res = await fetch(url, { next: { revalidate: 300 } })
    if (!res.ok) {
      return NextResponse.json({ photos: [] }, { headers: cacheHeaders })
    }
    const data = await res.json()
    const files = (data?.files ?? []) as DriveFile[]
    const photos = files.map((f) => ({
      id: f.id,
      name: f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim(),
      date: f.createdTime ?? f.modifiedTime,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${f.id}&sz=w800`,
      fullUrl: `https://drive.google.com/thumbnail?id=${f.id}&sz=w2400`,
    }))
    return NextResponse.json({ photos }, { headers: cacheHeaders })
  } catch {
    return NextResponse.json({ photos: [] }, { headers: cacheHeaders })
  }
}
