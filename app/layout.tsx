import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google"

// Inter is the primary UI font for the GoMyCode-style design system.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MBS Skills - Formations numériques à Tunis",
  description:
    "Formations pratiques en développement web, data, design, mobile et intelligence artificielle, encadrées par des formateurs à Tunis.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased ${inter.variable}`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
