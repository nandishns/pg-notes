"use client"

import { useState } from "react"
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Download,
  ExternalLink,
  RotateCcw,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PreviewPage } from "@/components/preview-page"
import type { Lesson, PYQPaper, Semester } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/main-layout"
import { WelcomeSection } from "@/components/welcome-section"
import { PYQSection } from "@/components/pyq-section"
import { SubjectGrid } from "@/components/subject-grid"
import { RecentReading } from "@/components/recent-reading"
import { useRecentNotes } from "@/lib/hooks/use-recent-notes"

interface SearchableLesson extends Lesson {
  semesterName: string
  subjectName: string
  semester: number
  subject: string
}

interface NotesGridProps {
  notes: SearchableLesson[]
  onPreviewChange: (isPreview: boolean) => void
  isPreviewMode: boolean
  semesters: Semester[]
  selectedSemester: string
  onSemesterChange: (semester: string) => void
  selectedSubject: string
  onSubjectChange: (subject: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onSelectSubject: (semesterId: string, subjectId: string) => void
  onHome: () => void
  onBackToSemester: () => void
  isSearching: boolean
}

export function NotesGrid({
  notes,
  onPreviewChange,
  semesters,
  selectedSemester,
  onSemesterChange,
  selectedSubject,
  onSubjectChange,
  searchQuery,
  onSearchChange,
  onSelectSubject,
  onHome,
  onBackToSemester,
  isSearching,
}: NotesGridProps) {
  const [selectedNote, setSelectedNote] = useState<Lesson | null>(null)
  const [selectedPaper, setSelectedPaper] = useState<PYQPaper | null>(null)
  const { toast } = useToast()
  const { recent, add: addRecent, clear: clearRecent } = useRecentNotes()

  const getFileId = (url: string) => {
    const match = url.match(/\/d\/(.+?)\//)
    return match ? match[1] : null
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
    if (note.folderUrl) {
      const enriched = notes.find((n) => n.id === note.id)
      if (enriched) {
        addRecent({
          id: enriched.id,
          title: enriched.title,
          subjectId: enriched.subject,
          subjectName: enriched.subjectName,
          semesterId: enriched.semester,
          semesterName: enriched.semesterName,
          folderUrl: enriched.folderUrl,
        })
      }
    }
  }

  const handleOpenRecent = (note: Lesson) => {
    setSelectedNote(note)
    onPreviewChange(true)
  }

  const handleBack = () => {
    setSelectedNote(null)
    onPreviewChange(false)
  }

  const currentSemester = semesters.find((s) => s.id.toString() === selectedSemester)
  const subjects = currentSemester?.subjects || []
  const currentSubject = subjects.find((s) => s.id === selectedSubject)
  const isHomepage = !isSearching && selectedSemester === "0"
  const isSemesterView = !isSearching && selectedSemester !== "0" && selectedSubject === "0"
  const isUnitsView = !isSearching && selectedSubject !== "0" && currentSubject

  if (selectedNote) {
    return <PreviewPage lesson={selectedNote} onBack={handleBack} />
  }
  if (selectedPaper) {
    return (
      <PreviewPage
        lesson={{
          id: selectedPaper.year.toString(),
          title: selectedPaper.year.toString(),
          description: selectedPaper.paperUrl,
          folderUrl: selectedPaper.paperUrl || "",
        }}
        onBack={() => setSelectedPaper(null)}
      />
    )
  }

  const renderNoteCard = (
    note: SearchableLesson,
    idx: number,
    options?: { showContext?: boolean }
  ) => {
    const available = Boolean(note.folderUrl)
    const showContext = options?.showContext ?? false
    return (
      <article
        key={`${note.semester}-${note.subject}-${note.id}`}
        className="animate-fade-up"
        style={{ animationDelay: `${Math.min(idx * 40, 240)}ms` }}
      >
        <Card className="group relative h-full overflow-hidden rounded-2xl border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)]">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-primary/70 to-accent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
          <CardHeader className="px-4 pb-2 pt-5 sm:px-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <BookOpen className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                  available
                    ? "bg-emerald-500/10 text-emerald-700"
                    : "bg-amber-500/10 text-amber-700"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-500" : "bg-amber-500"}`}
                />
                {available ? "Available" : "Coming soon"}
              </span>
            </div>
            {showContext && (
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground line-clamp-1">
                {note.semesterName} &middot; {note.subjectName}
              </p>
            )}
            <CardTitle className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground line-clamp-2">
              <h3>{note.title}</h3>
            </CardTitle>
            {note.description && (
              <CardDescription className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                {note.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-2 sm:px-5">
            <div className="flex gap-2">
              <Button
                variant="default"
                className="flex-1 h-9 rounded-lg text-xs font-medium"
                onClick={() => handleSelectNote(note)}
                aria-label={`View ${note.title}`}
              >
                {available ? (
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                ) : (
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                )}
                View
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-9 rounded-lg border-border/70 text-xs font-medium hover:border-primary/40 hover:bg-primary/5"
                onClick={() => handleDownload(note.folderUrl || "")}
                aria-label={`Download ${note.title}`}
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </article>
    )
  }

  const BackButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="group mb-4 inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:-translate-x-0.5 hover:border-primary/40 hover:bg-card hover:text-foreground sm:mb-5"
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
      {label}
    </button>
  )

  // Subject select uses undefined to trigger placeholder display
  const semesterSelectValue = selectedSemester === "0" ? undefined : selectedSemester
  const subjectSelectValue = selectedSubject === "0" ? undefined : selectedSubject

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
        {/* Filter Card */}
        <section
          aria-label="Browse notes"
          className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-[0_1px_0_0_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Find notes
            </p>
            {!isHomepage && (
              <button
                type="button"
                onClick={onHome}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Reset and return to homepage"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:items-end lg:gap-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="search-notes"
                className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search-notes"
                  placeholder="Search across all semesters…"
                  className="h-11 rounded-xl border-border/70 bg-background pl-9 text-sm focus-visible:ring-primary/30"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Semester
              </label>
              <Select value={semesterSelectValue} onValueChange={onSemesterChange}>
                <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-background text-sm sm:min-w-[160px]">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id.toString()}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Subject
              </label>
              <Select
                value={subjectSelectValue}
                onValueChange={onSubjectChange}
                disabled={selectedSemester === "0"}
              >
                <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-background text-sm disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[200px]">
                  <SelectValue
                    placeholder={
                      selectedSemester === "0" ? "Pick a semester first" : "Select a subject"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="w-full">
          {isSearching ? (
            <>
              <header className="mb-5 flex flex-col items-center gap-1 text-center sm:mb-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {notes.length} {notes.length === 1 ? "result" : "results"}
                </p>
                <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
                  Search results for &ldquo;{searchQuery}&rdquo;
                </h2>
                <div className="mt-1 h-px w-10 bg-accent/70" />
              </header>
              {notes.length > 0 ? (
                <section
                  className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
                  aria-label="Search results"
                >
                  {notes.map((note, idx) => renderNoteCard(note, idx, { showContext: true }))}
                </section>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    No matches
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a different keyword, like a unit name or subject.
                  </p>
                  <button
                    type="button"
                    onClick={onHome}
                    className="mt-4 inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Back to homepage
                  </button>
                </div>
              )}
            </>
          ) : isHomepage ? (
            <>
              <WelcomeSection />
              <RecentReading
                recent={recent}
                onOpen={handleOpenRecent}
                onClear={clearRecent}
              />
            </>
          ) : isSemesterView ? (
            <>
              <BackButton label="Back to home" onClick={onHome} />
              <SubjectGrid
                semesters={semesters}
                selectedSemester={selectedSemester}
                onSelectSubject={onSelectSubject}
              />
            </>
          ) : isUnitsView ? (
            <>
              <BackButton
                label={`Back to ${currentSemester?.name ?? "semester"}`}
                onClick={onBackToSemester}
              />
              <header className="mb-5 flex flex-col items-center gap-1 text-center sm:mb-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {currentSemester?.name}
                </p>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                  {currentSubject!.name}
                </h2>
                <div className="mt-1 h-px w-12 bg-accent/70" />
              </header>

              {notes.length > 0 ? (
                <section
                  className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
                  aria-label="Study notes collection"
                >
                  {notes.map((note, idx) => renderNoteCard(note, idx))}
                </section>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    No units have been added for this subject yet.
                  </p>
                </div>
              )}

              <PYQSection
                subject={currentSubject!}
                selectedPaper={selectedPaper}
                setSelectedPaper={setSelectedPaper}
                handleDownload={handleDownload}
              />
            </>
          ) : null}
        </div>
      </div>
    </MainLayout>
  )
}
