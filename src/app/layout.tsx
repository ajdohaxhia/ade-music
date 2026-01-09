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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ade-music.com'),
  title: {
    default: "Ade Music",
    template: "Ade Music | %s",
  },
  description: "Official website of Ade Music. Singer, Songwriter, Beatmaker, Mixing & Mastering Engineer.",
  openGraph: {
    siteName: "Ade Music",
    type: "website",
    url: "/",
    images: [
      {
        url: "/opengraph-image", // Next.js convention will handle extension
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  }
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
