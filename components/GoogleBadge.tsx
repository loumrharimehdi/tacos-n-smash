"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { RESTAURANT } from "@/lib/menu";

export default function GoogleBadge({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.94 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "inline-flex items-center gap-2 rounded-full border-[3px] border-brand-brown bg-brand-cream text-brand-brown shadow-green",
        compact ? "px-3 py-1.5" : "px-5 py-3",
      ].join(" ")}
      aria-label={`${RESTAURANT.googleRating.toFixed(1).replace(".", ",")} sur 5, ${RESTAURANT.googleReviews} avis Google`}
    >
      <span className="flex items-center gap-0.5 text-brand-orange">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={compact ? 12 : 15} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span className={compact ? "text-sm font-black" : "text-base font-black"}>
        {RESTAURANT.googleRating.toFixed(1).replace(".", ",")}
      </span>
      <span className={compact ? "text-xs font-bold" : "text-sm font-bold"}>
        · {RESTAURANT.googleReviews} avis Google
      </span>
    </motion.div>
  );
}
