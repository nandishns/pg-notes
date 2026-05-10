"use client"

import { ArrowRight, BookOpen, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Semester } from "@/lib/data"

interface SubjectGridProps {
  semesters: Semester[]
  selectedSemester: string
  onSelectSubject: (semesterId: string, subjectId: string) => void
}

export function SubjectGrid({ semesters, selectedSemester, onSelectSubject }: SubjectGridProps) {
  const sem = semesters.find((s) => s.id.toString() === selectedSemester)
  if (!sem) return null

  return (
    <section aria-label="Subject library">
      <header className="mb-5 flex flex-col items-center gap-1 text-center sm:mb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {sem.name}
        </p>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Choose a subject
        </h2>
        <div className="mt-1 h-px w-12 bg-accent/70" />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {sem.subjects.map((subject, idx) => {
          const unitCount = subject.lessons.length
          const paperCount = subject.pyqPapers?.length ?? 0
          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSelectSubject(sem.id.toString(), subject.id)}
              className="group block w-full rounded-2xl text-left animate-fade-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ animationDelay: `${Math.min(idx * 30, 180)}ms` }}
              aria-label={`Open ${subject.name}`}
            >
              <Card className="relative h-full overflow-hidden rounded-2xl border-border/70 bg-card transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)]">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-primary/70 to-accent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {sem.name}
                  </p>
                  <h4 className="mt-1 font-display text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
                    {subject.name}
                  </h4>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="h-3 w-3" strokeWidth={2.25} />
                      {unitCount} {unitCount === 1 ? "unit" : "units"}
                    </span>
                    {paperCount > 0 && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="inline-flex items-center gap-1">
                          <FileText className="h-3 w-3" strokeWidth={2.25} />
                          {paperCount} {paperCount === 1 ? "paper" : "papers"}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    Open
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Card>
            </button>
          )
        })}
      </div>
    </section>
  )
}
