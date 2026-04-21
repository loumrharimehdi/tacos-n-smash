"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  Clock,
  MapPin,
  Truck,
  ShoppingBag,
  Flame,
} from "lucide-react";
import GoogleBadge from "@/components/GoogleBadge";
import { MENU, RESTAURANT, TACOS_SIZES } from "@/lib/menu";
import MenuCard from "@/components/MenuCard";

export default function HomePage() {
  const featured = [
    MENU.find((m) => m.id === "tacos-mythique"),
    MENU.find((m) => m.id === "burger-original-smash"),
    MENU.find((m) => m.id === "tacos-chevre-miel"),
  ].filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-20">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <GoogleBadge />
              <span className="chip">📍 {RESTAURANT.city}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-6 text-balance font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
            >
              Tacos &{" "}
              <span className="bg-gradient-to-br from-brand-yellow to-amber-300 bg-clip-text text-transparent">
                Smash
              </span>
              <br />
              <span className="text-brand-yellow">Original French Food</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 max-w-lg text-lg text-white/70"
            >
              Les vrais tacos français comme à Paris. Steaks smashés à la minute,
              sauce fromagère maison, frites dedans. À {RESTAURANT.city}, depuis
              le cœur de la ville.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/order" className="btn-yellow text-base">
                <ShoppingBag size={18} /> Commander maintenant
              </Link>
              <Link href="/composer" className="btn-outline text-base">
                <Flame size={18} /> Composer mon tacos
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 grid grid-cols-3 gap-3 text-center"
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Truck size={18} className="mx-auto text-brand-yellow" />
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide">
                  Livraison
                </div>
                <div className="text-[11px] text-white/50">Sans contact</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Clock size={18} className="mx-auto text-brand-yellow" />
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide">
                  Ouvert
                </div>
                <div className="text-[11px] text-white/50">Jusqu'à minuit</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <ChefHat size={18} className="mx-auto text-brand-yellow" />
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide">
                  Fait maison
                </div>
                <div className="text-[11px] text-white/50">Sauce fromagère</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-yellow to-amber-400 blur-3xl opacity-30" />
              <div className="absolute inset-2 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-brand">
                <Image
                  src="/images/burger-original-smash.webp"
                  alt="Smash Burger"
                  fill
                  sizes="(min-width: 768px) 400px, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -right-3 top-6 rounded-full bg-brand-yellow px-4 py-2 text-sm font-black text-brand-black shadow-xl"
              >
                À partir de 35 DH
              </motion.div>
              <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-brand-black/80 px-4 py-2 backdrop-blur">
                <span className="text-lg">🌮</span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Fait à la minute
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Composer Tacos CTA */}
      <section className="relative border-y border-white/10 bg-gradient-to-b from-brand-green/20 via-brand-black to-brand-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="chip mb-4 bg-brand-yellow/10 text-brand-yellow">
                🌮 Signature
              </div>
              <h2 className="section-title text-balance">
                Compose ton tacos <span className="text-brand-yellow">sur mesure</span>
              </h2>
              <p className="mt-4 text-white/70">
                Choisis la taille, la ou les viandes et la sauce. Sauce fromagère
                maison incluse, frites à l'intérieur.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {TACOS_SIZES.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <div className="text-xs uppercase tracking-wide text-white/60">
                      {s.label}
                    </div>
                    <div className="mt-1 font-black text-brand-yellow">
                      {s.price} DH
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/50">
                      {s.meats} viande{s.meats > 1 ? "s" : ""}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/composer" className="btn-yellow">
                  Commencer <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="relative grid grid-cols-3 gap-3">
              {TACOS_SIZES.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
                    i === 1 ? "translate-y-4" : ""
                  }`}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={s.image}
                      alt={s.label}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <div className="text-xs font-bold text-white">{s.label}</div>
                    <div className="text-xs text-brand-yellow">{s.price} DH</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="chip mb-3">⭐ Les plus commandés</div>
            <h2 className="section-title">Nos classiques</h2>
          </div>
          <Link href="/menu" className="hidden text-sm font-semibold text-brand-yellow hover:underline sm:inline-flex sm:items-center sm:gap-1">
            Voir le menu complet <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/menu" className="btn-outline">
            Voir le menu complet <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Avis + Address */}
      <section className="border-t border-white/10 bg-gradient-to-b from-brand-black to-brand-black/95">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <div className="chip mb-3">💛 Ce qu'on dit de nous</div>
            <h2 className="section-title">
              ⭐ {RESTAURANT.googleRating.toFixed(1).replace(".", ",")} / 5 sur Google
            </h2>
            <p className="mt-3 text-white/70">
              {RESTAURANT.googleReviews} avis · accueil chaleureux, propre, confortable,
              généreux — <em>"comme en France"</em>.
            </p>

            <div className="mt-6 space-y-3">
              <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/80">
                  "Le tacos est généreux, les frites dedans sont parfaites. L'équipe est
                  super accueillante. Comme à Paris !"
                </p>
                <footer className="mt-2 text-xs text-white/50">— Avis Google</footer>
              </blockquote>
              <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/80">
                  "Le Smash Burger est énorme, la viande fond dans la bouche.
                  Ambiance cosy, je recommande."
                </p>
                <footer className="mt-2 text-xs text-white/50">— Avis Glovo ({RESTAURANT.glovoSatisfaction}%)</footer>
              </blockquote>
            </div>
          </div>

          <div>
            <div className="chip mb-3">📍 Viens nous voir</div>
            <h2 className="section-title">{RESTAURANT.address}</h2>
            <p className="mt-3 text-white/70">
              Repas sur place · Vente à emporter · Livraison sans contact.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  RESTAURANT.name + " " + RESTAURANT.address
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-yellow/40"
              >
                <MapPin className="text-brand-yellow" />
                <div className="flex-1">
                  <div className="text-sm font-bold">Voir sur Google Maps</div>
                  <div className="text-xs text-white/50">VCPJ+44 Meknès</div>
                </div>
                <ArrowRight size={16} className="text-white/40" />
              </a>
              <a
                href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-yellow/40"
              >
                <span className="text-brand-yellow">📞</span>
                <div className="flex-1">
                  <div className="text-sm font-bold">{RESTAURANT.phone}</div>
                  <div className="text-xs text-white/50">Appeler le restaurant</div>
                </div>
                <ArrowRight size={16} className="text-white/40" />
              </a>
              <a
                href={RESTAURANT.glovo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-yellow/40"
              >
                <span className="text-brand-yellow">🛵</span>
                <div className="flex-1">
                  <div className="text-sm font-bold">Commander sur Glovo</div>
                  <div className="text-xs text-white/50">
                    {RESTAURANT.glovoSatisfaction}% satisfaction · 500+ avis
                  </div>
                </div>
                <ArrowRight size={16} className="text-white/40" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
