import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Datorix — Database Activity Monitoring", template: "%s | Datorix" },
  description:
    "Passive, agentless Database Activity Monitoring powered by Deep Packet Inspection. Complete visibility across Oracle, PostgreSQL, MySQL, SQL Server and EDB — with no performance overhead.",
  keywords: ["database activity monitoring", "DAM", "deep packet inspection", "DPI", "data security", "SQL audit", "SOX", "HIPAA", "GDPR", "PCI-DSS"],
  authors: [{ name: "Datorix" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.datorix.com",
    siteName: "Datorix",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Datorix — Database Activity Monitoring" }],
  },
  twitter: { card: "summary_large_image", creator: "@datorix" },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.datorix.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Datorix",
  applicationCategory: "SecurityApplication",
  description:
    "Real-time SQL firewall, bypass detection, and compliance analytics for your database fleet.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://www.datorix.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <link rel="canonical" href="https://datorix.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
