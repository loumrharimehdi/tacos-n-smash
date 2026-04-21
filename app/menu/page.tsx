"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { CATEGORIES_ORDER, CATEGORY_LABELS, MENU } from "@/lib/menu";
import type { Category } from "@/lib/types";

export default function MenuPage() {
  const [active, setActive] = useState<Category | "all">("all");

  const items = useMemo(() => {
    if (active === "all") return MENU;
    return MENU.filter((m) => m.category === active);
  }, [active]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof MENU> = {};
    for (const i of items) (map[i.category] ??= []).push(i);
    return map;
  }, [items]);

  return (
    <div className="pt-20 sm:pt-24">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-ink-900">
        <div className="absolute inset-0 bg-radial-spot" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <div className="kicker">🧾 Carte complète</div>
              <h1 className="mt-4 section-title">
                Le <span className="text-brand-yellow">menu</span>
              </h1>
              <p className="mt-4 max-w-xl text-white/60">
                Tacos, Smash Burgers, Menus Family, suppléments, boissons et
                desserts. Tous les prix en dirhams (DH).
              </p>
            </div>
            <Link href="/composer" className="btn-yellow">
              <Flame size={18} /> Composer mon tacos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-ink-900/85 backdrop-blur-xl sm:top-20">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 no-scrollbar sm:px-6">
          <div className="flex min-w-max items-center gap-2 py-4">
            <button
              onClick={() => setActive("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                active === "all"
                  ? "bg-brand-yellow text-ink-900 shadow-glow"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              ✨ Tout
            </button>
            {CATEGORIES_ORDER.map((c) => {
              const info = CATEGORY_LABELS[c];
              const on = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    on
                      ? "bg-brand-yellow text-ink-900 shadow-glow"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {info.emoji} {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grouped sections */}
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 md:py-20">
        {CATEGORIES_ORDER.filter((c) => grouped[c]?.length).map((c) => {
          const info = CATEGORY_LABELS[c];
          return (
            <motion.section
              key={c}
              id={c}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <span className="kicker">{info.emoji} {grouped[c].length} produits</span>
                  <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">
                    {info.label}
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[c].map((item, i) => (
                  <MenuCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
