"use client"

import { ArrowRight, Clock, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { RecentNote } from "@/lib/hooks/use-recent-notes"
import type { Lesson } from "@/lib/data"

interface RecentReadingProps {
  recent: RecentNote[]
  onOpen: (note: Lesson) => void
  onClear: () => void
}

export function RecentReading({ recent, onOpen, onClear }: RecentReadingProps) {
  if (recent.length === 0) return null

  return (
    <section className="mt-6 sm:mt-8" aria-label="Continue reading">
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2.25} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Continue reading
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Clear reading history"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((note) => (
          <button
            key={note.id}
            type="button"
            onClick={() =>
              onOpen({
                id: note.id,
                title: note.title,
                folderUrl: note.folderUrl,
              })
            }
            className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
          >
            <Card className="relative h-full overflow-hidden rounded-xl border-border/70 bg-card/90 px-4 py-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-sm">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-primary to-accent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground line-clamp-1">
                {note.semesterName} &middot; {note.subjectName}
              </p>
              <p className="mt-0.5 font-display text-sm font-semibold text-foreground line-clamp-1">
                {note.title}
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary opacity-80 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                Continue
                <ArrowRight className="h-3 w-3" />
              </div>
            </Card>
          </button>
        ))}
      </div>
    </section>
  )
}
