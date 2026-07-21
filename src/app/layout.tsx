import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { images } from "@/config/images";
import { company } from "@/content";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} | Premium Solar Energy Solutions in Kerala`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords: [
    "solar energy Kerala",
    "solar panel installation Malappuram",
    "solar company Kozhikode",
    "residential solar Kerala",
    "commercial solar plant",
    "industrial solar installation",
    "SAF Malabar Energy",
    "solar engineering Kerala",
    "net metering Kerala",
    "MNRE solar subsidy",
    "hybrid solar system",
    "solar maintenance Kerala",
  ],
  authors: [{ name: company.name, url: company.url }],
  creator: company.name,
  publisher: company.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${company.name} | Premium Solar Energy Solutions in Kerala`,
    description: `${company.tagline}. Engineering-grade solar systems for homes, businesses, and industries across Kerala.`,
    url: company.url,
    siteName: company.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: images.brand.logo,
        width: 1200,
        height: 630,
        alt: `${company.name} — Premium Solar Engineering in Kerala`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Premium Solar Energy Solutions`,
    description: `${company.tagline}. Trusted solar engineering across Kerala.`,
    images: [images.brand.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: company.url,
  },
  category: "Solar Energy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full scroll-smooth antialiased`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-warm-white text-dark">
        {children}
      </body>
    </html>
  );
}
