import type { Metadata } from "next";
import {
  Commissioner,
  JetBrains_Mono,
  Sofia_Sans_Condensed,
} from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const commissioner = Commissioner({
  variable: "--font-body",
  subsets: ["latin", "greek"],
});

const sofiaCondensed = Sofia_Sans_Condensed({
  variable: "--font-display-var",
  subsets: ["latin", "greek"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin", "greek"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Μηχανουργείο Αθήνα`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "μηχανουργείο",
    "Αθήνα",
    "τόρνος",
    "φρέζα",
    "μετάδοση κίνησης",
    "μηχανολογικά εξαρτήματα",
    "Αλεξανδράκης",
    "γρανάζια",
    "Καστοριάς",
  ],
  icons: {
    icon: "/favicon.svg",
    apple: "/logo-mark.svg",
  },
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
      className={`dark ${commissioner.variable} ${sofiaCondensed.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          property="og:image:secure_url"
          content={`${siteConfig.siteUrl}${siteConfig.ogShareImage}`}
        />
        <link
          rel="image_src"
          href={`${siteConfig.siteUrl}${siteConfig.ogShareImage}`}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <TooltipProvider delay={200}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
