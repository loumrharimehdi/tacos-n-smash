"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-brown/60">
          Scroll
        </span>
        <div className="relative flex h-10 w-6 items-start justify-center rounded-full border border-brand-brown/30 p-1">
          <span className="block h-2 w-1 rounded-full bg-brand-yellow animate-scroll-hint" />
        </div>
      </div>
    </motion.div>
  );
}
