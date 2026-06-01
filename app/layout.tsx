import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CSLOG – Prevoz i pratnja vangabaritnih tereta',
  description: 'Nema veze koliko je teško i veliko. Cargo Special Logistic vrši transport vangabaritnog tereta od 2005. godine.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const lang = pathname.startsWith('/en') ? 'en' : 'sr'

  return (
    <html lang={lang} suppressHydrationWarning className={`${bebas.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
