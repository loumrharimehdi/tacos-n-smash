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
  const [persistStatus, setPersistStatus] = useState<
    "pending" | "ok" | "rate_limited" | "failed" | null
  >(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("tacos-n-smash-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}

    // Poll the persist status briefly (background fetch may resolve after mount)
    const read = () => {
      try {
        const s = window.sessionStorage.getItem(
          "tacos-n-smash-persist-status",
        ) as typeof persistStatus;
        setPersistStatus(s ?? "pending");
        return s;
      } catch {
        return null;
      }
    };
    read();
    const iv = setInterval(() => {
      const s = read();
      if (s && s !== "pending") clearInterval(iv);
    }, 500);
    const stop = setTimeout(() => clearInterval(iv), 8000);
    return () => {
      clearInterval(iv);
      clearTimeout(stop);
    };
  }, []);

  const whatsappUrl = order
    ? buildWhatsappUrl(buildOrderMessage(order as any))
    : `https://wa.me/${RESTAURANT.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="relative pt-20 sm:pt-24">
      <div className="absolute inset-x-0 top-0 h-[50vh] bg-radial-spot" />

      <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-white shadow-[0_0_60px_rgba(45,106,79,0.5)]"
          >
            <Check size={44} strokeWidth={3} />
          </motion.div>

          <h1 className="mt-8 font-display uppercase tracking-wide [font-size:clamp(2.5rem,8vw,5rem)] [line-height:0.95]">
            Commande <span className="text-brand-yellow">envoyée</span>
          </h1>
          <p className="mt-4 text-white/60">
            Merci{order?.name ? ` ${order.name}` : ""} — ta commande a été
            transmise au restaurant sur WhatsApp. L'équipe va confirmer par
            message.
          </p>
        </motion.div>

        {(persistStatus === "rate_limited" || persistStatus === "failed") && (
          <div className="mt-8 rounded-xl border border-yellow-400/40 bg-yellow-500/10 p-3 text-sm text-yellow-100">
            {persistStatus === "rate_limited"
              ? "Trop de commandes envoyées depuis ton appareil. Ta commande WhatsApp est bien partie, mais elle ne sera pas enregistrée côté admin. Réessaie dans quelques minutes si besoin."
              : "Ta commande WhatsApp est bien partie, mais l'enregistrement côté admin a échoué. Le restaurant recevra quand même ton message."}
          </div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card mt-10 p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl uppercase tracking-wide">
                Récapitulatif
              </h2>
              <span className="chip-yellow">
                {order.mode === "livraison" ? "🚚 Livraison" : "🏪 Sur place"}
              </span>
            </div>

            <ul className="mt-5 divide-y divide-white/10 text-sm">
              {order.items.map((it, i) => (
                <li key={i} className="flex items-start justify-between gap-3 py-3">
                  <div>
                    <div className="font-semibold">
                      {it.name}{" "}
                      <span className="text-white/65">× {it.quantity}</span>
                    </div>
                    {it.options && (
                      <div className="mt-0.5 text-xs text-white/65">
                        {it.options}
                      </div>
                    )}
                  </div>
                  <div className="text-right font-bold text-brand-yellow">
                    {it.price * it.quantity} DH
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
              <span className="kicker">Total</span>
              <span className="font-display text-4xl text-brand-yellow">
                {order.total} DH
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-ink-900 p-4 text-xs text-white/60">
              <div>💳 Paiement : Cash à la livraison</div>
              {order.mode === "livraison" && order.address && (
                <div className="mt-1">📍 {order.address}</div>
              )}
              <div className="mt-1">📱 {order.phone}</div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-green"
          >
            <MessageCircle size={18} /> Rouvrir WhatsApp
          </a>
          <Link href="/menu" className="btn-outline">
            <ShoppingBag size={18} /> Autre chose
          </Link>
          <Link href="/" className="btn-outline">
            <Home size={18} /> Accueil
          </Link>
        </motion.div>

        <div className="mt-12 text-center text-sm text-white/65">
          <p>
            Une question ? Appelle au{" "}
            <a
              href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
              className="font-semibold text-brand-yellow hover:underline"
            >
              {RESTAURANT.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
