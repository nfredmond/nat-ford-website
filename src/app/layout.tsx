import type { Metadata } from "next";
import { Overpass, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";

// Overpass descends from Highway Gothic, the FHWA sign alphabet. It sets
// headings and interface text; Source Serif 4 sets reading text.
const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
  weight: ["400", "600", "700", "800"],
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.natfordplanning.com"),
  title: {
    default: "OpenPlan | Nat Ford Planning & Analysis",
    template: "%s | Nat Ford Planning & Analysis",
  },
  alternates: {
    canonical: "./",
  },
  description: "OpenPlan is free, open-source software for transportation and land-use planning, built by planner Nathaniel Redmond and published by Nat Ford Planning & Analysis.",
  keywords: [
    "OpenPlan",
    "open-source planning software",
    "transportation planning software",
    "land-use planning",
    "regional transportation plan",
    "active transportation plan",
    "public engagement",
    "AequilibraE",
    "ActivitySim",
    "rural planning",
    "RTPA",
  ],
  authors: [{ name: "Nathaniel Redmond" }],
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
    <html lang="en" suppressHydrationWarning className={`${overpass.variable} ${serif.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`font-body antialiased flex min-h-dvh flex-col bg-[color:var(--background)] text-[color:var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
