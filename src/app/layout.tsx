import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  JetBrains_Mono,
  Roboto_Condensed,
} from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { UtilityStrip } from "@/components/layout/utility-strip";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin", "greek"],
  weight: ["400", "600"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-display-var",
  subsets: ["latin", "greek"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Γρανάζια & εξαρτήματα στην Αθήνα`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "μηχανουργείο",
    "Αθήνα",
    "τόρνος",
    "φρέζα",
    "γρανάζια",
    "κατασκευή γραναζιών",
    "κορώνες",
    "ατέρμονες",
    "πολύσφηνα",
    "μηχανολογικά εξαρτήματα",
    "Αλεξανδράκης",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "el_GR",
    type: "website",
    images: [
      {
        url: siteConfig.ogShareImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Μηχανουργείο Αθήνα`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogShareImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="el"
      className={`${plexSans.variable} ${plexMono.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-14 md:pb-0">
        <LocalBusinessJsonLd />
        <UtilityStrip />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
