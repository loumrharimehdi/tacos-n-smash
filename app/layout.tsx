import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCartButton from "@/components/FloatingCartButton";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tacos-n-smash.vercel.app"
  ),
  title: "Tacos & Smash — Original French Food · Meknès",
  description:
    "Tacos, Smash Burgers & plus à Meknès. ⭐ 4,8/5 sur Google. Commande par WhatsApp, livraison sans contact, cash à la livraison.",
  keywords: [
    "tacos",
    "smash burger",
    "meknes",
    "french tacos",
    "livraison",
    "restaurant meknes",
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
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-brand-black font-body text-white antialiased">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <FloatingCartButton />
      </body>
    </html>
  );
}
