"use client"

import { useState } from "react"
import { ExternalLink, Download, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PreviewPage } from "@/components/preview-page"
import type { Lesson, Semester } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/main-layout"

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

  const handleDownload = (note: Lesson) => {
    if (!note.folderUrl) {
      toast({
        title: "Coming Soon",
        description: "These notes will be available for download soon! 📚",
        duration: 3000,
      })
      return
    }
    window.open(getDownloadUrl(note.folderUrl), "_blank")
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

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-initial">
            <label className="text-xs font-medium mb-1 block text-muted-foreground pl-2">
              Select Semester
            </label>
            <Select value={selectedSemester} onValueChange={onSemesterChange}>
              <SelectTrigger className="w-full md:w-[150px]">
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
          <div className="flex-1 md:flex-initial">
            <label className="text-xs font-medium mb-1 block text-muted-foreground pl-2">
              Select Subject
            </label>
            <Select value={selectedSubject} onValueChange={onSubjectChange}>
              <SelectTrigger className="w-full md:w-[200px]">
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

      {selectedSubject === "0" ? (
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg">
             
              <p className="text-lg opacity-90 mb-6">
                "Pure mathematics is, in its way, the poetry of logical ideas." 
                <br />
                <span className="text-sm">- Albert Einstein</span>
              </p>
              <div className="bg-white/10 p-4 rounded-md backdrop-blur-sm">
                <p className="text-sm">
                  Select a subject above to start exploring our comprehensive collection of 
                  mathematics study materials. Each lesson is carefully crafted to help you 
                  understand complex concepts with clarity.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Structured Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step lessons designed for clear understanding
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Quality Content</h3>
                <p className="text-sm text-muted-foreground">
                  Curated materials from experienced educators
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h3 className="font-medium mb-2">Easy Access</h3>
                <p className="text-sm text-muted-foreground">
                  View or download notes at your convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : notes.length > 0 ? (
        <section 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Study notes collection"
        >
          {notes.map((note) => (
            <article key={note.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <h2 className="text-base">{note.title}</h2>
                  </CardTitle>
                  {note.description && (
                    <CardDescription>
                      <p>{note.description}</p>
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleSelectNote(note)}
                      aria-label={`View ${note.title}`}
                    >
                      {note.folderUrl ? (
                        <ExternalLink className="mr-2 h-4 w-4" />
                      ) : (
                        <Clock className="mr-2 h-4 w-4" />
                      )}
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => handleDownload(note)}
                      aria-label={`Download ${note.title}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">No notes found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </MainLayout>
  )
}

