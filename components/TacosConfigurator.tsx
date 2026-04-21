"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  TACOS_SIZES,
  TACOS_MEATS,
  TACOS_SAUCES,
} from "@/lib/menu";
import { useCart } from "@/lib/store";
import type { TacosSize } from "@/lib/types";

type Step = 0 | 1 | 2 | 3;

export default function TacosConfigurator() {
  const [step, setStep] = useState<Step>(0);
  const [size, setSize] = useState<TacosSize>("simple");
  const [meats, setMeats] = useState<string[]>([]);
  const [sauce, setSauce] = useState<string>("");
  const [added, setAdded] = useState(false);

  const addItem = useCart((s) => s.addItem);

  const sizeDef = TACOS_SIZES.find((s) => s.id === size)!;
  const maxMeats = sizeDef.meats;

  const meatExtra = useMemo(
    () =>
      meats.reduce((sum, id) => {
        const m = TACOS_MEATS.find((x) => x.id === id);
        return sum + (m?.extra ?? 0);
      }, 0),
    [meats]
  );
  const total = sizeDef.price + meatExtra;

  function toggleMeat(id: string) {
    if (meats.includes(id)) {
      setMeats(meats.filter((m) => m !== id));
    } else if (meats.length < maxMeats) {
      setMeats([...meats, id]);
    } else if (maxMeats === 1) {
      setMeats([id]);
    }
  }

  function handleSizeChange(next: TacosSize) {
    setSize(next);
    // Trim meats that exceed new size limit
    const nextMax = TACOS_SIZES.find((s) => s.id === next)!.meats;
    if (meats.length > nextMax) setMeats(meats.slice(0, nextMax));
  }

  function handleAdd() {
    const meatLabels = meats
      .map((id) => TACOS_MEATS.find((m) => m.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    const sauceLabel = TACOS_SAUCES.find((s) => s.id === sauce)?.label ?? "—";

    addItem({
      id: `tacos-${size}-${meats.join("-")}-${sauce}-${Date.now()}`,
      name: `Tacos ${sizeDef.label} (${maxMeats} viande${maxMeats > 1 ? "s" : ""})`,
      price: total,
      image: sizeDef.image,
      options: `Viande : ${meatLabels || "—"} · Sauce : ${sauceLabel}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    // Reset
    setMeats([]);
    setSauce("");
    setStep(0);
  }

  const canNext =
    (step === 0) ||
    (step === 1 && meats.length === maxMeats) ||
    (step === 2 && !!sauce);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* LEFT: Steps */}
      <div>
        {/* Step indicator */}
        <div className="mb-6 flex items-center gap-2">
          {["Taille", "Viande", "Sauce"].map((label, i) => {
            const active = step === i;
            const done = step > i;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    done
                      ? "bg-brand-green text-white"
                      : active
                        ? "bg-brand-yellow text-brand-black"
                        : "bg-white/10 text-white/50"
                  }`}
                >
                  {done ? <Check size={14} /> : i + 1}
                </div>
                <div
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    active ? "text-white" : "text-white/50"
                  }`}
                >
                  {label}
                </div>
                {i < 2 && (
                  <div
                    className={`h-px flex-1 ${
                      done ? "bg-brand-green" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="size"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
            >
              <h2 className="text-2xl font-black">1. Choisis la taille</h2>
              <p className="mt-1 text-white/60">
                La taille détermine le nombre de viandes incluses.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {TACOS_SIZES.map((s) => {
                  const on = size === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSizeChange(s.id)}
                      className={`relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all ${
                        on
                          ? "border-brand-yellow bg-brand-yellow/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="relative mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-xl">
                        <Image
                          src={s.image}
                          alt={s.label}
                          fill
                          sizes="140px"
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="text-base font-black">{s.label}</span>
                        <span className="font-black text-brand-yellow">
                          {s.price} DH
                        </span>
                      </div>
                      <div className="text-xs text-white/60">
                        {s.meats} viande{s.meats > 1 ? "s" : ""}
                      </div>
                      {on && (
                        <div className="absolute right-2 top-2 rounded-full bg-brand-yellow p-1 text-brand-black">
                          <Check size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="meat"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
            >
              <h2 className="text-2xl font-black">
                2. Choisis {maxMeats === 1 ? "ta viande" : `tes ${maxMeats} viandes`}
              </h2>
              <p className="mt-1 text-white/60">
                {meats.length} / {maxMeats} sélectionné{meats.length > 1 ? "s" : ""}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {TACOS_MEATS.map((m) => {
                  const on = meats.includes(m.id);
                  const disabled = !on && meats.length >= maxMeats && maxMeats > 1;
                  return (
                    <button
                      key={m.id}
                      onClick={() => toggleMeat(m.id)}
                      disabled={disabled}
                      className={`flex items-center justify-between rounded-xl border-2 p-3 text-left transition-all ${
                        on
                          ? "border-brand-yellow bg-brand-yellow/10"
                          : disabled
                            ? "border-white/5 bg-white/5 opacity-40"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className="font-semibold">{m.label}</span>
                      <span
                        className={`text-xs font-bold ${
                          m.extra ? "text-brand-yellow" : "text-white/40"
                        }`}
                      >
                        {m.extra > 0 ? `+${m.extra} DH` : "inclus"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="sauce"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
            >
              <h2 className="text-2xl font-black">3. Choisis ta sauce</h2>
              <p className="mt-1 text-white/60">
                La sauce fromagère maison est incluse dans tous les tacos.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {TACOS_SAUCES.map((s) => {
                  const on = sauce === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSauce(s.id)}
                      className={`flex items-center justify-between rounded-xl border-2 p-3 text-left transition-all ${
                        on
                          ? "border-brand-yellow bg-brand-yellow/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className="font-semibold">{s.label}</span>
                      {s.heat && <span className="text-sm">{s.heat}</span>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((step - 1) as Step)}
            disabled={step === 0}
            className="btn-outline text-sm"
          >
            <ArrowLeft size={16} /> Précédent
          </button>
          {step < 2 ? (
            <button
              onClick={() => setStep((step + 1) as Step)}
              disabled={!canNext}
              className="btn-yellow text-sm"
            >
              Suivant <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleAdd}
              disabled={!sauce || meats.length !== maxMeats}
              className={`btn text-sm ${
                added
                  ? "bg-brand-green text-white"
                  : "bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark disabled:bg-white/10 disabled:text-white/40"
              }`}
            >
              {added ? (
                <>
                  <Check size={16} /> Ajouté au panier
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Ajouter au panier · {total} DH
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT: Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">
            Ton Tacos
          </h3>

          <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl">
            <Image
              src={sizeDef.image}
              alt={sizeDef.label}
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent p-4">
              <div className="text-sm text-white/70">Taille</div>
              <div className="text-2xl font-black text-brand-yellow">
                {sizeDef.label}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <Row label="Taille">
              {sizeDef.label} ({maxMeats} viande{maxMeats > 1 ? "s" : ""})
            </Row>
            <Row label="Viandes">
              {meats.length
                ? meats
                    .map(
                      (id) => TACOS_MEATS.find((m) => m.id === id)?.label
                    )
                    .join(", ")
                : "—"}
            </Row>
            <Row label="Sauce">
              {TACOS_SAUCES.find((s) => s.id === sauce)?.label ?? "—"}
            </Row>
            <Row label="Sauce fromagère">Maison · incluse</Row>
            <Row label="Frites">Incluses</Row>
          </div>

          <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-4">
            <span className="text-sm text-white/60">Total</span>
            <span className="text-3xl font-black text-brand-yellow">
              {total} DH
            </span>
          </div>

          <div className="mt-4 text-center text-xs text-white/50">
            <Link href="/order" className="hover:text-brand-yellow">
              Voir le panier →
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/50">{label}</span>
      <span className="text-right font-medium text-white">{children}</span>
    </div>
  );
}
