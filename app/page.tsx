"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { NotesGrid } from "@/components/notes-grid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { semesters } from "@/lib/data"

export default function Home() {
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = semesters
    .flatMap((semester) =>
      semester.notes.map((note) => ({
        ...note,
        semesterName: semester.name,
      })),
    )
    .filter(
      (note) =>
        (selectedSemester ? note.semester.toString() === selectedSemester : true) &&
        (searchQuery ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) : true),
    )

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="sticky top-20 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-2 text-center">
          <h1 className="text-sm font-bold tracking-tight">DEPARTMENT OF MATHEMATICS</h1>
        </div>
      </div>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
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
          {filteredNotes.length > 0 ? (
            <NotesGrid notes={filteredNotes} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No notes found</h3>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>
      </main>
      <footer className="bg-black text-white">
        <div className="container px-4 py-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Department of Mathematics</h2>
            <div className="space-y-2">
              <p className="text-gray-400">Sri Channabasaveshwar PG Studies and Research Center</p>
              <p className="text-gray-400">Bhalki-585328, Dist. Bidar</p>
              
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Department of Mathematics, SCPG Studies and Research Center, Bhalki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

