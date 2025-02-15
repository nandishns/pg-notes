import Image from "next/image"
import clgLogo from "@/assets/clg-logo.jpeg"
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-4 flex items-center space-x-2 md:mr-6">
          <Image
            src={clgLogo}
            alt="College Logo"
            width={60}
            height={60}
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </div>
        <div className="flex-1 flex-col space-y-1 text-center">
          <h1 className="text-lg font-semibold leading-none tracking-tight">S. V. E Society&apos;s</h1>
          <h2 className="text-[10px] sm:text-sm font-medium leading-none md:text-base">
            SRI CHANNABASAVESHWAR POST GRADUATE STUDIES AND RESEARCH CENTER, BHALKI
          </h2>
          <p className="text-[8px] sm:text-xs text-muted-foreground md:text-sm">
            (Affiliated to Bidar University, Bidar)
          </p>
        </div>
      </div>
    </header>
  )
}

