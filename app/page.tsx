"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChefHat, Clock, MapPin, MessageCircle, Smartphone, Truck, Utensils } from "lucide-react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import ReviewCard from "@/components/ReviewCard";
import GoogleBadge from "@/components/GoogleBadge";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import DecorativePalm from "@/components/ui/DecorativePalm";
import { MENU, RESTAURANT } from "@/lib/menu";

const tacosIds = [
  "tacos-mythique",
  "tacos-indien",
  "tacos-chevre-miel",
  "tacos-bourgeois",
  "tacos-parisien",
  "tacos-boursin",
];

const burgerIds = [
  "burger-original-smash",
  "burger-crispy-smash",
  "burger-kentucky",
  "burger-new-yorkais",
  "burger-big-smash",
  "burger-rosti-smash",
];

function pick(ids: string[]) {
  return ids
    .map((id) => MENU.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

export default function HomePage() {
  const tacos = pick(tacosIds);
  const burgers = pick(burgerIds);

  return (
    <>
      <Hero />
      <MarqueeTicker />

      <section className="yellow-paper border-b-[3px] border-brand-brown px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.34fr_1fr]">
          <Reveal>
            <SectionHeader
              eyebrow="Les plus commandés"
              title={
                <>
                  Tacos
                  <br />
                  Signature
                </>
              }
              subtitle="Les recettes qui cartonnent sur Glovo, généreuses, dorées, sauce fromagère maison."
            />
            <div className="mt-8 hidden lg:block">
              <StreetButton href="/composer" variant="green" icon={<ArrowRight size={18} />}>
                Composer ta bête
              </StreetButton>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {tacos.map((product, index) => (
              <ProductCard key={product.id} product={product} variant="tacos" index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="food-paper border-b-[3px] border-brand-brown px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeader
                eyebrow="Burgers façon USA"
                title="Smash Burgers"
                subtitle="Pain moelleux, viande smashée, fromage fondant et sauce maison."
                variant="cream"
              />
            </Reveal>
            <StreetButton href="/menu" variant="brown" icon={<ArrowRight size={18} />}>
              Voir tous les burgers
            </StreetButton>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {burgers.map((product, index) => (
              <ProductCard key={product.id} product={product} variant="burger" index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="yellow-paper border-b-[3px] border-brand-brown px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.02}>
            <FeatureCard icon={<Truck size={27} />} title="Livraison" text="Sans contact via Glovo ou WhatsApp à Meknès." />
          </Reveal>
          <Reveal delay={0.06}>
            <FeatureCard icon={<ChefHat size={27} />} title="Fait maison" text="Sauce fromagère et frites servies bien chaudes." tone="orange" />
          </Reveal>
          <Reveal delay={0.1}>
            <FeatureCard icon={<Clock size={27} />} title="Ouvert tard" text="Jusqu'à minuit pour les grosses faims du soir." />
          </Reveal>
          <Reveal delay={0.14}>
            <FeatureCard icon={<Smartphone size={27} />} title="Commande EZ" text="Panier en ligne, confirmation immédiate sur WhatsApp." tone="orange" />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-b-[3px] border-brand-brown bg-brand-green px-4 py-16 text-brand-cream sm:px-6 lg:py-24">
        <DecorativePalm flip className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 text-brand-yellow opacity-15" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <StickerPill color="orange" rotation={-2}>
              Noté par nos clients
            </StickerPill>
            <div className="mt-6 flex flex-wrap items-end gap-5">
              <AnimatedCounter
                value={RESTAURANT.googleRating}
                decimals={1}
                className="font-display text-8xl leading-none text-brand-yellow"
              />
              <div className="pb-3">
                <GoogleBadge compact />
                <p className="mt-3 max-w-md text-sm font-semibold leading-7 text-brand-cream/80">
                  {RESTAURANT.googleReviews} avis Google, 97% de satisfaction Glovo, accueil chaleureux et portions généreuses.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <ReviewCard
                tone="yellow"
                quote="Le tacos est généreux, les frites dedans sont parfaites. On retrouve le goût comme en France."
                author="Avis Google"
              />
              <ReviewCard
                quote="Smash burger au top, viande smashée parfaite, service rapide. Je recommande."
                author="Avis Glovo · 97%"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[22px] border-[3px] border-brand-brown bg-brand-cream p-6 text-brand-brown shadow-orange">
              <StickerPill color="green" rotation={2} icon={<MapPin size={14} />}>
                Viens nous voir
              </StickerPill>
              <h2 className="mt-6 font-display text-7xl uppercase leading-none text-brand-brown">
                4 Rue
                <br />
                <span className="text-brand-orange">El Amal</span>
                <br />
                <span className="text-brand-green">Meknès</span>
              </h2>
              <p className="mt-5 text-sm font-bold leading-7 text-brand-brown/72">
                Repas sur place, à emporter et livraison sans contact. Cabines privées,
                banquettes vertes, ambiance moderne et cosy.
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.name + " " + RESTAURANT.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border-2 border-brand-brown bg-brand-brown px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-brand-yellow shadow-green"
                >
                  Google Maps · {RESTAURANT.plusCode}
                </a>
                <a
                  href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
                  className="rounded-full border-2 border-brand-brown bg-brand-yellow px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-brand-brown shadow-hard"
                >
                  Appeler · {RESTAURANT.phone}
                </a>
                <a
                  href={RESTAURANT.glovo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border-2 border-brand-brown bg-brand-orange px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-brand-cream shadow-hard"
                >
                  Glovo · {RESTAURANT.glovoSatisfaction}% satisfaction
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-orange px-4 py-16 sm:px-6 lg:py-24">
        <div className="absolute inset-y-0 left-0 hidden w-1/3 opacity-30 md:block">
          <Image src="/images/tacos-mythique.png" alt="" fill sizes="33vw" className="object-cover mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-5xl text-center">
          <StickerPill color="brown" rotation={-2}>
            Prêt pour le festin ?
          </StickerPill>
          <h2 className="mt-7 font-display text-section-sm uppercase leading-none text-brand-cream sm:text-section">
            Ton prochain
            <br />
            <span className="text-brand-yellow">tacos commence ici</span>
          </h2>
          <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-2xl sm:grid-cols-2">
            <StreetButton href="/order" variant="green" size="lg" fullWidth icon={<MessageCircle size={20} />}>
              Commander maintenant
            </StreetButton>
            <StreetButton href="/composer" variant="secondary" size="lg" fullWidth icon={<Utensils size={20} />}>
              Composer mon tacos
            </StreetButton>
          </div>
        </div>
      </section>
    </>
  );
}
