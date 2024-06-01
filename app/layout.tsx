import type { Metadata } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "Song Choicer • Rank your albums",
  description:
    "Song Choicer vous permet de voter pour vos albums préférés et de voir le classement final. Basé à Paris.",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    title: "MusicRanker • Classement des Chansons",
    statusBarStyle: "black-translucent",
  },
  keywords: [
    "music",
    "ranker",
    "musique",
    "classement",
    "chansons",
    "vote",
    "MusicRanker",
    "Paris",
  ],
  openGraph: {
    type: "website",
    url: "https://musicranker.com",
    title: "MusicRanker • Classement des Chansons",
    description:
      "MusicRanker vous permet de voter pour vos chansons préférées et de voir le classement final. Basé à Paris.",
    siteName: "MusicRanker • Classement des Chansons",
    images: ["https://musicranker.com/musicranker.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://musicranker.com",
    creator: "@MusicRanker",
    images: "https://musicranker.com/musicranker.jpg",
    title: "MusicRanker • Classement des Chansons",
    description:
      "MusicRanker vous permet de voter pour vos chansons préférées et de voir le classement final. Basé à Paris.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
  );
}
