"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Flame, Search, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartSummary, { CartTotalLink } from "@/components/CartSummary";
import SectionHeader from "@/components/ui/SectionHeader";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";
import DecorativePalm from "@/components/ui/DecorativePalm";
import { CATEGORIES_ORDER, CATEGORY_LABELS, MENU } from "@/lib/menu";
import type { Category } from "@/lib/types";

type ActiveCategory = Category | "all";

export default function MenuPage() {
  const [active, setActive] = useState<ActiveCategory>("all");

  const grouped = useMemo(() => {
    const filtered = active === "all" ? MENU : MENU.filter((item) => item.category === active);
    return filtered.reduce<Record<Category, typeof MENU>>(
      (acc, item) => {
        acc[item.category].push(item);
        return acc;
      },
      {
        "tacos-signature": [],
        smash: [],
        supplements: [],
        "menu-family": [],
        "menu-enfant": [],
        desserts: [],
        boissons: [],
      },
    );
  }, [active]);

  return (
    <div className="pt-20">
      <section className="yellow-paper relative overflow-hidden border-b-[3px] border-brand-brown px-4 py-14 sm:px-6 lg:py-20">
        <DecorativePalm className="absolute -left-16 top-0 h-56 w-56 text-brand-green opacity-30" />
        <DecorativePalm flip className="absolute -right-16 top-0 h-56 w-56 text-brand-green opacity-30" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <StickerPill color="green" rotation={-2} icon={<Search size={14} />}>
              Menu complet
            </StickerPill>
            <h1 className="mt-6 font-display text-hero-sm uppercase leading-none text-brand-brown sm:text-hero">
              Choisis
              <br />
              <span className="poster-title-orange inline-block">ton festin</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-bold leading-7 text-brand-brown/74">
              Tacos signature, smash burgers, suppléments, menus family,
              desserts et boissons. Tout est prêt pour te régaler à Meknès.
            </p>
            <div className="mt-7">
              <StreetButton href="/composer" size="lg" icon={<Flame size={20} />}>
                Composer mon tacos
              </StreetButton>
            </div>
          </div>
          <div className="relative mx-auto h-72 w-full max-w-md sm:h-96">
            <div className="absolute left-0 top-8 h-56 w-56 -rotate-6 overflow-hidden rounded-[22px] border-[4px] border-brand-brown bg-brand-cream shadow-green sm:h-72 sm:w-72">
              <Image src="/images/tacos-chevre-miel.webp" alt="Tacos chèvre miel" fill sizes="288px" className="object-cover" priority />
            </div>
            <div className="absolute bottom-0 right-0 h-48 w-48 rotate-6 overflow-hidden rounded-[22px] border-[4px] border-brand-brown bg-brand-cream shadow-hard sm:h-64 sm:w-64">
              <Image src="/images/burger-big-smash.webp" alt="Big Smash burger" fill sizes="256px" className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b-[3px] border-brand-brown bg-brand-green">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 no-scrollbar sm:px-6">
          <div className="flex min-w-max items-center gap-2 py-3">
            <button
              type="button"
              onClick={() => setActive("all")}
              aria-pressed={active === "all"}
              className={[
                "rounded-full border-2 border-brand-brown px-4 py-2 text-xs font-black uppercase tracking-[0.12em] shadow-hard transition-transform hover:-translate-y-0.5",
                active === "all" ? "bg-brand-orange text-brand-cream" : "bg-brand-cream text-brand-brown",
              ].join(" ")}
            >
              Tout
            </button>
            {CATEGORIES_ORDER.map((category) => {
              const selected = active === category;
              const info = CATEGORY_LABELS[category];
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={selected}
                  className={[
                    "rounded-full border-2 border-brand-brown px-4 py-2 text-xs font-black uppercase tracking-[0.12em] shadow-hard transition-transform hover:-translate-y-0.5",
                    selected ? "bg-brand-yellow text-brand-brown" : "bg-brand-cream text-brand-brown",
                  ].join(" ")}
                >
                  {info.short}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="food-paper px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <main className="space-y-16">
            {CATEGORIES_ORDER.filter((category) => grouped[category].length > 0).map((category) => {
              const info = CATEGORY_LABELS[category];
              return (
                <section key={category} id={category} className="scroll-mt-36">
                  <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <SectionHeader
                      eyebrow={`${grouped[category].length} produits`}
                      title={info.label}
                      subtitle={
                        category === "tacos-signature"
                          ? "Le coeur de la maison : généreux, chaud, sauce fromagère."
                          : category === "smash"
                            ? "Des burgers smashés comme il faut, fromage fondant et sauce maison."
                            : undefined
                      }
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {grouped[category].map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                </section>
              );
            })}
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-36 space-y-5">
              <CartSummary compact />
              <div className="rounded-[18px] border-[3px] border-brand-brown bg-brand-green p-5 text-brand-cream shadow-hard">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-brown bg-brand-yellow text-brand-brown shadow-hard">
                  <ShoppingBag size={22} />
                </div>
                <h3 className="mt-4 font-display text-3xl uppercase text-brand-yellow">
                  Un menu pour tous ?
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-brand-cream/82">
                  Compose ton tacos sur mesure et ajoute tes sides préférés.
                </p>
                <div className="mt-4">
                  <StreetButton href="/composer" variant="secondary" size="sm" fullWidth>
                    Composer
                  </StreetButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <CartTotalLink />
    </div>
  );
}
