"use client";

import Image from "next/image";
import { ArrowRight, MapPin, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import GoogleBadge from "@/components/GoogleBadge";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";
import DecorativePalm from "@/components/ui/DecorativePalm";
import FoodDoodles from "@/components/ui/FoodDoodles";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="yellow-paper relative min-h-[calc(100svh-0px)] overflow-hidden border-b-[3px] border-brand-brown pt-24">
      <DecorativePalm className="pointer-events-none absolute -left-10 top-20 h-40 w-40 text-brand-green opacity-75 sm:h-56 sm:w-56" />
      <DecorativePalm flip className="pointer-events-none absolute -right-10 top-20 h-40 w-40 text-brand-green opacity-75 sm:h-56 sm:w-56" />
      <FoodDoodles className="pointer-events-none absolute bottom-10 left-4 hidden h-32 w-52 text-brand-orange/65 lg:block" />

      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl items-center px-4 pb-16 sm:px-6 lg:pb-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center lg:text-left"
          >
            <StickerPill color="green" rotation={-2} icon={<MapPin size={14} />} className="mx-auto lg:mx-0">
              Meknès · Ouvert jusqu'à minuit
            </StickerPill>

            <h1 className="mt-7 font-display uppercase leading-none">
              <span className="poster-title block text-hero-sm sm:text-hero">Tacos</span>
              <span className="my-2 block text-3xl text-brand-orange sm:text-5xl">✦ & ✦</span>
              <span className="poster-title-orange block text-hero-sm sm:text-hero">Smash</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm font-black uppercase tracking-[0.22em] text-brand-green sm:text-base lg:mx-0">
              Original French Food · Meknès
            </p>

            <div className="mt-6">
              <GoogleBadge />
            </div>

            <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-xl sm:grid-cols-2 lg:mx-0">
              <StreetButton href="/order" size="lg" variant="primary" fullWidth icon={<ShoppingBag size={20} />}>
                Commander maintenant
              </StreetButton>
              <StreetButton href="/menu" size="lg" variant="secondary" fullWidth icon={<UtensilsCrossed size={20} />}>
                Voir le menu
              </StreetButton>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 2 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.15 }}
            className="relative mx-auto h-[420px] w-full max-w-[520px] lg:h-[560px]"
          >
            <div className="absolute left-2 top-14 h-64 w-64 rotate-[-8deg] overflow-hidden rounded-[24px] border-[4px] border-brand-brown bg-brand-cream shadow-green sm:h-80 sm:w-80">
              <Image src="/images/tacos-mythique.webp" alt="Tacos signature généreux" fill priority sizes="320px" className="object-cover" />
            </div>
            <div className="absolute right-0 top-32 h-56 w-56 rotate-[7deg] overflow-hidden rounded-[24px] border-[4px] border-brand-brown bg-brand-cream shadow-hard sm:h-72 sm:w-72">
              <Image src="/images/burger-original-smash.webp" alt="Smash burger avec cheddar" fill priority sizes="288px" className="object-cover" />
            </div>
            <div className="absolute bottom-6 left-20 h-44 w-44 rotate-[8deg] overflow-hidden rounded-[24px] border-[4px] border-brand-brown bg-brand-cream shadow-orange sm:h-56 sm:w-56">
              <Image src="/images/frites.webp" alt="Frites chaudes et dorées" fill sizes="224px" className="object-cover" />
            </div>
            <div className="absolute right-8 top-6 rounded-full border-[3px] border-brand-brown bg-brand-orange px-5 py-3 font-display text-3xl uppercase text-brand-cream shadow-hard">
              Hot
            </div>
            <div className="absolute bottom-4 right-4 hidden rounded-full border-[3px] border-brand-brown bg-brand-green px-5 py-3 font-display text-2xl uppercase text-brand-yellow shadow-hard sm:inline-flex">
              Sauce maison <ArrowRight size={18} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
