"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, ArrowRight, ArrowLeft, Flame } from "lucide-react";
import Link from "next/link";
import { TACOS_SIZES, TACOS_MEATS, TACOS_SAUCES } from "@/lib/menu";
import { useCart } from "@/lib/store";
import PriceCounter from "@/components/PriceCounter";
import type { TacosSize } from "@/lib/types";

type Step = 0 | 1 | 2;

const STEP_LABELS = ["Taille", "Viande", "Sauce"];

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
  const progress = ((step + (step === 2 && sauce ? 1 : 0)) / 3) * 100;

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
      name: `Tacos ${sizeDef.label}`,
      price: total,
      image: sizeDef.image,
      options: `Viande : ${meatLabels || "—"} · Sauce : ${sauceLabel}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setMeats([]);
    setSauce("");
    setStep(0);
  }

  const canNext =
    step === 0 ||
    (step === 1 && meats.length === maxMeats) ||
    (step === 2 && !!sauce);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
      {/* LEFT: Steps */}
      <div>
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="kicker">Étape {step + 1} / 3</div>
              <h2 className="mt-1 font-display text-3xl uppercase leading-none tracking-wide text-brand-brown sm:text-4xl">
                {STEP_LABELS[step]}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-brand-brown/65">
                Progression
              </div>
              <div className="font-display text-2xl text-brand-yellow">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand-cream/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-yellow-dark via-brand-yellow to-brand-yellow-light shadow-glow"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition-all ${
                    step > i
                      ? "bg-brand-yellow text-ink-900"
                      : step === i
                        ? "bg-brand-yellow/20 text-brand-yellow ring-2 ring-brand-yellow"
                        : "bg-brand-cream/5 text-brand-brown/60"
                  }`}
                >
                  {step > i ? <Check size={13} /> : i + 1}
                </div>
                <span
                  className={`hidden text-xs font-semibold uppercase tracking-wider sm:inline ${
                    step === i ? "text-brand-brown" : "text-brand-brown/60"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="size"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-3xl uppercase tracking-wide">
                Choisis la taille
              </h2>
              <p className="mt-2 text-brand-brown/60">
                La taille détermine le nombre de viandes incluses.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {TACOS_SIZES.map((s, i) => {
                  const on = size === s.id;
                  return (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.08 }}
                      onClick={() => handleSizeChange(s.id)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative overflow-hidden rounded-3xl border-2 p-4 text-left transition-all ${
                        on
                          ? "border-brand-yellow bg-brand-yellow/10 shadow-glow"
                          : "border-brand-brown/10 bg-ink-800 hover:border-brand-brown/25"
                      }`}
                    >
                      <div className="relative mx-auto aspect-square w-full max-w-[160px] overflow-hidden rounded-2xl">
                        <Image
                          src={s.image}
                          alt={s.label}
                          fill
                          sizes="160px"
                          className={`object-cover transition-transform duration-500 ${
                            on ? "scale-[1.04]" : "group-hover:scale-[1.03]"
                          }`}
                        />
                      </div>
                      <div className="mt-4 flex items-baseline justify-between">
                        <span className="font-display text-2xl uppercase tracking-wide text-brand-brown">
                          {s.label}
                        </span>
                        <span className="font-display text-xl text-brand-yellow">
                          {s.price} DH
                        </span>
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-widest text-brand-brown/65">
                        {s.meats} viande{s.meats > 1 ? "s" : ""}
                      </div>
                      {on && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-ink-900 shadow-glow"
                        >
                          <Check size={14} strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="meat"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-3xl uppercase tracking-wide">
                {maxMeats === 1 ? "Choisis ta viande" : `Choisis tes ${maxMeats} viandes`}
              </h2>
              <p className="mt-2 text-brand-brown/60">
                <span className="font-semibold text-brand-yellow">
                  {meats.length} / {maxMeats}
                </span>{" "}
                sélectionné{meats.length > 1 ? "s" : ""}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {TACOS_MEATS.map((m, i) => {
                  const on = meats.includes(m.id);
                  const disabled = !on && meats.length >= maxMeats && maxMeats > 1;
                  return (
                    <motion.button
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.03 + i * 0.04 }}
                      onClick={() => toggleMeat(m.id)}
                      disabled={disabled}
                      whileHover={!disabled ? { y: -2 } : undefined}
                      whileTap={!disabled ? { scale: 0.97 } : undefined}
                      className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all ${
                        on
                          ? "border-brand-yellow bg-brand-yellow/10 shadow-glow"
                          : disabled
                            ? "border-brand-brown/5 bg-ink-800 opacity-40"
                            : "border-brand-brown/10 bg-ink-800 hover:border-brand-brown/25"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {on && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-ink-900"
                          >
                            <Check size={12} strokeWidth={3} />
                          </motion.span>
                        )}
                        <span className="font-display text-lg uppercase tracking-wide text-brand-brown">
                          {m.label}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          m.extra ? "text-brand-yellow" : "text-brand-brown/60"
                        }`}
                      >
                        {m.extra > 0 ? `+${m.extra} DH` : "inclus"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="sauce"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-3xl uppercase tracking-wide">
                Choisis ta sauce
              </h2>
              <p className="mt-2 text-brand-brown/60">
                La sauce fromagère maison est incluse dans tous les tacos.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {TACOS_SAUCES.map((s, i) => {
                  const on = sauce === s.id;
                  return (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.03 + i * 0.03 }}
                      onClick={() => setSauce(s.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all ${
                        on
                          ? "border-brand-yellow bg-brand-yellow/10 shadow-glow"
                          : "border-brand-brown/10 bg-ink-800 hover:border-brand-brown/25"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {on && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-ink-900"
                          >
                            <Check size={12} strokeWidth={3} />
                          </motion.span>
                        )}
                        <span className="font-display text-lg uppercase tracking-wide text-brand-brown">
                          {s.label}
                        </span>
                      </div>
                      {s.heat && <span className="text-sm">{s.heat}</span>}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between gap-3">
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
            <motion.button
              onClick={handleAdd}
              disabled={!sauce || meats.length !== maxMeats}
              whileHover={
                sauce && meats.length === maxMeats ? { scale: 1.02 } : undefined
              }
              whileTap={
                sauce && meats.length === maxMeats ? { scale: 0.97 } : undefined
              }
              className={`btn text-sm ${
                added
                  ? "bg-brand-green text-brand-brown"
                  : "bg-brand-yellow text-ink-900 shadow-glow hover:bg-brand-yellow-light disabled:bg-brand-cream/10 disabled:text-brand-brown/60 disabled:shadow-none"
              }`}
            >
              {added ? (
                <>
                  <Check size={16} /> Ajouté au panier
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Ajouter ·{" "}
                  <PriceCounter value={total} />
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* RIGHT: Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative overflow-hidden rounded-3xl border border-brand-brown/10 bg-ink-800 shadow-card">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={sizeDef.image}
              alt={sizeDef.label}
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
            <div className="absolute left-5 top-5 chip-yellow">
              <Flame size={12} /> Ton tacos
            </div>
            <div className="absolute inset-x-5 bottom-5">
              <div className="text-xs uppercase tracking-widest text-brand-brown/70">
                Taille
              </div>
              <div className="font-display text-4xl uppercase leading-none tracking-wide text-brand-yellow">
                {sizeDef.label}
              </div>
            </div>
          </div>

          <div className="space-y-3 p-5 text-sm">
            <Row label="Viandes">
              {meats.length
                ? meats.map((id) => TACOS_MEATS.find((m) => m.id === id)?.label).join(", ")
                : "—"}
            </Row>
            <Row label="Sauce">
              {TACOS_SAUCES.find((s) => s.id === sauce)?.label ?? "—"}
            </Row>
            <Row label="Sauce fromagère">Maison · incluse</Row>
            <Row label="Frites">Incluses</Row>
          </div>

          <div className="border-t border-brand-brown/10 bg-ink-900/50 px-5 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-brand-brown/65">
                Total
              </span>
              <span className="font-display text-4xl text-brand-yellow">
                <PriceCounter value={total} />
              </span>
            </div>
            <div className="mt-2 text-center text-xs text-brand-brown/60">
              <Link
                href="/order"
                className="underline-offset-2 hover:text-brand-yellow hover:underline"
              >
                Voir le panier →
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs uppercase tracking-widest text-brand-brown/60">{label}</span>
      <span className="text-right font-medium text-brand-brown">{children}</span>
    </div>
  );
}
