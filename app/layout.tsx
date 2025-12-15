import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const sentient = localFont({
  src: [
    {
      path: "../public/Sentient-Extralight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/Sentient-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-sentient",
})

export const metadata: Metadata = {
  title: "InspectPro",
  description: "Smart field inspections anywhere, anytime with offline-first PWA technology",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} ${sentient.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
