import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Clock, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Subject, Lesson } from "@/lib/data"
import { PreviewPage } from "@/components/preview-page"
import { useState } from "react"
interface PYQPaper {
  year: number
  paperUrl?: string
}

interface PYQSectionProps {
  subject: Subject,
  selectedPaper: PYQPaper | null,
  setSelectedPaper: (paper: PYQPaper | null) => void
  handleDownload: (url: string) => void
}

export function PYQSection({ subject, selectedPaper, setSelectedPaper, handleDownload }: PYQSectionProps) {
  const { toast } = useToast()

  const papers: PYQPaper[] = subject.pyqPapers?.map((paper) => ({
    year: paper.year,
    paperUrl: paper.paperUrl,
  })) || []



  return (
    <section className="mt-8 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Previous Year Question Papers</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {papers.map((paper) => (
          <Card key={paper.year} className="hover:shadow-md transition-shadow">
            <CardHeader className="py-4 px-4">
              <CardTitle className="text-base font-medium">
                {paper.year} Paper
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="flex-1 h-8 text-sm"
                  onClick={() => setSelectedPaper(paper)}
                  aria-label={`View ${paper.year} Paper`}
                >
                  {paper.paperUrl ? (
                    <ExternalLink className="mr-2 h-3 w-3" />
                  ) : (
                    <Clock className="mr-2 h-3 w-3" />
                  )}
                  View
                </Button>
                <Button 
                  variant="secondary"
                  className="flex-1 h-8 text-sm"
                  onClick={() => handleDownload(paper.paperUrl || "")}
                  aria-label={`Download ${paper.year} Paper`}
                >
                  <Download className="mr-2 h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 