import type { Metadata } from 'next'
import type { Viewport } from 'next'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import './globals.css'
import QueryProvider from '@/components/QueryProvider'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Song Choicer • Rank your albums',
  description:
    'Song Choicer allows you to vote for your favorite albums and see the final ranking.',
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-touch-icon.png'],
    shortcut: ['/apple-touch-icon.png'],
    host: 'songchoicer.com',
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    title: 'Song Choicer • Song Ranking',
    statusBarStyle: 'black-translucent',
  },
  keywords: [
    'music',
    'ranker',
    'musique',
    'ranking',
    'songs',
    'vote',
    'MusicRanker',
    'Song Choicer',
  ],
  openGraph: {
    type: 'website',
    url: 'https://songchoicer.com',
    title: 'Song Choicer • Song Ranking',
    description:
      'Song Choicer allows you to vote for your favorite albums and see the final ranking.',
    siteName: 'Song Choicer • Rank your albums',
    images: ['https://songchoicer.com/android-chrome-512x512.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://songchoicer.com/',
    creator: '@Teczer_',
    images: 'https://songchoicer.com/android-chrome-512x512.png',
    title: 'Song Choicer • Rank your albums',
    description:
      'Song Choicer allows you to vote for your favorite albums and see the final ranking.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className="min-h-screen max-w-screen mx-auto">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
