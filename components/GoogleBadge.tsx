"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { RESTAURANT } from "@/lib/menu";

export default function GoogleBadge({ compact = false }: { compact?: boolean }) {
  const stars = Array.from({ length: 5 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md ${
        compact ? "px-3 py-1.5" : "px-4 py-2"
      }`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-ink-900">
        G
      </span>
      <div className="flex items-center gap-0.5 text-brand-yellow">
        {stars.map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.3 }}
          >
            <Star
              size={compact ? 12 : 14}
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.span>
        ))}
      </div>
      <span className={`font-bold text-white ${compact ? "text-sm" : "text-base"}`}>
        {RESTAURANT.googleRating.toFixed(1).replace(".", ",")}
      </span>
      <span className={`text-white/60 ${compact ? "text-xs" : "text-sm"}`}>
        · {RESTAURANT.googleReviews} avis
      </span>
    </motion.div>
  );
}
