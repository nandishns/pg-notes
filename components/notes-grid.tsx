"use client"

import { useState } from "react"
import { ExternalLink, Download, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PreviewPage } from "@/components/preview-page"
import type { Note } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/main-layout"

interface NotesGridProps {
  notes: Note[]
  onPreviewChange: (isPreview: boolean) => void
  isPreviewMode: boolean
  semesters: { id: number; name: string }[]
  selectedSemester: string
  onSemesterChange: (semester: string) => void
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
  searchQuery,
  onSearchChange
}: NotesGridProps) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
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

  const handleDownload = (note: Note) => {
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

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note)
    onPreviewChange(true)
  }

  const handleBack = () => {
    setSelectedNote(null)
    onPreviewChange(false)
  }

  if (selectedNote) {
    return (
      <PreviewPage 
        note={selectedNote} 
        onBack={handleBack}
      />
    )
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select value={selectedSemester} onValueChange={onSemesterChange}>
          <SelectTrigger className="w-full md:w-[200px]">
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
    </MainLayout>
  )
}

