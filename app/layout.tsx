import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Department of Mathematics - Sri Channabasaveshwar PG Studies",
    template: "%s | Department of Mathematics - Sri Channabasaveshwar PG Studies"
  },
  description: "Mathematics Department Notes Portal",
  keywords: ["study notes", "educational resources", "learning materials", "academic notes"],
  authors: [
    { 
      name: "Dr. SHARANAPPA G. DONGARGAON",
      url: "https://channabasaveshwar-notes.vercel.app"
    }
  ],
  creator: "Dr. SHARANAPPA G. DONGARGAON - Head, Department of Mathematics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://channabasaveshwar-notes.vercel.app",
    title: "Department of Mathematics - Sri Channabasaveshwar PG Studies",
    description: "Mathematics Department Notes Portal",
    siteName: "Department of Mathematics - Sri Channabasaveshwar PG Studies",
  },
  twitter: {  
    card: "summary_large_image",
    title: "Department of Mathematics - Sri Channabasaveshwar PG Studies",
    description: "Mathematics Department Notes Portal",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

