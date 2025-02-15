"use client"

import { useState } from "react"
import { ExternalLink, Download, ArrowLeft, Maximize2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Note } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"

interface NotesGridProps {
  notes: Note[]
}

export function NotesGrid({ notes }: NotesGridProps) {
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

  if (selectedNote) {
    if (!selectedNote.folderUrl) {
      return (
        <article className="flex flex-col w-full h-[calc(100vh-4rem)]">
          <div className="flex items-center gap-2 p-4 border-b">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedNote(null)}
              aria-label="Go back to notes list"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h3 className="text-sm font-medium flex-1">{selectedNote.title}</h3>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
              <h3 className="text-xl font-medium">Notes Will Be Uploaded Soon</h3>
              <p className="text-sm text-muted-foreground">
                We're preparing the best content for you. Check back later! 📚✨
              </p>
            </div>
          </div>
        </article>
      )
    }

    return (
      <article className="flex flex-col w-full h-[calc(100vh-4rem)]">
        <div className="flex items-center gap-2 p-4 border-b">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedNote(null)}
            aria-label="Go back to notes list"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h3 className="text-sm font-medium flex-1">{selectedNote.title}</h3>
          <Button
            variant="ghost"
            onClick={() => window.open(getViewUrl(selectedNote.folderUrl), "_blank")}
            aria-label="Open in full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1">
          <iframe
            src={getViewUrl(selectedNote.folderUrl)}
            className="w-full h-full border-0"
            allow="autoplay"
            title={`Preview of ${selectedNote.title}`}
            aria-label={`Document preview for ${selectedNote.title}`}
          ></iframe>
        </div>
      </article>
    )
  }

  return (
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
                  onClick={() => setSelectedNote(note)}
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
  )
}

