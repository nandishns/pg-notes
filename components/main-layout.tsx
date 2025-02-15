import { SiteHeader } from "@/components/site-header"

export function MainLayout({ children }: { children: React.ReactNode }) {
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
      <footer className="bg-black text-white">
        <div className="container px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">Department of Mathematics</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start divide-y sm:divide-y-0 sm:divide-x divide-gray-800">
              <div className="px-4 first:pl-0 py-4 sm:py-0">
                <p className="font-medium">Prof. Meenakumari Patil</p>
                <p className="text-sm text-gray-300">Principal (MCom, MA, MPhil, MEd)</p>
              </div>
              <div className="px-4 py-4 sm:py-0">
                <p className="font-medium">Mr. Sharanappa G.D</p>
                <p className="text-sm text-gray-300">Head of Department (MSc, B.Ed)</p>
              </div>
              <div className="px-4 py-4 sm:py-0">
                <p className="font-medium">Kum. Anjali M. Kale</p>
                <p className="text-sm text-gray-300">Lecturer (MSc, B.Ed)</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-gray-400">Sri Channabasaveshwar PG Studies and Research Center</p>
              <p className="text-gray-400">Bhalki-585328, Dist. Bidar</p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Department of Mathematics, CVPG Bhalki</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 