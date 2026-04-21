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
    for (const i of items) {
      (map[i.category] ??= []).push(i);
    }
    return map;
  }, [items]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="chip mb-3">🧾 Carte complète</div>
          <h1 className="section-title">Notre menu</h1>
          <p className="mt-3 max-w-xl text-white/70">
            Tacos, Smash Burgers, Menus Family, suppléments, boissons et
            desserts. Tous les prix en dirhams (DH).
          </p>
        </div>
        <Link href="/composer" className="btn-yellow">
          <Flame size={18} /> Composer mon tacos
        </Link>
      </div>

      {/* Category tabs */}
      <div className="sticky top-16 z-30 -mx-4 mt-8 overflow-x-auto border-b border-white/10 bg-brand-black/85 px-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex min-w-max items-center gap-2 py-3">
          <button
            onClick={() => setActive("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === "all"
                ? "bg-brand-yellow text-brand-black"
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
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  on
                    ? "bg-brand-yellow text-brand-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {info.emoji} {info.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped sections */}
      <div className="mt-10 space-y-14">
        {CATEGORIES_ORDER.filter((c) => grouped[c]?.length).map((c) => {
          const info = CATEGORY_LABELS[c];
          return (
            <motion.section
              key={c}
              id={c}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-5 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-black sm:text-3xl">
                  <span className="mr-2">{info.emoji}</span>
                  {info.label}
                </h2>
                <span className="text-sm text-white/50">
                  {grouped[c].length} produits
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[c].map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
