import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { RESTAURANT } from "@/lib/menu";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900">
      <div className="absolute inset-x-0 top-0 divider-gradient" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        {/* Brand */}
        <div>
          <div className="font-display text-4xl uppercase tracking-wider text-white sm:text-5xl">
            Tacos & Smash
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-yellow">
            Original French Food
          </div>
          <p className="mt-6 max-w-sm text-sm text-white/55">
            Street food française à {RESTAURANT.city}. Tacos, Smash Burgers,
            sauce fromagère maison. Commande en ligne, livraison sans contact,
            cash à la livraison.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow"
            >
              <Instagram size={16} />
            </a>
            <a
              href={RESTAURANT.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-brand-yellow hover:text-brand-yellow"
            >
              <Facebook size={16} />
            </a>
            <a
              href={RESTAURANT.glovo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#ffc244] px-4 py-2 text-xs font-black uppercase tracking-wider text-black hover:brightness-95"
            >
              Glovo <ArrowRight size={12} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="kicker">Contact</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow">
                <MapPin size={15} />
              </div>
              <div>
                <div className="font-semibold text-white">{RESTAURANT.address}</div>
                <div className="text-xs text-white/65">VCPJ+44 · Meknès</div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow">
                <Phone size={15} />
              </div>
              <a
                href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
                className="font-semibold text-white hover:text-brand-yellow"
              >
                {RESTAURANT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow">
                <Clock size={15} />
              </div>
              <span className="text-white/80">{RESTAURANT.hours}</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="kicker">Menu</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: "/", label: "Accueil" },
              { href: "/menu", label: "Carte complète" },
              { href: "/composer", label: "Composer mon tacos" },
              { href: "/order", label: "Commander" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 text-white/70 transition-colors hover:text-brand-yellow"
                >
                  <span>{l.label}</span>
                  <ArrowRight
                    size={12}
                    className="opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link href="/order" className="btn-yellow text-sm">
              Commander <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-ink-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Tacos & Smash — Meknès. Tous droits réservés.</p>
          <p>
            ⭐ {RESTAURANT.googleRating.toFixed(1).replace(".", ",")} ·{" "}
            {RESTAURANT.googleReviews} avis Google
          </p>
        </div>
      </div>
    </footer>
  );
}
