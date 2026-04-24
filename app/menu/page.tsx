"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Flame, Search, ShoppingBag, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartSummary, { CartTotalLink } from "@/components/CartSummary";
import SectionHeader from "@/components/ui/SectionHeader";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";
import DecorativePalm from "@/components/ui/DecorativePalm";
import { CATEGORIES_ORDER, CATEGORY_LABELS, MENU } from "@/lib/menu";
import type { Category } from "@/lib/types";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES_ORDER[0]);
  const sectionRefs = useRef<Record<Category, HTMLElement | null>>({
    "tacos-signature": null,
    smash: null,
    supplements: null,
    "menu-family": null,
    "menu-enfant": null,
    desserts: null,
    boissons: null,
  });

  const grouped = useMemo(() => {
    const q = normalize(query.trim());
    const filtered = q
      ? MENU.filter(
          (item) =>
            normalize(item.name).includes(q) ||
            (item.description && normalize(item.description).includes(q)),
        )
      : MENU;
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
  }, [query]);

  const visibleCategories = useMemo(
    () => CATEGORIES_ORDER.filter((cat) => grouped[cat].length > 0),
    [grouped],
  );

  // Scroll-spy: tab actif selon la section visible
  useEffect(() => {
    if (visibleCategories.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveCategory(visible[0].target.id as Category);
        }
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    visibleCategories.forEach((cat) => {
      const el = sectionRefs.current[cat];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visibleCategories]);

  function scrollToCategory(category: Category) {
    const el = sectionRefs.current[category];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const totalResults = visibleCategories.reduce(
    (sum, cat) => sum + grouped[cat].length,
    0,
  );

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
              <Image src="/images/tacos-chevre-miel.png" alt="Tacos chèvre miel" fill sizes="288px" className="object-cover" priority />
            </div>
            <div className="absolute bottom-0 right-0 h-48 w-48 rotate-6 overflow-hidden rounded-[22px] border-[4px] border-brand-brown bg-brand-cream shadow-hard sm:h-64 sm:w-64">
              <Image src="/images/burger-big.png" alt="Big Smash burger" fill sizes="256px" className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b-[3px] border-brand-brown bg-brand-green">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 py-3">
            <div className="relative flex-1 min-w-0">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-brown/60"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un tacos, un burger..."
                aria-label="Rechercher un plat"
                className="w-full rounded-full border-2 border-brand-brown bg-brand-cream py-2 pl-9 pr-10 text-sm font-bold text-brand-brown placeholder:text-brand-brown/50 shadow-hard focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Effacer la recherche"
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brand-brown hover:bg-brand-orange hover:text-brand-cream"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex min-w-max items-center gap-2 pb-3">
              {CATEGORIES_ORDER.map((category) => {
                const info = CATEGORY_LABELS[category];
                const selected = activeCategory === category;
                const disabled = grouped[category].length === 0;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => scrollToCategory(category)}
                    aria-current={selected ? "true" : undefined}
                    disabled={disabled}
                    className={[
                      "rounded-full border-2 border-brand-brown px-4 py-2 text-xs font-black uppercase tracking-[0.12em] shadow-hard transition-transform hover:-translate-y-0.5",
                      selected
                        ? "bg-brand-yellow text-brand-brown"
                        : "bg-brand-cream text-brand-brown",
                      disabled ? "opacity-40 cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    {info.short}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="food-paper px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <main className="space-y-16">
            {totalResults === 0 && (
              <div className="card flex flex-col items-center gap-4 p-8 text-center">
                <Search size={36} className="text-brand-brown/40" aria-hidden />
                <div>
                  <h2 className="font-display text-4xl uppercase leading-none">
                    Aucun résultat
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-brand-brown/70">
                    Essaie un autre mot ou parcours toutes les catégories.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-full border-2 border-brand-brown bg-brand-orange px-5 py-2 text-xs font-black uppercase tracking-[0.12em] text-brand-cream shadow-hard"
                >
                  Effacer la recherche
                </button>
              </div>
            )}
            {visibleCategories.map((category) => {
              const info = CATEGORY_LABELS[category];
              return (
                <section
                  key={category}
                  id={category}
                  ref={(el) => {
                    sectionRefs.current[category] = el;
                  }}
                  className="scroll-mt-40"
                >
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
            <div className="sticky top-44 space-y-5">
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
