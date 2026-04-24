"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b-[3px] border-brand-brown bg-brand-yellow transition-shadow",
        scrolled ? "shadow-hard" : "",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Tacos & Smash accueil">
          <span className="relative h-14 w-14 shrink-0 rounded-full border-[3px] border-brand-brown bg-brand-cream shadow-hard transition-transform group-hover:-translate-y-0.5">
            <Image src="/images/logo.png" alt="Logo Tacos & Smash" fill sizes="56px" className="object-contain p-1" priority />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-3xl uppercase text-brand-brown">Tacos & Smash</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-brand-green">
              Original French Food
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "relative rounded-full px-4 py-2 text-sm font-black uppercase tracking-[0.08em] transition-colors",
                  active ? "text-brand-green" : "text-brand-brown hover:text-brand-green",
                ].join(" ")}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-1 h-1 rounded-full bg-brand-green"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/order"
            className="relative inline-flex min-h-12 items-center gap-2 rounded-full border-[3px] border-brand-brown bg-brand-orange px-4 font-display text-xl uppercase leading-none text-brand-cream shadow-hard transition-transform hover:-translate-y-0.5 sm:px-5"
            aria-label={`Panier ${hydrated ? count : 0} article${count > 1 ? "s" : ""}`}
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Panier</span>
            <span>· {hydrated ? count : 0}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-brand-brown bg-brand-cream text-brand-brown shadow-hard md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={21} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-20 z-40 bg-brand-brown/40 md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-3 mt-3 rounded-[18px] border-[3px] border-brand-brown bg-brand-yellow p-4 shadow-hard"
              aria-label="Navigation mobile"
            >
              <div className="grid gap-3">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={[
                        "rounded-[14px] border-[3px] border-brand-brown px-5 py-4 font-display text-4xl uppercase leading-none shadow-hard",
                        active
                          ? "bg-brand-green text-brand-yellow"
                          : "bg-brand-cream text-brand-brown",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
