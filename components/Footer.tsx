"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { RESTAURANT } from "@/lib/menu";
import StreetButton from "@/components/ui/StreetButton";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-brand-brown bg-brand-brown text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full border-[3px] border-brand-yellow bg-brand-cream shadow-green">
              <Image src="/images/logo.png" alt="Tacos & Smash" fill sizes="64px" className="object-contain p-1" />
            </div>
            <div>
              <div className="font-display text-4xl uppercase leading-none text-brand-yellow">
                Tacos & Smash
              </div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-brand-cream/75">
                Original French Food
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm font-semibold leading-7 text-brand-cream/78">
            Street food française à Meknès : tacos généreux, smash burgers, sauce
            fromagère maison, livraison et confirmation WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={RESTAURANT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-yellow bg-brand-yellow text-brand-brown">
              <Instagram size={17} />
            </a>
            <a href={RESTAURANT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-yellow bg-brand-yellow text-brand-brown">
              <Facebook size={17} />
            </a>
            <a href={RESTAURANT.glovo} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-brand-yellow bg-brand-cream px-4 text-sm font-black uppercase tracking-[0.08em] text-brand-brown">
              Glovo <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-3xl uppercase text-brand-yellow">Contact</h3>
          <ul className="mt-4 space-y-4 text-sm font-semibold leading-6 text-brand-cream/84">
            <li className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-brand-yellow" size={18} />
              <span>{RESTAURANT.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 shrink-0 text-brand-yellow" size={18} />
              <a href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`} className="hover:text-brand-yellow">
                {RESTAURANT.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 shrink-0 text-brand-yellow" size={18} />
              <span>{RESTAURANT.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-3xl uppercase text-brand-yellow">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-brand-cream/84">
            {[
              { href: "/", label: "Accueil" },
              { href: "/menu", label: "Menu complet" },
              { href: "/composer", label: "Composer mon tacos" },
              { href: "/order", label: "Commander" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex items-center gap-2 hover:text-brand-yellow">
                  {link.label} <ArrowRight size={13} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-3xl uppercase text-brand-yellow">Commander</h3>
          <p className="mt-4 text-sm font-semibold leading-6 text-brand-cream/78">
            Panier en ligne, validation rapide, paiement cash à la livraison.
          </p>
          <div className="mt-5">
            <StreetButton href="/order" variant="primary" icon={<ArrowRight size={18} />}>
              Commander
            </StreetButton>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-brand-yellow/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs font-bold text-brand-cream/62 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Tacos & Smash — Meknès. Tous droits réservés.</p>
          <p>4,8 · 220 avis Google · 97% Glovo</p>
        </div>
      </div>
    </footer>
  );
}
