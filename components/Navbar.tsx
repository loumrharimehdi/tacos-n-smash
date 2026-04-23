"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/store";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/composer", label: "Composer" },
  { href: "/order", label: "Commander" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const count = useCart((s) => s.count());
  const hydrated = useCart((s) => s.hydrated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !scrolled && !open;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-brand-yellow"
          : "border-b-2 border-brand-brown bg-brand-yellow shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-brand-cream ring-2 ring-brand-brown transition-transform group-hover:scale-105 sm:h-11 sm:w-11">
            <Image
              src="/images/logo.png"
              alt="Tacos & Smash"
              fill
              sizes="44px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl tracking-wider text-brand-brown sm:text-2xl">
              Tacos & Smash
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.3em] text-brand-brown/65 sm:text-[10px]">
              Original French Food
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active
                    ? "text-brand-green"
                    : "text-brand-brown hover:text-brand-green"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full border-2 border-brand-green bg-brand-cream"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/order"
            aria-label="Panier"
            className="relative inline-flex h-11 items-center gap-2 rounded-full bg-brand-orange px-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-orange-dark"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Panier</span>
            <AnimatePresence>
              {hydrated && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0, y: -4 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-green px-1.5 text-[11px] font-black text-white ring-2 ring-brand-yellow"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-brown bg-brand-cream text-brand-brown md:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-in */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-brand-brown/20 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-[calc(100vh-4rem)] w-full max-w-sm flex-col gap-2 border-l-2 border-brand-brown bg-brand-yellow p-6"
            >
              {NAV_LINKS.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl border-2 px-5 py-4 font-display text-2xl uppercase tracking-wider transition-colors ${
                        active
                          ? "border-brand-brown bg-brand-green text-white"
                          : "border-brand-brown bg-brand-cream text-brand-brown hover:bg-brand-orange hover:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-auto rounded-2xl border-2 border-brand-brown bg-brand-cream p-4 text-sm text-brand-brown"
              >
                <div className="font-semibold text-brand-brown">Tacos & Smash</div>
                <div className="mt-1 text-xs">
                  4 Rue El Amal, Meknès · Ouvert jusqu'à minuit
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
