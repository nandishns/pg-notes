"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { fetchActivities } from "@/lib/activities"
import type { ActivityPhoto } from "@/lib/activities"
import { PhotoLightbox } from "@/components/photo-lightbox"

export default function ActivitiesPage() {
  const [photos, setPhotos] = useState<ActivityPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
          <Link
            href="/"
            className="group mb-4 inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:-translate-x-0.5 hover:border-primary/40 hover:bg-card hover:text-foreground sm:mb-5"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <header className="mb-6 flex flex-col items-center gap-1 text-center sm:mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Department Life
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Recent Activities
            </h1>
            <div className="mt-1 h-px w-12 bg-accent/70" />
            {!loading && photos.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                {photos.length} {photos.length === 1 ? "photo" : "photos"} &middot; ordered by latest
              </p>
            )}
          </header>

          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-xl bg-muted/60" />
              ))}
            </div>
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 animate-fade-up"
                  style={{ animationDelay: `${Math.min(idx * 25, 320)}ms` }}
                  aria-label={`Open ${photo.name || "photo"}`}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-2 text-left opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100 sm:p-3">
                    <p className="font-display text-[12px] font-semibold text-white line-clamp-1 sm:text-sm">
                      {photo.name || "Activity"}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-white/75">
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
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Camera className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                No photos yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Activity photos will appear here as they are added to the Drive folder.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto border-t border-border/60 bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-[11px] text-muted-foreground sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} Department of Mathematics, CBPG Bhalki
        </div>
      </footer>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
