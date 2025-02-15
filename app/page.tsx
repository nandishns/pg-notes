"use client"

import { useState, useEffect } from "react"
import { NotesGrid } from "@/components/notes-grid"
import { semesters } from "@/lib/data"

export default function Home() {
  const [selectedSemester, setSelectedSemester] = useState("1")
  const [selectedSubject, setSelectedSubject] = useState("0")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Reset subject selection when semester changes
  const handleSemesterChange = (newSemester: string) => {
    setSelectedSemester(newSemester)
    setSelectedSubject("0") // Reset to "Select subject"
  }

  const filteredNotes = semesters
    .flatMap((semester) =>
      semester.subjects.flatMap((subject) =>
        subject.lessons.map((lesson) => ({
          ...lesson,
          semesterName: semester.name,
          subjectName: subject.name,
          semester: semester.id,
          subject: subject.id,
        }))
      )
    )
    .filter(
      (note) =>
        (selectedSemester === "0" ? true : note.semester.toString() === selectedSemester) &&
        (selectedSubject === "0" ? true : note.subject === selectedSubject) &&
        (searchQuery ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    )

  return (
    <NotesGrid 
      notes={filteredNotes} 
      onPreviewChange={setIsPreviewMode}
      isPreviewMode={isPreviewMode}
      semesters={semesters}
      selectedSemester={selectedSemester}
      onSemesterChange={handleSemesterChange}
      selectedSubject={selectedSubject}
      onSubjectChange={setSelectedSubject}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  )
}

