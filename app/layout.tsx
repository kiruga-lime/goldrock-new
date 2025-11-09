import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Safari Uganda - Premium Wildlife Adventures",
  description:
    "Experience unforgettable safari adventures in Uganda with professional guides, luxury accommodations, and encounters with Africa's most magnificent wildlife. Discover gorilla trekking, Big Five game drives, and pristine national parks.",
  keywords: "Uganda safari, wildlife tours, gorilla trekking, national parks, luxury safari, Africa adventure",
  authors: [{ name: "Safari Uganda" }],
  creator: "Safari Uganda",
  publisher: "Safari Uganda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://safariuganda.com"),
  openGraph: {
    title: "Safari Uganda - Premium Wildlife Adventures",
    description:
      "Experience unforgettable safari adventures in Uganda with professional guides and luxury accommodations.",
    url: "https://safariuganda.com",
    siteName: "Safari Uganda",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Safari Uganda - Wildlife Adventures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safari Uganda - Premium Wildlife Adventures",
    description:
      "Experience unforgettable safari adventures in Uganda with professional guides and luxury accommodations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
