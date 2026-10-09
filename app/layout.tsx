import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/content";
import { isProduction, siteUrl } from "@/lib/site-url";
import "./globals.css";

/**
 * Two families. Geist for everything readable, Geist Mono for the things the
 * product itself sets in mono: rupee amounts, millimetre dimensions and
 * document numbers.
 *
 * Inter was dropped on 2026-10-09. It is the product's own typeface, which was
 * the argument for using it, but it is also the single most common face on
 * AI-generated marketing pages and the owner's objection was precisely that
 * the page looked generated. Brand continuity survives through the colour and
 * the drawing language; the type does not have to carry it too.
 */
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kuotivo: window quoting software for Indian fabricators",
    template: "%s · Kuotivo",
  },
  description: site.description,
  keywords: [
    "window quotation software",
    "aluminium fabrication software India",
    "GST invoice software for fabricators",
    "fenestration quoting software",
    "shop drawing software windows",
  ],
  authors: [{ name: site.author.name, url: site.author.url }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: "Kuotivo: quote a window in minutes, not an evening",
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuotivo: quote a window in minutes, not an evening",
    description: site.description,
  },
  alternates: { canonical: siteUrl },
  // A preview deployment must never be indexed as a duplicate of the real site.
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/**
 * Structured data. `SoftwareApplication` is what a buyer search should match,
 * and the `Organization` node is what an AI answer engine cites. No aggregate
 * rating and no review markup: there are no reviews, and inventing them would
 * be both wrong and a manual action waiting to happen.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: site.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: site.description,
      url: siteUrl,
      inLanguage: "en-IN",
      featureList: [
        "Window shop-drawing generator with dimension chains and plan strips",
        "Quotation builder with rate cards, sq.ft and m² billing",
        "GST tax invoices with CGST/SGST and IGST decided from state code",
        "Gap-free statutory document numbering per financial year",
        "Receipts, part payments and receivables ageing",
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Aluminium window, door and glazing fabricators in India",
      },
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.author.name,
      url: site.author.url,
      email: site.email,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Serialised from a literal defined in this file: no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
