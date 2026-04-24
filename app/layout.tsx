import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { RestaurantJsonLd } from "@/components/JsonLd";
import { buildMetadata, SITE_URL } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "Tacos & Smash Meknès — Tacos français & Smash Burgers",
    description:
      "Commandez vos tacos français, smash burgers, frites et desserts à Meknès. Livraison, sur place ou à emporter. Confirmation WhatsApp.",
    path: "/",
  }),
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFC72C",
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
      <body className="min-h-screen overflow-x-hidden bg-brand-yellow font-body text-brand-brown antialiased">
        <RestaurantJsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
