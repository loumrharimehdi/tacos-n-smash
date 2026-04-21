import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tacos-n-smash.vercel.app"
  ),
  title: "Tacos & Smash — Original French Food · Meknès",
  description:
    "Tacos français & Smash Burgers à Meknès. ⭐ 4,8/5 sur Google (220 avis). Commande par WhatsApp, livraison sans contact, cash à la livraison.",
  keywords: [
    "tacos",
    "smash burger",
    "meknes",
    "french tacos",
    "livraison",
    "restaurant meknes",
    "street food",
  ],
  openGraph: {
    title: "Tacos & Smash — Meknès",
    description:
      "Original French Food. Tacos & Smash Burgers à Meknès. ⭐ 4,8/5 sur Google.",
    type: "website",
    locale: "fr_FR",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${bebas.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-ink-900 font-body text-paper antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
