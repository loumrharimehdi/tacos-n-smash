"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/store";
import type { MenuItem } from "@/lib/types";

export default function MenuCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      emoji: item.emoji,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.06,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-800 shadow-card transition-all duration-500 hover:border-white/25 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(255,215,0,0.15)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-ink-700 to-ink-900">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-7xl">
            {item.emoji ?? "🍽️"}
          </div>
        )}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent opacity-80" />

        {/* Floating price badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="absolute right-3 top-3 rounded-full bg-brand-yellow px-3.5 py-1.5 shadow-glow"
        >
          <span className="font-display text-lg leading-none tracking-wide text-ink-900">
            {item.price}
          </span>
          <span className="ml-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-900/70">
            DH
          </span>
        </motion.div>

        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-ink-900/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
            {item.badge}
          </span>
        )}

        {/* Slide-up Add button on hover (desktop) */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-4 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 md:block">
          <button
            onClick={handleAdd}
            className={`btn w-full text-sm ${
              added
                ? "bg-brand-green text-white"
                : "bg-brand-yellow text-ink-900 hover:bg-brand-yellow-light"
            }`}
            aria-label={`Ajouter ${item.name} au panier`}
          >
            {added ? (
              <>
                <Check size={16} /> Ajouté au panier
              </>
            ) : (
              <>
                <Plus size={16} /> Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-2xl leading-tight tracking-wide text-white">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
              {item.description}
            </p>
          )}
        </div>

        {/* Mobile always-visible button */}
        <div className="mt-auto md:hidden">
          <button
            onClick={handleAdd}
            className={`btn w-full text-sm ${
              added
                ? "bg-brand-green text-white"
                : "bg-brand-yellow text-ink-900"
            }`}
            aria-label={`Ajouter ${item.name} au panier`}
          >
            {added ? (
              <>
                <Check size={16} /> Ajouté
              </>
            ) : (
              <>
                <Plus size={16} /> Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
