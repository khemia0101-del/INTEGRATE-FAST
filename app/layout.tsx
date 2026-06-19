import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  metadataBase: new URL("https://integratefast.com"),
  title: {
    default: "Integrate Fast - AI Implementation Consulting",
    template: "%s | Integrate Fast",
  },
  description:
    "Transform your business into an AI-first company with expert consulting, free AI audits, ROI analysis, and performance-based implementation.",
  keywords: [
    "AI implementation",
    "AI consulting",
    "AI transformation",
    "business AI strategy",
    "AI ROI calculator",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://integratefast.com/",
    title: "Integrate Fast - AI Implementation Consulting",
    description:
      "Transform your business into an AI-first company with expert consulting and performance-based AI implementation.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrate Fast - AI Implementation Consulting",
    description:
      "Free AI audits, ROI analysis, and performance-based AI implementation for growing businesses.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${space.variable}`}>{children}</body>
    </html>
  );
}
