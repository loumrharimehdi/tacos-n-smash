"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/store";
import StreetButton from "@/components/ui/StreetButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

type CartSummaryProps = {
  checkoutHref?: string;
  showCheckout?: boolean;
  title?: string;
  compact?: boolean;
};

export default function CartSummary({
  checkoutHref = "/order",
  showCheckout = true,
  title = "Ton panier",
  compact = false,
}: CartSummaryProps) {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const count = useCart((s) => s.count());
  const hydrated = useCart((s) => s.hydrated);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);

  if (!hydrated) {
    return (
      <div className="card p-6 text-center text-sm font-bold text-brand-brown/70">
        Chargement...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-5 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-brand-brown bg-brand-orange text-brand-cream shadow-hard">
          <ShoppingBag size={28} />
        </div>
        <div>
          <h2 className="font-display text-4xl uppercase leading-none">Panier vide</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-brand-brown/70">
            Ajoutez un tacos, un smash ou un supplément pour lancer le festin.
          </p>
        </div>
        <div className="grid w-full gap-3">
          <StreetButton href="/menu" variant="primary" fullWidth>
            Voir le menu
          </StreetButton>
          <StreetButton href="/composer" variant="secondary" fullWidth>
            Composer
          </StreetButton>
        </div>
      </div>
    );
  }

  return (
    <aside className="card p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-orange">
            {count} article{count > 1 ? "s" : ""}
          </p>
          <h2 className="font-display text-4xl uppercase leading-none">{title}</h2>
        </div>
        <button
          type="button"
          onClick={clear}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-brown bg-brand-cream text-brand-brown shadow-hard transition-transform hover:-translate-y-0.5"
          aria-label="Vider le panier"
        >
          <X size={16} />
        </button>
      </div>

      <ul className={compact ? "space-y-3" : "space-y-4"}>
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12, height: 0 }}
              className="rounded-[14px] border-2 border-brand-brown bg-brand-yellow p-3"
            >
              <div className="flex gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border-2 border-brand-brown bg-brand-cream">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-xl uppercase">
                      T&S
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-2xl uppercase leading-none text-brand-brown">
                    {item.name}
                  </div>
                  {item.options && (
                    <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-brand-brown/72">
                      {item.options}
                    </p>
                  )}
                  <div className="mt-2 font-display text-2xl text-brand-green">
                    {item.price * item.quantity} DH
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border-2 border-brand-brown bg-brand-cream">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-brand-orange hover:text-brand-cream"
                    aria-label={`Diminuer ${item.name}`}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-brand-green hover:text-brand-yellow"
                    aria-label={`Augmenter ${item.name}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-brown bg-brand-cream text-brand-brown hover:bg-brand-orange hover:text-brand-cream"
                  aria-label={`Supprimer ${item.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-5 border-t-[3px] border-dashed border-brand-brown pt-5">
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm font-black uppercase tracking-[0.16em] text-brand-brown/70">
            Total
          </span>
          <AnimatedCounter
            value={total}
            suffix=" DH"
            className="font-display text-5xl leading-none text-brand-orange"
          />
        </div>
        {showCheckout && (
          <div className="mt-5">
            <StreetButton href={checkoutHref} variant="primary" fullWidth icon={<ShoppingBag size={18} />}>
              Commander
            </StreetButton>
          </div>
        )}
      </div>
    </aside>
  );
}

export function CartTotalLink() {
  const total = useCart((s) => s.total());
  const count = useCart((s) => s.count());
  const hydrated = useCart((s) => s.hydrated);

  if (!hydrated || count === 0) return null;

  return (
    <Link
      href="/order"
      className="fixed inset-x-3 bottom-3 z-40 flex min-h-16 items-center justify-between gap-3 rounded-[18px] border-[3px] border-brand-brown bg-brand-cream p-3 shadow-hard md:hidden"
    >
      <span className="flex h-11 min-w-11 items-center justify-center rounded-full bg-brand-orange px-3 font-display text-2xl text-brand-cream">
        {count}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-brand-brown/70">
          Panier
        </span>
        <span className="block font-display text-3xl leading-none text-brand-brown">
          {total} DH
        </span>
      </span>
      <span className="rounded-full bg-brand-green px-4 py-2 font-display text-xl uppercase text-brand-yellow">
        Commander
      </span>
    </Link>
  );
}
