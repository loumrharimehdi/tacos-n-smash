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
  Flame,
  Phone,
  Quote,
} from "lucide-react";
import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import SectionDivider from "@/components/SectionDivider";
import { MENU, RESTAURANT, TACOS_SIZES } from "@/lib/menu";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

export default function HomePage() {
  const featured = [
    MENU.find((m) => m.id === "tacos-mythique"),
    MENU.find((m) => m.id === "burger-original-smash"),
    MENU.find((m) => m.id === "tacos-chevre-miel"),
    MENU.find((m) => m.id === "burger-big-smash"),
    MENU.find((m) => m.id === "tacos-indien"),
    MENU.find((m) => m.id === "burger-crispy-smash"),
  ].filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <>
      <Hero />

      {/* Marquee-style ticker */}
      <div className="relative overflow-hidden border-y border-brand-brown/10 bg-brand-cream py-4">
        <div className="flex min-w-max animate-marquee items-center gap-12 whitespace-nowrap font-display text-2xl uppercase tracking-wider text-brand-brown/55 sm:text-3xl">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex items-center gap-12">
              {[
                "Tacos",
                "Smash Burgers",
                "Original French Food",
                "Sauce fromagère maison",
                "Frites fraîches",
                "Livraison Meknès",
                "⭐ 4,8 Google",
              ].map((w, i) => (
                <span key={`${r}-${i}`} className="flex items-center gap-12">
                  <span>{w}</span>
                  <span className="text-brand-green">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Compose CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="relative overflow-hidden border-b border-brand-brown/10 bg-brand-yellow"
      >
        <div className="absolute inset-0 bg-radial-spot" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <motion.div variants={staggerItem} className="kicker">
                🌮 Configurateur signature
              </motion.div>
              <motion.h2
                variants={staggerItem}
                className="mt-4 font-display text-section uppercase tracking-wide text-balance"
              >
                Compose ton tacos
                <br />
                <span className="text-brand-green">sur mesure</span>
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="mt-5 max-w-md text-brand-brown/65"
              >
                Choisis la taille, la (ou les) viande(s) et la sauce. Sauce
                fromagère maison incluse, frites à l'intérieur. Un tacos comme à
                Paris, à Meknès.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="mt-8 grid grid-cols-3 gap-3"
              >
                {TACOS_SIZES.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-2xl border-2 border-brand-brown bg-brand-cream p-4 text-center"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-brown/65">
                      {s.label}
                    </div>
                    <div className="mt-2 font-display text-2xl text-brand-green">
                      {s.price} DH
                    </div>
                    <div className="mt-0.5 text-[11px] text-brand-brown/60">
                      {s.meats} viande{s.meats > 1 ? "s" : ""}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={staggerItem} className="mt-8">
                <Link href="/composer" className="btn-yellow">
                  <Flame size={18} /> Commencer <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            <motion.div variants={staggerItem} className="relative">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {TACOS_SIZES.map((s, i) => (
                  <motion.div
                    key={s.id}
                    whileHover={{ y: -8, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`group relative overflow-hidden rounded-3xl border-2 border-brand-brown bg-brand-cream shadow-card ${
                      i === 1 ? "translate-y-6" : ""
                    }`}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={s.image}
                        alt={s.label}
                        fill
                        sizes="(min-width: 768px) 180px, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-yellow via-brand-yellow/30 to-transparent" />
                      <div className="absolute inset-x-3 bottom-3">
                        <div className="font-display text-xl uppercase tracking-wide text-brand-brown">
                          {s.label}
                        </div>
                        <div className="text-sm font-bold text-brand-green">
                          {s.price} DH
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28"
      >
        <motion.div variants={staggerItem} className="mb-12 text-center">
          <div className="kicker">⭐ Les plus commandés</div>
          <h2 className="mt-4 section-title text-balance">
            Nos <span className="text-brand-green">classiques</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-brown/65">
            Les plats signatures qui font le buzz sur Instagram et qui cartonnent
            sur Glovo.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.div variants={staggerItem} className="mt-12 text-center">
          <Link href="/menu" className="btn-outline">
            Voir le menu complet <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.section>

      <SectionDivider />

      {/* Trust / features */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "Livraison",
              text: "Sans contact, via Glovo ou WhatsApp à Meknès.",
            },
            {
              icon: ChefHat,
              title: "Fait maison",
              text: "Sauce fromagère & frites maison à la minute.",
            },
            {
              icon: Clock,
              title: "Ouvert tard",
              text: "Jusqu'à minuit. Pic d'affluence en soirée.",
            },
            {
              icon: Phone,
              title: "Commande facile",
              text: "Panier en ligne, confirmation sur WhatsApp.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-3xl border-2 border-brand-brown bg-brand-cream p-6 transition-colors hover:border-brand-brown hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange text-white">
                <Icon size={22} />
              </div>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-wide">
                {title}
              </h3>
              <p className="mt-2 text-sm text-brand-brown/60">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reviews + location */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="border-t border-brand-brown/10 bg-brand-yellow-dark/30"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <motion.div variants={staggerItem} className="kicker">
              💛 Ce qu'on dit de nous
            </motion.div>
            <motion.h2
              variants={staggerItem}
              className="mt-4 section-title text-balance"
            >
              ⭐ {RESTAURANT.googleRating.toFixed(1).replace(".", ",")}
              <span className="text-brand-brown/60">/5</span>
              <br />
              <span className="text-brand-green">sur Google</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-4 text-brand-brown/65">
              {RESTAURANT.googleReviews} avis · accueil chaleureux, propre,
              confortable, généreux — <em>"comme en France"</em>.
            </motion.p>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: "Le tacos est généreux, les frites dedans sont parfaites. L'équipe est super accueillante. Comme à Paris !",
                  src: "Avis Google",
                },
                {
                  q: "Le Smash Burger est énorme, la viande fond dans la bouche. Ambiance cosy, je recommande.",
                  src: `Avis Glovo · ${RESTAURANT.glovoSatisfaction}%`,
                },
              ].map((r, i) => (
                <motion.blockquote
                  key={i}
                  variants={staggerItem}
                  className="relative rounded-3xl border-2 border-brand-brown bg-brand-cream p-6"
                >
                  <Quote
                    className="absolute -top-3 left-5 text-brand-green"
                    size={22}
                    fill="currentColor"
                  />
                  <p className="text-brand-brown/80">{r.q}</p>
                  <footer className="mt-3 text-xs uppercase tracking-widest text-brand-brown/65">
                    — {r.src}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>

          <div>
            <motion.div variants={staggerItem} className="kicker">
              📍 Viens nous voir
            </motion.div>
            <motion.h2
              variants={staggerItem}
              className="mt-4 section-title text-balance"
            >
              4 Rue El Amal
              <br />
              <span className="text-brand-green">Meknès</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="mt-4 text-brand-brown/65">
              Repas sur place · À emporter · Livraison sans contact. Cabines
              privées, banquettes vertes, ambiance cosy.
            </motion.p>

            <div className="mt-8 space-y-3">
              {[
                {
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    RESTAURANT.name + " " + RESTAURANT.address
                  )}`,
                  icon: MapPin,
                  title: "Google Maps",
                  sub: "VCPJ+44 Meknès",
                },
                {
                  href: `tel:${RESTAURANT.phone.replace(/\s/g, "")}`,
                  icon: Phone,
                  title: RESTAURANT.phone,
                  sub: "Appeler le restaurant",
                },
                {
                  href: RESTAURANT.glovo,
                  icon: Truck,
                  title: "Glovo",
                  sub: `${RESTAURANT.glovoSatisfaction}% satisfaction · 500+ avis`,
                },
              ].map(({ href, icon: Icon, title, sub }) => (
                <motion.a
                  key={title}
                  variants={staggerItem}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 rounded-2xl border-2 border-brand-brown bg-brand-cream p-4 transition-colors hover:border-brand-brown hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg uppercase tracking-wide">
                      {title}
                    </div>
                    <div className="text-xs text-brand-brown/65">{sub}</div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-brand-brown/55 transition-colors group-hover:text-brand-green"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative overflow-hidden border-t border-brand-brown/10"
      >
        <div className="absolute inset-0 bg-radial-spot" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 md:py-32">
          <motion.div variants={staggerItem} className="kicker">
            Prêt ?
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="mt-4 font-display uppercase tracking-wide [font-size:clamp(3rem,10vw,7rem)] [line-height:0.9]"
          >
            Ton prochain tacos
            <br />
            <span className="text-brand-green">
              commence ici.
            </span>
          </motion.h2>
          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link href="/order" className="btn-yellow text-lg">
              Commander maintenant <ArrowRight size={18} />
            </Link>
            <Link href="/composer" className="btn-outline text-lg">
              <Flame size={18} /> Composer mon tacos
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
