import './globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
// import { WithContext, Person } from 'schema-dts'
import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';

import QueryProvider from '@/components/QueryProvider';
import ThemeProvider from '@/components/ThemeProvider';

// const jsonLd: WithContext<Person> = {
//   '@context': 'https://schema.org',
//   '@type': 'Person',
//   name: 'Song Choicer',
//   jobTitle: 'Music Ranking Platform',
//   description:
//     'Song Choicer allows users to vote for their favorite albums and see the final rankings.',
//   image: 'https://songchoicer.mehdihattou.com/android-chrome-512x512.png',
//   url: 'Song Choicer',
//   sameAs: ['https://x.com/Mehdi_Hattou'],
// }

// const JSONLD = ({ data }: { data: WithContext<Person> }) => (
//   <script
//     type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
//   />
// )

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://songchoicer.mehdihattou.com',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Song Choicer • Song Ranking',
  },
  description: 'Song Choicer allows you to vote for your favorite albums and see the final ranking.',
  icons: {
    apple: ['/apple-touch-icon.png'],
    host: 'Song Choicer',
    icon: ['/favicon.ico'],
    shortcut: ['/apple-touch-icon.png'],
  },
  keywords: ['music', 'ranker', 'musique', 'ranking', 'songs', 'vote', 'MusicRanker', 'Song Choicer'],
  manifest: '/manifest.json',
  openGraph: {
    description: 'Song Choicer allows you to vote for your favorite albums and see the final ranking.',
    images: ['https://songchoicer.mehdihattou.com/android-chrome-512x512.png'],
    siteName: 'Song Choicer • Rank your albums',
    title: 'Song Choicer • Song Ranking',
    type: 'website',
    url: 'Song Choicer',
  },
  robots: { follow: true, index: true },
  title: 'Song Choicer • Rank your albums',
  twitter: {
    card: 'summary_large_image',
    creator: '@Teczer_',
    description: 'Song Choicer allows you to vote for your favorite albums and see the final ranking.',
    images: 'https://songchoicer.mehdihattou.com/android-chrome-512x512.png',
    site: 'Song Choicer',
    title: 'Song Choicer • Rank your albums',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className="min-h-[100svh] max-w-screen overflow-x-hidden">
        <NuqsAdapter>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Suspense>{children}</Suspense>
            </ThemeProvider>
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
