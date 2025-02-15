"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Note } from "@/lib/data"

interface PreviewPageProps {
  note: Note
  onBack: () => void
}

export function PreviewPage({ note, onBack }: PreviewPageProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const getFileId = (url: string) => {
    const match = url.match(/\/d\/(.+?)\//)
    return match ? match[1] : null
  }

  const getViewUrl = (url: string) => {
    const fileId = getFileId(url)
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullScreen(true)
    } else {
      document.exitFullscreen()
      setIsFullScreen(false)
    }
  }

  if (!note.folderUrl) {
    return (
      <div className="flex flex-col w-full h-screen">
        <div className="flex items-center gap-2 p-4 border-b">
          <Button 
            variant="ghost" 
            onClick={onBack}
            aria-label="Go back to notes list"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h3 className="text-sm font-medium flex-1">{note.title}</h3>
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
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex items-center gap-2 p-4 border-b">
        <Button 
          variant="ghost" 
          onClick={onBack}
          aria-label="Go back to notes list"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h3 className="text-sm font-medium flex-1">{note.title}</h3>
        <Button
          variant="ghost"
          onClick={toggleFullScreen}
          aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullScreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex-1">
        <iframe
          src={getViewUrl(note.folderUrl)}
          className="w-full h-full border-0"
          allow="autoplay"
          title={`Preview of ${note.title}`}
          aria-label={`Document preview for ${note.title}`}
        ></iframe>
      </div>
    </div>
  )
} 