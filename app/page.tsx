"use client"

import { useState } from "react"
import { NotesGrid } from "@/components/notes-grid"
import { semesters } from "@/lib/data"

export default function Home() {
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const filteredNotes = semesters
    .flatMap((semester) =>
      semester.notes.map((note) => ({
        ...note,
        semesterName: semester.name,
      })),
    )
    .filter(
      (note) =>
        (selectedSemester ? note.semester.toString() === selectedSemester : true) &&
        (searchQuery ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) : true),
    )

  return (
    <NotesGrid 
      notes={filteredNotes} 
      onPreviewChange={setIsPreviewMode}
      isPreviewMode={isPreviewMode}
      semesters={semesters}
    />
  )
}

