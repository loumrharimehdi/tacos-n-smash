"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store";

export default function FloatingCartButton() {
  const pathname = usePathname();
  const count = useCart((s) => s.count());
  const total = useCart((s) => s.total());
  const hydrated = useCart((s) => s.hydrated);

  if (!hydrated || count === 0) return null;
  if (pathname === "/order" || pathname === "/confirmation") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2"
      >
        <Link
          href="/order"
          className="flex items-center gap-3 rounded-full bg-brand-yellow px-5 py-3 text-brand-black shadow-brand-yellow transition-transform hover:scale-[1.02]"
        >
          <div className="relative">
            <ShoppingBag size={20} />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-black px-1 text-[11px] font-bold text-brand-yellow">
              {count}
            </span>
          </div>
          <span className="text-sm font-bold uppercase tracking-wide">
            Voir le panier
          </span>
          <span className="rounded-full bg-brand-black/10 px-3 py-1 text-sm font-black">
            {total} DH
          </span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
