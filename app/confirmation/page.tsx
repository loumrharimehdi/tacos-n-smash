"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Home, ShoppingBag } from "lucide-react";
import { buildOrderMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import { RESTAURANT } from "@/lib/menu";

type StoredOrder = {
  id?: string;
  name: string;
  phone: string;
  address: string;
  mode: "livraison" | "surplace";
  notes?: string;
  total: number;
  items: { name: string; price: number; quantity: number; options?: string }[];
  createdAt: string;
};

export default function ConfirmationPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("tacos-n-smash-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  const whatsappUrl = order
    ? buildWhatsappUrl(buildOrderMessage(order as any))
    : `https://wa.me/${RESTAURANT.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-green text-white shadow-brand">
          <Check size={36} strokeWidth={3} />
        </div>

        <h1 className="mt-6 text-3xl font-black sm:text-5xl">
          Commande envoyée 🎉
        </h1>
        <p className="mt-3 text-white/70">
          Merci {order?.name ? order.name : "!"} — ta commande a été transmise
          au restaurant sur WhatsApp. L'équipe va confirmer par message.
        </p>
      </motion.div>

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 card p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Récapitulatif</h2>
            <span className="chip">
              {order.mode === "livraison" ? "🚚 Livraison" : "🏪 Sur place"}
            </span>
          </div>

          <ul className="mt-4 divide-y divide-white/10 text-sm">
            {order.items.map((it, i) => (
              <li key={i} className="flex items-start justify-between gap-3 py-3">
                <div>
                  <div className="font-semibold">
                    {it.name} <span className="text-white/50">× {it.quantity}</span>
                  </div>
                  {it.options && (
                    <div className="text-xs text-white/50">{it.options}</div>
                  )}
                </div>
                <div className="text-right font-bold text-brand-yellow">
                  {it.price * it.quantity} DH
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
            <span className="text-sm text-white/60">Total</span>
            <span className="text-2xl font-black text-brand-yellow">
              {order.total} DH
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
            <div>💳 Paiement : Cash à la livraison</div>
            {order.mode === "livraison" && order.address && (
              <div className="mt-1">📍 {order.address}</div>
            )}
            <div className="mt-1">📱 {order.phone}</div>
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-green"
        >
          <MessageCircle size={18} /> Rouvrir sur WhatsApp
        </a>
        <Link href="/menu" className="btn-outline">
          <ShoppingBag size={18} /> Commander autre chose
        </Link>
        <Link href="/" className="btn-outline">
          <Home size={18} /> Accueil
        </Link>
      </div>

      <div className="mt-12 text-center text-sm text-white/50">
        <p>
          Une question ? Appelle-nous au{" "}
          <a
            href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
            className="font-semibold text-brand-yellow"
          >
            {RESTAURANT.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
