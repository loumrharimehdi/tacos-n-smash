"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANT } from "@/lib/menu";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || pathname === "/confirmation") return null;

  const number = RESTAURANT.whatsapp.replace(/\D/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Bonjour Tacos & Smash, j'aimerais passer commande.",
  )}`;

  return (
    <AnimatePresence>
      <motion.a
        key="floating-whatsapp"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter Tacos & Smash sur WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-brand-brown bg-brand-green text-brand-cream shadow-hard animate-whatsapp-pulse sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden="true">
          <path d="M16 3.5A12.4 12.4 0 0 0 5.3 22.2L4 28.5l6.4-1.7A12.5 12.5 0 1 0 16 3.5Zm0 22.5c-1.8 0-3.5-.5-5-1.4l-.4-.3-3.8 1 1-3.7-.3-.4A10 10 0 1 1 16 26Zm5.5-7.4c-.3-.2-1.7-.9-2-.9s-.5-.2-.7.1-.8.9-1 1.1-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.6 1.1 3 1.2 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.7-.5Z" />
        </svg>
      </motion.a>
    </AnimatePresence>
  );
}
