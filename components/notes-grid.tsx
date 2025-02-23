"use client"

import { useState } from "react"
import { ExternalLink, Download, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PreviewPage } from "@/components/preview-page"
import type { Lesson, PYQPaper, Semester } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/main-layout"
import { WelcomeSection } from "@/components/welcome-section"
import { BookOpen, CheckCircle } from "lucide-react"
import { PYQSection } from "@/components/pyq-section"

interface NotesGridProps {
  notes: Lesson[]
  onPreviewChange: (isPreview: boolean) => void
  isPreviewMode: boolean
  semesters: Semester[]
  selectedSemester: string
  onSemesterChange: (semester: string) => void
  selectedSubject: string
  onSubjectChange: (subject: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function NotesGrid({ 
  notes, 
  onPreviewChange, 
  isPreviewMode,
  semesters,
  selectedSemester,
  onSemesterChange,
  selectedSubject,
  onSubjectChange,
  searchQuery,
  onSearchChange
}: NotesGridProps) {
  const [selectedNote, setSelectedNote] = useState<Lesson | null>(null) 
  const [selectedPaper, setSelectedPaper] = useState<PYQPaper | null>(null)
  const { toast } = useToast()

  const getFileId = (url: string) => {
    const match = url.match(/\/d\/(.+?)\//)
    return match ? match[1] : null
  }

  const getViewUrl = (url: string) => {
    const fileId = getFileId(url)
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url
  }

  const getDownloadUrl = (url: string) => {
    const fileId = getFileId(url)
    return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : url
  }

  const handleDownload = (url: string) => {
    if (!url) {
      toast({
        title: "Coming Soon",
        description: "These notes will be available for download soon! 📚",
        duration: 3000,
      })
      return
    }
    window.open(getDownloadUrl(url), "_blank")
  }

  const handleSelectNote = (note: Lesson) => {
    setSelectedNote(note)
    onPreviewChange(true)
  }

  const handleBack = () => {
    setSelectedNote(null)
    onPreviewChange(false)
  }

  const currentSemester = semesters.find(s => s.id.toString() === selectedSemester)
  const subjects = currentSemester?.subjects || []

  if (selectedNote) {
    return (
      <PreviewPage 
        lesson={selectedNote} 
        onBack={handleBack}
      />
    )
  }
  if(selectedPaper){
    return (
      <PreviewPage 
        lesson={ {
          id: selectedPaper.year.toString(),
          title: selectedPaper.year.toString(),
          description: selectedPaper.paperUrl,
          folderUrl: selectedPaper.paperUrl || ""
        }} 
        onBack={() => setSelectedPaper(null)}
      />
    )
  }

  return (
    <MainLayout>
      <div className="container px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
        {/* Filter Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="relative md:pl-4">
              <Search className="absolute left-2 md:left-6 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-[180px]">
              <label className="text-xs font-medium mb-1 block text-muted-foreground pl-2">
                Select Semester
              </label>
              <Select value={selectedSemester} onValueChange={onSemesterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All Semesters</SelectItem>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id.toString()}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 md:w-[220px]">
              <label className="text-xs font-medium mb-1 block text-muted-foreground pl-2">
                Select Subject
              </label>
              <Select value={selectedSubject} onValueChange={onSubjectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Select subject</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-7xl mx-auto">
          {selectedSubject === "0" ? (
            <div className="max-w-5xl mx-auto">
              <WelcomeSection />
            </div>
          ) : notes.length > 0 ? (
            <>
              <section 
                className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
                aria-label="Study notes collection"
              >
                {notes.map((note) => (
                  <article key={note.id}>
                    <Card>
                      <CardHeader className="py-4 px-4">
                        <CardTitle className="text-base font-medium line-clamp-2">
                          <h2>{note.title}</h2>
                        </CardTitle>
                        {note.description && (
                          <CardDescription className="text-sm">
                            <p>{note.description}</p>
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="py-2 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 h-8 text-sm"
                            onClick={() => handleSelectNote(note)}
                            aria-label={`View ${note.title}`}
                          >
                            {note.folderUrl ? (
                              <ExternalLink className="mr-2 h-3 w-3" />
                            ) : (
                              <Clock className="mr-2 h-3 w-3" />
                            )}
                            View
                          </Button>
                          <Button
                            variant="secondary"
                            className="flex-1 h-8 text-sm"
                            onClick={() => handleDownload(note.folderUrl || "")}
                            aria-label={`Download ${note.title}`}
                          >
                            <Download className="mr-2 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </section>
              
              {/* Add PYQ Section after notes */}
              <PYQSection 
                subject={subjects.find(s => s.id === selectedSubject) || { id: "", name: "", lessons: [], pyqPapers: [] } }
                selectedPaper={selectedPaper}
                setSelectedPaper={setSelectedPaper}
                handleDownload={handleDownload}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No notes found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

