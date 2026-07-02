import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`dark ${ibmPlexSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
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
