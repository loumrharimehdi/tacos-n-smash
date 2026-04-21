import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { RESTAURANT } from "@/lib/menu";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="text-2xl font-black uppercase tracking-wider text-brand-yellow">
            Tacos & Smash
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/60">
            {RESTAURANT.tagline}
          </div>
          <p className="mt-4 text-sm text-white/70">
            Street food française à {RESTAURANT.city}. Commande en ligne, livraison sans
            contact, cash à la livraison.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-yellow" />
              <span>{RESTAURANT.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-brand-yellow" />
              <a href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`} className="hover:text-brand-yellow">
                {RESTAURANT.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-brand-yellow" />
              <span>{RESTAURANT.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Suivez-nous
          </h4>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-brand-yellow hover:text-brand-yellow"
            >
              <Instagram size={18} />
            </a>
            <a
              href={RESTAURANT.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-brand-yellow hover:text-brand-yellow"
            >
              <Facebook size={18} />
            </a>
            <a
              href={RESTAURANT.glovo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ffc244] px-3 py-2 text-xs font-bold text-black hover:brightness-95"
            >
              Glovo →
            </a>
          </div>
          <div className="mt-4">
            <Link href="/order" className="btn-yellow text-sm">
              Commander maintenant
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Tacos & Smash — Meknès. Tous droits réservés.</p>
          <p>Original French Food · ⭐ 4,8/5 sur Google</p>
        </div>
      </div>
    </footer>
  );
}
