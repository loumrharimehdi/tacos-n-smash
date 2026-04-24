"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Flame, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TACOS_MEATS, TACOS_SAUCES, TACOS_SIZES } from "@/lib/menu";
import { useCart } from "@/lib/store";
import type { TacosSize } from "@/lib/types";
import PriceBadge from "@/components/ui/PriceBadge";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

type Step = 0 | 1 | 2;

const STEPS = ["Taille", "Viandes", "Sauce"] as const;

export default function TacosConfigurator() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [size, setSize] = useState<TacosSize>("simple");
  const [meats, setMeats] = useState<string[]>([]);
  const [sauce, setSauce] = useState("");
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const sizeDef = TACOS_SIZES.find((item) => item.id === size) ?? TACOS_SIZES[0];
  const maxMeats = sizeDef.meats;

  const meatExtra = useMemo(
    () =>
      meats.reduce((sum, id) => {
        const meat = TACOS_MEATS.find((item) => item.id === id);
        return sum + (meat?.extra ?? 0);
      }, 0),
    [meats],
  );

  const total = sizeDef.price + meatExtra;
  const progress = Math.round(((step + (step === 2 && sauce ? 1 : 0)) / 3) * 100);
  const canNext =
    step === 0 ||
    (step === 1 && meats.length === maxMeats) ||
    (step === 2 && Boolean(sauce));

  function handleSizeChange(next: TacosSize) {
    setSize(next);
    const nextSize = TACOS_SIZES.find((item) => item.id === next) ?? TACOS_SIZES[0];
    if (meats.length > nextSize.meats) setMeats(meats.slice(0, nextSize.meats));
  }

  function toggleMeat(id: string) {
    if (meats.includes(id)) {
      setMeats(meats.filter((item) => item !== id));
      return;
    }
    if (maxMeats === 1) {
      setMeats([id]);
      return;
    }
    if (meats.length < maxMeats) setMeats([...meats, id]);
  }

  function goNext() {
    if (!canNext) return;
    setStep((current) => Math.min(2, current + 1) as Step);
  }

  function goPrev() {
    setStep((current) => Math.max(0, current - 1) as Step);
  }

  function handleAdd() {
    if (!sauce || meats.length !== maxMeats) return;

    const meatLabels = meats
      .map((id) => TACOS_MEATS.find((item) => item.id === id)?.label)
      .filter((label): label is string => Boolean(label))
      .join(", ");
    const sauceLabel = TACOS_SAUCES.find((item) => item.id === sauce)?.label ?? "—";

    addItem({
      id: `tacos-${size}-${meats.join("-")}-${sauce}-${Date.now()}`,
      name: `Tacos ${sizeDef.label}`,
      price: total,
      image: sizeDef.image,
      options: `Viandes : ${meatLabels || "—"} · Sauce : ${sauceLabel}`,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
    setMeats([]);
    setSauce("");
    setStep(0);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
      <div className="space-y-8">
        <div className="rounded-[22px] border-[3px] border-brand-brown bg-brand-yellow p-4 shadow-hard sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <StickerPill color="orange" rotation={-1}>
                Étape {step + 1} / 3
              </StickerPill>
              <h2 className="mt-4 font-display text-5xl uppercase leading-none text-brand-brown">
                {STEPS[step]}
              </h2>
            </div>
            <div className="min-w-40">
              <div className="text-right font-display text-4xl leading-none text-brand-green">
                {progress}%
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-brand-brown bg-brand-cream">
                <motion.div
                  className="h-full bg-brand-orange"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {STEPS.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index as Step)}
                className={[
                  "min-h-12 rounded-full border-2 border-brand-brown px-2 text-xs font-black uppercase tracking-[0.12em] shadow-hard",
                  step === index ? "bg-brand-green text-brand-yellow" : "bg-brand-cream text-brand-brown",
                ].join(" ")}
                aria-current={step === index ? "step" : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="size"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              className="rounded-[22px] border-[3px] border-brand-brown bg-brand-cream p-5 shadow-green sm:p-6"
            >
              <h3 className="font-display text-5xl uppercase leading-none">Choisis la taille</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-brand-brown/70">
                La taille détermine le nombre exact de viandes à sélectionner.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {TACOS_SIZES.map((item, index) => {
                  const selected = item.id === size;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => handleSizeChange(item.id)}
                      whileHover={reduce ? undefined : { y: -4 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      className={[
                        "relative overflow-hidden rounded-[18px] border-[3px] border-brand-brown p-3 text-left shadow-hard",
                        selected ? "bg-brand-yellow" : "bg-brand-cream",
                      ].join(" ")}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-[14px] border-2 border-brand-brown">
                        <Image src={item.image} alt={`Tacos ${item.label}`} fill sizes="190px" className="object-cover" />
                      </div>
                      <div className="mt-4 flex items-start justify-between gap-2">
                        <div>
                          <div className="font-display text-3xl uppercase leading-none">{item.label}</div>
                          <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-brand-brown/70">
                            {item.meats} viande{item.meats > 1 ? "s" : ""}
                          </div>
                        </div>
                        <PriceBadge price={item.price} color={selected ? "orange" : "green"} rotation={index === 1 ? 0 : index === 0 ? -5 : 5} />
                      </div>
                      {selected && (
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-brown bg-brand-green text-brand-yellow shadow-hard">
                          <Check size={17} />
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="meats"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              className="rounded-[22px] border-[3px] border-brand-brown bg-brand-cream p-5 shadow-green sm:p-6"
            >
              <h3 className="font-display text-5xl uppercase leading-none">
                {maxMeats === 1 ? "Choisis ta viande" : `Choisis ${maxMeats} viandes`}
              </h3>
              <p className="mt-2 text-sm font-bold leading-6 text-brand-brown/70">
                {meats.length} / {maxMeats} sélectionnée{meats.length > 1 ? "s" : ""}.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {TACOS_MEATS.map((meat) => {
                  const selected = meats.includes(meat.id);
                  const disabled = !selected && meats.length >= maxMeats && maxMeats > 1;
                  return (
                    <motion.button
                      key={meat.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleMeat(meat.id)}
                      whileHover={!reduce && !disabled ? { y: -3 } : undefined}
                      className={[
                        "flex min-h-20 items-center justify-between gap-3 rounded-[16px] border-[3px] border-brand-brown p-4 text-left shadow-hard disabled:opacity-45",
                        selected ? "bg-brand-green text-brand-yellow" : "bg-brand-yellow text-brand-brown",
                      ].join(" ")}
                    >
                      <span>
                        <span className="block font-display text-3xl uppercase leading-none">{meat.label}</span>
                        <span className="mt-1 block text-xs font-black uppercase tracking-[0.12em]">
                          {meat.extra > 0 ? `+${meat.extra} DH` : "Inclus"}
                        </span>
                      </span>
                      {selected && <Check size={22} />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="sauce"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              className="rounded-[22px] border-[3px] border-brand-brown bg-brand-cream p-5 shadow-green sm:p-6"
            >
              <h3 className="font-display text-5xl uppercase leading-none">Choisis ta sauce</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-brand-brown/70">
                Sauce fromagère maison incluse dans chaque tacos.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {TACOS_SAUCES.map((item) => {
                  const selected = sauce === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => setSauce(item.id)}
                      whileHover={reduce ? undefined : { y: -3 }}
                      className={[
                        "flex min-h-20 items-center justify-between gap-3 rounded-[16px] border-[3px] border-brand-brown p-4 text-left shadow-hard",
                        selected ? "bg-brand-orange text-brand-cream" : "bg-brand-yellow text-brand-brown",
                      ].join(" ")}
                    >
                      <span>
                        <span className="block font-display text-3xl uppercase leading-none">{item.label}</span>
                        {item.heat && (
                          <span className="mt-1 block text-xs font-black uppercase tracking-[0.12em]">
                            {item.heat}
                          </span>
                        )}
                      </span>
                      {selected && <Check size={22} />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3">
          <StreetButton
            onClick={goPrev}
            disabled={step === 0}
            variant="secondary"
            icon={<ArrowLeft size={18} />}
          >
            Précédent
          </StreetButton>
          {step < 2 ? (
            <StreetButton onClick={goNext} disabled={!canNext} icon={<ArrowRight size={18} />}>
              Suivant
            </StreetButton>
          ) : (
            <StreetButton
              onClick={handleAdd}
              disabled={!sauce || meats.length !== maxMeats}
              variant={added ? "green" : "primary"}
              icon={added ? <Check size={18} /> : <ShoppingBag size={18} />}
            >
              {added ? "Ajouté" : "Ajouter"}
            </StreetButton>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="card">
          <div className="relative aspect-square overflow-hidden border-b-[3px] border-brand-brown bg-brand-yellow">
            <Image src={sizeDef.image} alt={`Tacos ${sizeDef.label}`} fill sizes="390px" className="object-cover" />
            <div className="absolute left-4 top-4">
              <StickerPill color="orange" rotation={-3} icon={<Flame size={12} />}>
                Ton tacos
              </StickerPill>
            </div>
            <div className="absolute bottom-4 right-4">
              <PriceBadge price={total} color="green" rotation={5} />
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-display text-5xl uppercase leading-none text-brand-brown">
              Tacos {sizeDef.label}
            </h3>
            <div className="mt-5 space-y-3 text-sm font-bold">
              <SummaryRow label="Viandes">
                {meats.length
                  ? meats.map((id) => TACOS_MEATS.find((item) => item.id === id)?.label).filter(Boolean).join(", ")
                  : "À choisir"}
              </SummaryRow>
              <SummaryRow label="Sauce">
                {TACOS_SAUCES.find((item) => item.id === sauce)?.label ?? "À choisir"}
              </SummaryRow>
              <SummaryRow label="Fromagère">Maison · incluse</SummaryRow>
              <SummaryRow label="Frites">Incluses</SummaryRow>
            </div>
            <div className="mt-5 border-t-[3px] border-dashed border-brand-brown pt-5">
              <div className="flex items-end justify-between">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-brand-brown/70">Total</span>
                <AnimatedCounter value={total} suffix=" DH" className="font-display text-5xl leading-none text-brand-orange" />
              </div>
              <Link href="/order" className="mt-4 inline-flex text-sm font-black uppercase tracking-[0.12em] text-brand-green underline">
                Voir le panier →
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-3 bottom-3 z-40 rounded-[18px] border-[3px] border-brand-brown bg-brand-cream p-3 shadow-hard md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-brown/70">Total tacos</p>
            <AnimatedCounter value={total} suffix=" DH" className="font-display text-4xl leading-none text-brand-orange" />
          </div>
          <StreetButton
            onClick={step < 2 ? goNext : handleAdd}
            disabled={step < 2 ? !canNext : !sauce || meats.length !== maxMeats}
            size="sm"
            icon={step < 2 ? <ArrowRight size={16} /> : <ShoppingBag size={16} />}
          >
            {step < 2 ? "Suite" : "Ajouter"}
          </StreetButton>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-brand-brown/15 pb-3">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-brand-brown/64">
        {label}
      </span>
      <span className="text-right text-brand-brown">{children}</span>
    </div>
  );
}
