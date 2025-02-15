"use client"

import { useState } from "react"
import { NotesGrid } from "@/components/notes-grid"
import { semesters } from "@/lib/data"

export default function Home() {
  const [selectedSemester, setSelectedSemester] = useState("1")
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
        (selectedSemester === "0" ? true : note.semester.toString() === selectedSemester) &&
        (searchQuery ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) : true),
    )

  return (
    <NotesGrid 
      notes={filteredNotes} 
      onPreviewChange={setIsPreviewMode}
      isPreviewMode={isPreviewMode}
      semesters={semesters}
      selectedSemester={selectedSemester}
      onSemesterChange={setSelectedSemester}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  )
}

