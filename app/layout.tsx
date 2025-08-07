import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CookieBanner from "@/components/layout/cookie-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOS Pièce Auto - Votre spécialiste en pièces automobiles",
  description: "Découvrez notre large gamme de pièces automobiles de qualité. Livraison rapide, prix compétitifs et conseil d'expert pour tous vos besoins auto.",
  keywords: "pièces automobiles, pièces auto, garage, réparation, entretien, voiture",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}
