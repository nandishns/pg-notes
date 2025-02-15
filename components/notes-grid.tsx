"use client"

import { useState } from "react"
import { ExternalLink, Download, ArrowLeft, Maximize2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Note } from "@/lib/data"

interface NotesGridProps {
  notes: Note[]
}

export function NotesGrid({ notes }: NotesGridProps) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

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

  if (selectedNote) {
    return (
      <div className="flex flex-col w-full h-[calc(100vh-4rem)]">
        <div className="flex items-center gap-2 p-4 border-b">
          <Button variant="ghost" onClick={() => setSelectedNote(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h3 className="text-sm font-medium flex-1">{selectedNote.title}</h3>
          <Button
            variant="ghost"
            onClick={() => window.open(getViewUrl(selectedNote.folderUrl), "_blank")}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1">
          <iframe
            src={getViewUrl(selectedNote.folderUrl)}
            className="w-full h-full border-0"
            allow="autoplay"
          ></iframe>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle className="line-clamp-2">{note.title}</CardTitle>
            {note.description && <CardDescription>{note.description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedNote(note)}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => window.open(getDownloadUrl(note.folderUrl), "_blank")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

