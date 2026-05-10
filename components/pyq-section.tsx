import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Clock, ExternalLink, FileText } from "lucide-react"
import { Subject } from "@/lib/data"

interface PYQPaper {
  year: number
  paperUrl?: string
}

interface PYQSectionProps {
  subject: Subject
  selectedPaper: PYQPaper | null
  setSelectedPaper: (paper: PYQPaper | null) => void
  handleDownload: (url: string) => void
}

export function PYQSection({ subject, selectedPaper, setSelectedPaper, handleDownload }: PYQSectionProps) {
  const papers: PYQPaper[] = subject.pyqPapers?.map((paper) => ({
    year: paper.year,
    paperUrl: paper.paperUrl,
  })) || []

  if (papers.length === 0) return null

  return (
    <section className="mt-10 sm:mt-12">
      <div className="mb-5 flex flex-col items-center gap-1 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Practice Material
        </p>
        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Previous Year Question Papers
        </h2>
        <div className="mt-1 h-px w-10 bg-accent/70" />
      </div>

      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {papers.map((paper) => {
          const available = Boolean(paper.paperUrl)
          return (
            <Card
              key={paper.year}
              className="group relative h-full overflow-hidden rounded-2xl border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)]"
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent via-primary/70 to-primary opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
              <CardHeader className="px-4 pb-2 pt-5 sm:px-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-accent-foreground">
                    <FileText className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Question Paper
                  </span>
                </div>
                <CardTitle className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {paper.year}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-2 sm:px-5">
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1 h-9 rounded-lg text-xs font-medium"
                    onClick={() => setSelectedPaper(paper)}
                    aria-label={`View ${paper.year} Paper`}
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
                    onClick={() => handleDownload(paper.paperUrl || "")}
                    aria-label={`Download ${paper.year} Paper`}
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
