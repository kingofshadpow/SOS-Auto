import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import CookieBanner from "@/components/layout/cookie-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOS Pièce Auto - Votre Expert en Pièces Automobiles",
  description:
    "Trouvez les pièces parfaites pour votre véhicule en quelques clics. Plus de 50 000 références disponibles avec livraison rapide.",
  keywords: "pièces automobiles, pièces auto, garage, mécanique, Renault, Peugeot, BMW, Mercedes",
  authors: [{ name: "SOS Pièce Auto" }],
  openGraph: {
    title: "SOS Pièce Auto - Votre Expert en Pièces Automobiles",
    description: "Trouvez les pièces parfaites pour votre véhicule en quelques clics.",
    type: "website",
    locale: "fr_FR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
