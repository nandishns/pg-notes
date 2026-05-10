import Image from "next/image"
import clgLogo from "@/assets/clg-logo.jpeg"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 sm:py-4 lg:px-8">
        <div className="shrink-0">
          <div className="rounded-full ring-1 ring-border/70 bg-card p-0.5 shadow-sm">
            <Image
              src={clgLogo}
              alt="College Logo"
              width={64}
              height={64}
              priority
              className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            S. V. E Society&apos;s
          </p>
          <h1 className="font-display text-[15px] font-semibold leading-snug text-foreground sm:text-lg md:text-xl">
            Sri Channabasaveshwar Post Graduate Studies
          </h1>
          <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
            Research Center, Bhalki &middot; Affiliated to Bidar University
          </p>
        </div>

        <div className="hidden h-12 w-12 shrink-0 sm:block" aria-hidden="true" />
      </div>

      <div className="border-t border-border/50 bg-secondary/40">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5 sm:px-6 lg:px-8">
          <span className="h-1 w-1 rounded-full bg-accent" />
          <p className="font-display text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/80 sm:text-xs">
            Department of Mathematics
          </p>
          <span className="h-1 w-1 rounded-full bg-accent" />
        </div>
      </div>
    </header>
  )
}
