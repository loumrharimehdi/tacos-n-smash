"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
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
      <div className="card p-6 text-center text-white/60">Chargement du panier…</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
          <ShoppingBag size={28} />
        </div>
        <div>
          <h2 className="text-xl font-black">Ton panier est vide</h2>
          <p className="mt-1 text-sm text-white/60">
            Ajoute des tacos, burgers ou suppléments depuis le menu.
          </p>
        </div>
        <div className="flex gap-2">
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
    <div className="space-y-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-black">
          Panier <span className="text-white/40">({count})</span>
        </h2>
        <button
          onClick={clear}
          className="text-xs text-white/50 underline-offset-2 hover:text-brand-yellow hover:underline"
        >
          Vider le panier
        </button>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-stretch gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
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
              <div className="font-bold">{item.name}</div>
              {item.options && (
                <div className="text-xs text-white/50">{item.options}</div>
              )}
              <div className="mt-0.5 text-sm font-bold text-brand-yellow">
                {item.price} DH
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Diminuer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Augmenter"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-red-400"
                aria-label="Supprimer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-baseline justify-between border-t border-white/10 pt-4">
        <span className="text-sm uppercase tracking-wider text-white/60">Total</span>
        <span className="text-2xl font-black text-brand-yellow">{total} DH</span>
      </div>
    </div>
  );
}
