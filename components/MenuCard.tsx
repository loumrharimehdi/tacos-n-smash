"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/store";
import type { MenuItem } from "@/lib/types";

export default function MenuCard({ item }: { item: MenuItem }) {
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
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="card group flex flex-col"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-brand-green/30 to-brand-yellow/10">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-7xl">
            {item.emoji ?? "🍽️"}
          </div>
        )}
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-yellow px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-brand-black">
            {item.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-brand-black/80 px-3 py-1 text-sm font-black text-brand-yellow backdrop-blur">
          {item.price} DH
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-black leading-tight text-white">{item.name}</h3>
          {item.description && (
            <p className="mt-1 line-clamp-3 text-sm text-white/60">{item.description}</p>
          )}
        </div>

        <div className="mt-auto">
          <button
            onClick={handleAdd}
            className={`btn w-full ${
              added ? "bg-brand-green text-white" : "bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark"
            }`}
            aria-label={`Ajouter ${item.name} au panier`}
          >
            {added ? (
              <>
                <Check size={18} /> Ajouté
              </>
            ) : (
              <>
                <Plus size={18} /> Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
