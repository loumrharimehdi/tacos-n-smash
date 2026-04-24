"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Home, MessageCircle, ShoppingBag } from "lucide-react";
import { buildOrderMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import { RESTAURANT } from "@/lib/menu";
import type { CartItem, OrderMode } from "@/lib/types";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

type StoredOrder = {
  id?: string;
  name: string;
  phone: string;
  address: string;
  mode: OrderMode;
  notes?: string;
  total: number;
  items: CartItem[];
  createdAt: string;
};

export default function ConfirmationPage() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [persistStatus, setPersistStatus] = useState<"pending" | "ok" | "rate_limited" | "failed" | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("tacos-n-smash-last-order");
      if (raw) setOrder(JSON.parse(raw) as StoredOrder);
    } catch {}

    const read = () => {
      try {
        const status = window.sessionStorage.getItem("tacos-n-smash-persist-status") as typeof persistStatus;
        setPersistStatus(status ?? "pending");
        return status;
      } catch {
        return null;
      }
    };

    read();
    const interval = window.setInterval(() => {
      const status = read();
      if (status && status !== "pending") window.clearInterval(interval);
    }, 500);
    const stop = window.setTimeout(() => window.clearInterval(interval), 8000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, []);

  const whatsappUrl = order
    ? buildWhatsappUrl(
        buildOrderMessage({
          name: order.name,
          phone: order.phone,
          address: order.address,
          mode: order.mode,
          notes: order.notes,
          total: order.total,
          items: order.items,
        }),
      )
    : `https://wa.me/${RESTAURANT.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="food-paper min-h-screen px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={reduce ? false : { scale: 0, rotate: -12 }}
            animate={reduce ? undefined : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-brand-brown bg-brand-green text-brand-yellow shadow-hard"
          >
            <Check size={48} strokeWidth={3} />
          </motion.div>
          <StickerPill color="orange" rotation={-2} className="mt-7">
            Presque fini
          </StickerPill>
          <h1 className="mt-6 font-display text-hero-sm uppercase leading-none text-brand-brown sm:text-hero">
            Commande
            <br />
            <span className="poster-title-orange inline-block">prête</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-bold leading-7 text-brand-brown/74">
            Le message WhatsApp est préparé. Clique sur le bouton, puis appuie sur envoyer dans WhatsApp pour finaliser auprès du restaurant.
          </p>
        </motion.div>

        {(persistStatus === "rate_limited" || persistStatus === "failed") && (
          <div className="mt-8 rounded-[16px] border-[3px] border-brand-brown bg-brand-orange p-4 text-sm font-bold leading-6 text-brand-cream shadow-hard">
            {persistStatus === "rate_limited"
              ? "Trop de commandes ont été envoyées depuis cet appareil. Le message WhatsApp reste disponible, mais l'enregistrement admin peut être limité quelques minutes."
              : "Le message WhatsApp reste disponible, mais l'enregistrement côté admin a échoué. Le restaurant recevra quand même votre message si vous l'envoyez."}
          </div>
        )}

        {order && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="card mt-10 p-5 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-orange">
                  Récapitulatif
                </p>
                <h2 className="mt-2 font-display text-5xl uppercase leading-none text-brand-brown">
                  Merci {order.name}
                </h2>
              </div>
              <StickerPill color="green" rotation={2}>
                {order.mode === "livraison" ? "Livraison" : "Sur place"}
              </StickerPill>
            </div>

            <ul className="mt-6 divide-y-2 divide-brand-brown/15">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <div className="font-display text-3xl uppercase leading-none text-brand-brown">
                      {item.name} <span className="text-brand-brown/55">x{item.quantity}</span>
                    </div>
                    {item.options && (
                      <p className="mt-1 text-sm font-semibold leading-6 text-brand-brown/70">
                        {item.options}
                      </p>
                    )}
                  </div>
                  <div className="font-display text-3xl text-brand-green">
                    {item.price * item.quantity} DH
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-end justify-between border-t-[3px] border-dashed border-brand-brown pt-5">
              <span className="text-sm font-black uppercase tracking-[0.16em] text-brand-brown/70">
                Total
              </span>
              <AnimatedCounter
                value={order.total}
                suffix=" DH"
                className="font-display text-6xl leading-none text-brand-orange"
              />
            </div>

            <div className="mt-5 rounded-[16px] border-2 border-brand-brown bg-brand-yellow p-4 text-sm font-bold leading-6 text-brand-brown">
              <div>Paiement : cash à la livraison</div>
              <div>Téléphone : {order.phone}</div>
              {order.mode === "livraison" && order.address && <div>Adresse : {order.address}</div>}
            </div>
          </motion.section>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-[3px] border-brand-brown bg-brand-green px-6 font-display text-xl uppercase text-brand-yellow shadow-hard transition-transform hover:-translate-y-0.5 sm:col-span-3"
          >
            <MessageCircle size={20} /> Ouvrir WhatsApp
          </a>
          <StreetButton href="/menu" variant="secondary" icon={<ShoppingBag size={18} />} fullWidth>
            Menu
          </StreetButton>
          <StreetButton href="/composer" variant="primary" fullWidth>
            Composer
          </StreetButton>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[3px] border-brand-brown bg-brand-brown px-5 font-display text-lg uppercase text-brand-yellow shadow-green"
          >
            <Home size={18} /> Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
