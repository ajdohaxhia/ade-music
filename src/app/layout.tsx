import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Ade Music";
const siteDescription = "Ade Music — Singer, Songwriter, Beatmaker, Mixing & Mastering Engineer.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ade-music.netlify.app'),
  title: {
    default: siteTitle,
    template: `${siteTitle} | %s`,
  },
  description: siteDescription,
  openGraph: {
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteTitle,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: siteTitle,
      }
    ],
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
