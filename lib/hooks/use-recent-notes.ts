"use client"

import { useEffect, useState } from "react"

export interface RecentNote {
  id: string
  title: string
  subjectId: string
  subjectName: string
  semesterId: number
  semesterName: string
  folderUrl: string
  openedAt: number
}

const STORAGE_KEY = "pgnotes-recent-v1"
const MAX_ITEMS = 6

export function useRecentNotes() {
  const [recent, setRecent] = useState<RecentNote[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as RecentNote[]
        if (Array.isArray(parsed)) setRecent(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  const add = (note: Omit<RecentNote, "openedAt">) => {
    if (!note.folderUrl) return
    setRecent((prev) => {
      const filtered = prev.filter((n) => n.id !== note.id)
      const next = [{ ...note, openedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  const clear = () => {
    setRecent([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return { recent, add, clear }
}
