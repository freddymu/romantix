import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Pacifico, Geist, Geist_Mono } from 'next/font/google'
import type React from 'react'
import { AppProvider } from '@/contexts/AppContext'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' })

export const metadata: Metadata = {
  title: 'Romantix.quest - Reimagine Your Relationship',
  description: 'Get personalized relationship feedback with AI-powered insights.',
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${pacifico.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="font-sans bg-elegant-background text-elegant-text">
        <main>
          <AppProvider>{children}</AppProvider>
        </main>
      </body>
    </html>
  )
}
