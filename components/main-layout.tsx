import { SiteHeader } from "@/components/site-header"
import { useVisitorCount } from "@/lib/hooks/use-visitor-count"
import { Users } from "lucide-react"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const visitorCount = useVisitorCount()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
          {children}
        </div>
      </main>
      <footer className="mt-auto bg-foreground text-background/90">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-base font-semibold tracking-tight text-background sm:text-lg">
              Department of Mathematics
            </h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-background/50">
              Faculty &amp; Staff
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-2">
              <div>
                <p className="text-sm font-medium text-background">Prof. Meenakumari Patil</p>
                <p className="text-[11px] text-background/60">Principal &middot; MCom, MA, MPhil, MEd</p>
              </div>
              <div className="sm:border-x sm:border-background/15 sm:px-4">
                <p className="text-sm font-medium text-background">Mr. Sharanappa G. Dongargaon</p>
                <p className="text-[11px] text-background/60">Head of Department &middot; MSc, B.Ed</p>
              </div>
              <div>
                <p className="text-sm font-medium text-background">Kum. Anjali M. Kale</p>
                <p className="text-[11px] text-background/60">Lecturer &middot; MSc, B.Ed</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-background/10 pt-4 text-background/60 sm:flex-row sm:gap-4">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium">
                  {visitorCount === null
                    ? "Loading…"
                    : `${(visitorCount || 0).toLocaleString()} views`}
                </span>
              </div>
              <span className="hidden h-3 w-px bg-background/20 sm:block" />
              <p className="text-[11px]">
                &copy; {new Date().getFullYear()} CBPG, Bhalki
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
