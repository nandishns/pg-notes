import { SiteHeader } from "@/components/site-header"
import { useVisitorCount } from "@/lib/hooks/use-visitor-count"
import { Users } from "lucide-react"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const visitorCount = useVisitorCount()

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
          {children}
        </section>
      </main>
      <footer className="bg-black text-white py-4">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center text-sm">
            <h2 className="text-lg font-bold mb-2">Department of Mathematics</h2>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-2">
              <div>
                <p className="font-medium">Prof. Meenakumari Patil</p>
                <p className="text-xs text-gray-300">Principal (MCom, MA, MPhil, MEd)</p>
              </div>
              <div className="h-8 w-px bg-gray-600 hidden sm:block"></div>
              <div>
                <p className="font-medium">Mr. Sharanappa G.Dongargaon</p>
                <p className="text-xs text-gray-300">Head of Department (MSc, B.Ed)</p>
              </div>
              <div className="h-8 w-px bg-gray-600 hidden sm:block"></div>
              <div>
                <p className="font-medium">Kum. Anjali M. Kale</p>
                <p className="text-xs text-gray-300">Lecturer (MSc, B.Ed)</p>
              </div>
            </div>
           
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
              <Users className="h-4 w-4" />
              <span className="text-xs">
                {visitorCount === null 
                  ? 'Loading...' 
                  : `${(visitorCount || 0).toLocaleString()} views`}
              </span>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">&copy; {new Date().getFullYear()} Department of Mathematics, CBPG Bhalki</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
