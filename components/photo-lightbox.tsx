"use client"

import { useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { ActivityPhoto } from "@/lib/activities"

interface PhotoLightboxProps {
  photos: ActivityPhoto[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }: PhotoLightboxProps) {
  const photo = photos[currentIndex]

  useEffect(() => {
    if (!photo) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
        onNavigate(currentIndex + 1)
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1)
      }
    }
    window.addEventListener("keydown", handleKey)
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = original
    }
  }, [photo, currentIndex, photos.length, onClose, onNavigate])

  if (!photo) return null

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < photos.length - 1

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 px-4 py-6 backdrop-blur-md animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-label={photo.name}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex - 1)
          }}
          className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:-translate-x-0.5 hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex + 1)
          }}
          className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:translate-x-0.5 hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      <figure
        className="relative flex max-h-full max-w-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={photo.id}
          src={photo.fullUrl}
          alt={photo.name}
          className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl sm:max-h-[82vh]"
          loading="eager"
        />
        <figcaption className="mt-3 max-w-[90vw] text-center sm:mt-4">
          <p className="font-display text-sm font-medium text-white sm:text-base">
            {photo.name || "Untitled"}
          </p>
          <p className="mt-0.5 text-[11px] text-white/60 sm:text-xs">
            {new Date(photo.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <span className="mx-2 text-white/30">&middot;</span>
            <span>
              {currentIndex + 1} / {photos.length}
            </span>
          </p>
        </figcaption>
      </figure>
    </div>
  )
}
