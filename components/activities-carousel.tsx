"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import { fetchActivities } from "@/lib/activities"
import type { ActivityPhoto } from "@/lib/activities"
import { PhotoLightbox } from "@/components/photo-lightbox"

const PREVIEW_COUNT = 12

export function ActivitiesCarousel() {
  const [photos, setPhotos] = useState<ActivityPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    fetchActivities().then((p) => {
      if (cancelled) return
      setPhotos(p)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Hide section entirely when loaded with zero photos
  if (!loading && photos.length === 0) return null

  const visible = photos.slice(0, PREVIEW_COUNT)

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const distance = Math.min(el.clientWidth * 0.8, 600)
    el.scrollBy({ left: dir === "left" ? -distance : distance, behavior: "smooth" })
  }

  return (
    <section className="border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-6 flex flex-col items-center gap-1 text-center sm:mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Department Life
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Recent Activities
          </h2>
          <div className="mt-1 h-px w-12 bg-accent/70" />
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-card/90 to-transparent sm:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-card/90 to-transparent sm:block"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-md transition-all hover:-translate-x-0.5 hover:border-primary/40 hover:text-primary md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-md transition-all hover:translate-x-0.5 hover:border-primary/40 hover:text-primary md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 sm:gap-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
            style={{ scrollPaddingInline: "8px" }}
            aria-label="Recent activity photos"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] w-[260px] flex-shrink-0 animate-pulse snap-start rounded-2xl bg-muted/60 sm:w-[300px]"
                  />
                ))
              : visible.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative aspect-[4/3] w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 sm:w-[300px]"
                    aria-label={`Open ${photo.name || "photo"}`}
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition-opacity duration-200 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                      <p className="font-display text-sm font-semibold text-white line-clamp-1">
                        {photo.name || "Activity"}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/70">
                        {new Date(photo.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </button>
                ))}
          </div>
        </div>

        {!loading && photos.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Link
              href="/activities"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <Camera className="h-3.5 w-3.5" />
              View all activities
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
