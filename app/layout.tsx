import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AffiliateProvider } from "@/lib/affiliate/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hilfsmittel Kompass - Pflegeleistungen einfach beantragt",
  description: "Wir helfen Ihnen, alle Ansprüche und Zuschüsse zu nutzen, die Ihnen zustehen - für mehr Lebensqualität zuhause. Kostenlose Beratung für Treppenlift, Badumbau, Hausnotruf und mehr.",
  keywords: ["Pflegeleistungen", "Treppenlift", "Badumbau", "Hausnotruf", "Pflegebox", "Elektromobil", "Zuschuss", "Pflegekasse"],
  robots: "index, follow",
  openGraph: {
    title: "Hilfsmittel Kompass - Pflegeleistungen einfach beantragt",
    description: "Wir helfen Ihnen, alle Ansprüche und Zuschüsse zu nutzen, die Ihnen zustehen - für mehr Lebensqualität zuhause.",
    type: "website",
    locale: "de_DE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#005c73",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AffiliateProvider>
          {children}
        </AffiliateProvider>
      </body>
    </html>
  );
}
