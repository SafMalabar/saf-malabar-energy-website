import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { images } from "@/config/images";
import { company } from "@/content";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: `${company.name} | Solar Energy Solutions in Kerala`,
  description: company.description,
  keywords: [
    "solar energy",
    "solar panels",
    "Kerala",
    "Malappuram",
    "Kozhikode",
    "SAF Malabar Energy",
    "renewable energy",
    "solar installation",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    title: `${company.name} | Solar Energy Solutions in Kerala`,
    description: `${company.tagline}. Reliable solar energy solutions for homes, businesses, and industries across Kerala.`,
    url: company.url,
    siteName: company.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: images.brand.logo,
        width: 1200,
        height: 630,
        alt: `${company.name} - Solar Solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Solar Energy Solutions`,
    description: `${company.tagline} with reliable solar solutions across Kerala.`,
    images: [images.brand.logo],
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
    <html lang="en" className={`${poppins.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
