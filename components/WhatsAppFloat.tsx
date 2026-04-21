"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANT } from "@/lib/menu";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  // Hide on confirmation page (user just sent a message)
  if (pathname === "/confirmation") return null;

  const number = RESTAURANT.whatsapp.replace(/\D/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Bonjour Tacos & Smash 👋 j'aimerais passer commande."
  )}`;

  return (
    <AnimatePresence>
      <motion.a
        key="wa-float"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter sur WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] animate-pulse-glow hover:shadow-[0_15px_40px_-8px_rgba(37,211,102,0.7)] sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 sm:h-8 sm:w-8"
          fill="currentColor"
          aria-hidden
        >
          <path d="M16.003 3C9.374 3 4 8.373 4 14.998c0 2.645.862 5.09 2.324 7.078L4.07 29l7.152-2.223A11.93 11.93 0 0 0 16.003 27C22.631 27 28 21.625 28 15S22.631 3 16.003 3Zm0 21.79c-1.893 0-3.662-.554-5.147-1.507l-.369-.234-4.243 1.319 1.351-4.134-.24-.381a9.785 9.785 0 0 1-1.52-5.256c0-5.413 4.405-9.817 9.818-9.817 2.622 0 5.085 1.021 6.937 2.875a9.751 9.751 0 0 1 2.88 6.946c0 5.413-4.405 9.79-9.817 9.79Zm5.37-7.344c-.294-.147-1.744-.862-2.015-.961-.27-.098-.467-.147-.664.147-.196.294-.76.961-.932 1.158-.172.196-.343.221-.637.074-.294-.147-1.24-.456-2.362-1.454-.873-.779-1.462-1.74-1.633-2.034-.172-.294-.018-.453.129-.6.132-.132.294-.343.441-.515.147-.172.196-.294.294-.49.098-.196.049-.368-.025-.515-.074-.147-.664-1.602-.911-2.196-.24-.576-.485-.498-.664-.507-.172-.009-.368-.011-.565-.011a1.082 1.082 0 0 0-.785.368c-.27.294-1.029 1.006-1.029 2.452 0 1.446 1.054 2.842 1.2 3.038.147.196 2.076 3.17 5.028 4.44.703.304 1.252.486 1.68.623.705.224 1.348.192 1.857.117.567-.085 1.744-.713 1.99-1.403.245-.69.245-1.28.172-1.403-.074-.123-.27-.196-.565-.343Z" />
        </svg>
        <span className="sr-only">WhatsApp</span>
      </motion.a>
    </AnimatePresence>
  );
}
