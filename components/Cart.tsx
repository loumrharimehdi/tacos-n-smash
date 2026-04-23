"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store";

export default function Cart() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const count = useCart((s) => s.count());
  const hydrated = useCart((s) => s.hydrated);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);

  if (!hydrated) {
    return (
      <div className="card p-6 text-center text-sm text-brand-brown/60">
        Chargement…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
          <ShoppingBag size={28} />
        </div>
        <div>
          <h2 className="font-display text-3xl uppercase tracking-wide">
            Panier vide
          </h2>
          <p className="mt-1 text-sm text-brand-brown/60">
            Ajoute des tacos, burgers ou suppléments depuis le menu.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/menu" className="btn-yellow text-sm">
            Voir le menu
          </Link>
          <Link href="/composer" className="btn-outline text-sm">
            Composer un tacos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl uppercase tracking-wide">
          Panier <span className="text-brand-brown/60">({count})</span>
        </h2>
        <button
          onClick={clear}
          className="text-xs text-brand-brown/65 underline-offset-2 hover:text-brand-yellow hover:underline"
        >
          Tout vider
        </button>
      </div>

      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-stretch gap-3 rounded-2xl border border-brand-brown/10 bg-ink-900 p-3"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-cream/5">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl">
                    {item.emoji ?? "🍽️"}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="font-display text-lg uppercase tracking-wide leading-tight">
                    {item.name}
                  </div>
                  {item.options && (
                    <div className="mt-0.5 text-xs text-brand-brown/65">{item.options}</div>
                  )}
                  <div className="mt-0.5 font-bold text-brand-yellow">
                    {item.price} DH
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-brand-brown/10 bg-brand-cream/5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-brand-cream/10"
                      aria-label="Diminuer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-brand-cream/10"
                      aria-label="Augmenter"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-brown/65 hover:bg-brand-cream/10 hover:text-red-400"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-5 flex items-baseline justify-between border-t border-brand-brown/10 pt-4">
        <span className="kicker">Total</span>
        <span className="font-display text-4xl text-brand-yellow">{total} DH</span>
      </div>
    </div>
  );
}
