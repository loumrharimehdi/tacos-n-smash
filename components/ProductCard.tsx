"use client";

import Image from "next/image";
import { Check, Plus, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/store";
import type { MenuItem } from "@/lib/types";
import PriceBadge from "@/components/ui/PriceBadge";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";

type ProductCardProps = {
  product: MenuItem;
  variant?: "tacos" | "burger" | "supplement" | "dessert" | "drink" | "family";
  badge?: "bestseller" | "premium" | "spicy" | string;
  image?: string;
  index?: number;
  className?: string;
};

const fallbackLabel: Record<string, string> = {
  family: "Menu",
  burger: "Burger",
  texmex: "Tex Mex",
  kids: "Kids",
  dessert: "Dessert",
};

function inferVariant(product: MenuItem): NonNullable<ProductCardProps["variant"]> {
  if (product.category === "tacos-signature") return "tacos";
  if (product.category === "smash") return "burger";
  if (product.category === "boissons") return "drink";
  if (product.category === "desserts") return "dessert";
  if (product.category === "menu-family" || product.category === "menu-enfant") return "family";
  return "supplement";
}

function normalizeBadge(product: MenuItem, badge?: string) {
  return (badge ?? product.badge ?? "").toLowerCase();
}

export default function ProductCard({
  product,
  variant,
  badge,
  image,
  index = 0,
  className,
}: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const reduce = useReducedMotion();
  const [added, setAdded] = useState(false);
  const resolvedVariant = variant ?? inferVariant(product);
  const badgeValue = normalizeBadge(product, badge);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: image ?? product.image,
      emoji: product.emoji,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  const isBurger = resolvedVariant === "burger";
  const cardBg = isBurger ? "bg-brand-yellow" : "bg-brand-cream";
  const priceColor = isBurger ? "orange" : badgeValue === "premium" ? "green" : "yellow";
  const badgeColor = badgeValue === "premium" ? "green" : badgeValue === "spicy" ? "brown" : "orange";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { x: -4, y: -4 }}
      className={[
        "group relative flex min-h-full flex-col overflow-hidden rounded-[18px] border-[3px] border-brand-brown shadow-green transition-shadow duration-300 hover:shadow-green-lg",
        cardBg,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-brand-brown bg-brand-yellow">
        {image ?? product.image ? (
          <Image
            src={(image ?? product.image) as string}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-yellow px-6 text-center font-display text-5xl uppercase text-brand-brown">
            {fallbackLabel[product.emoji ?? ""] ?? product.name}
          </div>
        )}

        <div className="absolute right-3 top-3">
          <PriceBadge price={product.price} color={priceColor} rotation={index % 2 ? 5 : -5} />
        </div>

        {badgeValue && (
          <div className="absolute left-3 top-3">
            <StickerPill color={badgeColor} rotation={-4} icon={<Sparkles size={12} />}>
              {product.badge}
            </StickerPill>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-3xl uppercase leading-none text-brand-brown">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-brand-brown/72">
            {product.description}
          </p>
        )}
        <div className="mt-auto pt-5">
          <StreetButton
            onClick={handleAdd}
            variant={added ? "green" : "brown"}
            size="sm"
            fullWidth
            icon={added ? <Check size={16} /> : <Plus size={16} />}
            ariaLabel={`Ajouter ${product.name} au panier`}
          >
            {added ? "Ajouté" : "Ajouter"}
          </StreetButton>
        </div>
      </div>
    </motion.article>
  );
}
