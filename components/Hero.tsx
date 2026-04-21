"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import GoogleBadge from "@/components/GoogleBadge";
import ScrollIndicator from "@/components/ScrollIndicator";
import GrainOverlay from "@/components/GrainOverlay";

const TITLE_LINE_1 = "TACOS";
const TITLE_LINE_2 = "& SMASH";

function TitleLine({
  text,
  baseDelay = 0,
}: {
  text: string;
  baseDelay?: number;
}) {
  return (
    <span className="block">
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          initial={{ opacity: 0, y: 60, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: baseDelay + i * 0.05,
            duration: 0.6,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-900"
    >
      {/* BG image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/tacos-mythique.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Dark overlay stack */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/60 to-ink-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/30 to-ink-900/80" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,215,0,0.18), transparent 60%)",
        }}
      />
      <GrainOverlay opacity={0.5} />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="chip-yellow mb-6"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-yellow" />
          Meknès · Ouvert jusqu'à minuit
        </motion.div>

        <h1 className="font-display font-normal uppercase leading-[0.85] tracking-[0.01em] text-white [font-size:clamp(4rem,14vw,10rem)]">
          <TitleLine text={TITLE_LINE_1} baseDelay={0.3} />
          <span className="block text-brand-yellow text-glow-yellow">
            <TitleLine text={TITLE_LINE_2} baseDelay={0.7} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-6 text-sm font-medium uppercase tracking-[0.4em] text-white/70 sm:text-base"
        >
          Original French Food <span className="text-brand-yellow">•</span> Meknès
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.5 }}
          className="mt-8"
        >
          <GoogleBadge />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/order"
            className="btn-yellow group text-base sm:text-lg"
          >
            <ShoppingBag
              size={18}
              className="transition-transform group-hover:-rotate-6"
            />
            Commander
          </Link>
          <Link href="/menu" className="btn-outline text-base sm:text-lg">
            <UtensilsCrossed size={18} />
            Voir le menu
          </Link>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
