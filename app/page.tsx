"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { NotesGrid } from "@/components/notes-grid"
import { semesters } from "@/lib/data"

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const validateSemester = (sem: string | null) =>
    sem && semesters.find((s) => s.id.toString() === sem) ? sem : "0"

  const validateSubject = (sem: string, sub: string | null) => {
    if (sem === "0" || !sub) return "0"
    const semObj = semesters.find((s) => s.id.toString() === sem)
    return semObj?.subjects.find((s) => s.id === sub) ? sub : "0"
  }

  const semFromUrl = validateSemester(searchParams.get("sem"))
  const subFromUrl = validateSubject(semFromUrl, searchParams.get("sub"))

  const [selectedSemester, setSelectedSemester] = useState(semFromUrl)
  const [selectedSubject, setSelectedSubject] = useState(subFromUrl)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  useEffect(() => {
    setSelectedSemester(semFromUrl)
    setSelectedSubject(subFromUrl)
  }, [semFromUrl, subFromUrl])

  const navigate = (sem: string, sub: string) => {
    const params = new URLSearchParams()
    if (sem !== "0") params.set("sem", sem)
    if (sub !== "0") params.set("sub", sub)
    const qs = params.toString()
    router.push(qs ? `/?${qs}` : "/", { scroll: false })
  }

  const handleSemesterChange = (newSemester: string) => {
    setSelectedSemester(newSemester)
    setSelectedSubject("0")
    setSearchQuery("")
    navigate(newSemester, "0")
  }

  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject)
    setSearchQuery("")
    navigate(selectedSemester, newSubject)
  }

  const handleSelectSubject = (semesterId: string, subjectId: string) => {
    setSelectedSemester(semesterId)
    setSelectedSubject(subjectId)
    setSearchQuery("")
    navigate(semesterId, subjectId)
  }

  const handleHome = () => {
    setSelectedSemester("0")
    setSelectedSubject("0")
    setSearchQuery("")
    navigate("0", "0")
  }

  const handleBackToSemester = () => {
    setSelectedSubject("0")
    setSearchQuery("")
    navigate(selectedSemester, "0")
  }

  const trimmedQuery = searchQuery.trim().toLowerCase()
  const isSearching = trimmedQuery.length > 0

  const allNotes = semesters.flatMap((semester) =>
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

  const filteredNotes = allNotes.filter((note) => {
    if (isSearching) {
      return (
        note.title.toLowerCase().includes(trimmedQuery) ||
        note.subjectName.toLowerCase().includes(trimmedQuery) ||
        note.semesterName.toLowerCase().includes(trimmedQuery)
      )
    }
    const matchesSemester =
      selectedSemester === "0" || note.semester.toString() === selectedSemester
    const matchesSubject = selectedSubject === "0" || note.subject === selectedSubject
    return matchesSemester && matchesSubject
  })

  return (
    <NotesGrid
      notes={filteredNotes}
      onPreviewChange={setIsPreviewMode}
      isPreviewMode={isPreviewMode}
      semesters={semesters}
      selectedSemester={selectedSemester}
      onSemesterChange={handleSemesterChange}
      selectedSubject={selectedSubject}
      onSubjectChange={handleSubjectChange}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onSelectSubject={handleSelectSubject}
      onHome={handleHome}
      onBackToSemester={handleBackToSemester}
      isSearching={isSearching}
    />
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}
