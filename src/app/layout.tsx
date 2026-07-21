import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.natfordplanning.com"),
  title: {
    default: "Nat Ford Planning & Analysis | Open-Source Planning & GIS",
    template: "%s | Nat Ford Planning & Analysis",
  },
  alternates: {
    canonical: "./",
  },
  description: "Free and open-source planning, GIS, aerial, AI, and operations software with paid implementation, custom forks, hosting, onboarding, support, and transportation planning services.",
  keywords: [
    "urban planning",
    "transportation planning",
    "GIS analysis",
    "aerial mapping",
    "photogrammetry",
    "grant writing",
    "open source software",
    "custom software development",
    "AI implementation",
    "United States",
    "rural planning",
    "tribal transportation",
    "small towns",
    "RTPA",
    "transportation commission",
  ],
  authors: [{ name: "Nathaniel Ford Redmond" }],
  creator: "Nat Ford Planning & Analysis",
  // og:title/og:description are intentionally unset so each page's own
  // title and description flow through to its social card.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nat Ford Planning & Analysis",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased flex min-h-dvh flex-col bg-[color:var(--background)] text-[color:var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
