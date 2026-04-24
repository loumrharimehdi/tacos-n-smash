"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, MapPin, MessageCircle, ShieldCheck, Store, Truck, Wallet } from "lucide-react";
import { useCart } from "@/lib/store";
import { buildOrderMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import type { OrderMode } from "@/lib/types";
import StreetButton from "@/components/ui/StreetButton";
import StickerPill from "@/components/ui/StickerPill";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

type FormState = {
  name: string;
  phone: string;
  address: string;
  mode: OrderMode;
  notes: string;
};

type FieldErrors = Partial<Record<keyof FormState | "cart", string>>;

export default function OrderForm() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const hydrated = useCart((s) => s.hydrated);
  const clear = useCart((s) => s.clear);

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    address: "",
    mode: "livraison",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("tacos-n-smash-customer");
      if (saved) {
        const data = JSON.parse(saved) as Partial<FormState>;
        setForm((current) => ({ ...current, ...data }));
      }
    } catch {}
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = "Le nom est requis.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8) {
      next.phone = "Téléphone invalide.";
    }
    if (form.mode === "livraison" && !form.address.trim()) {
      next.address = "Adresse requise pour la livraison.";
    }
    if (items.length === 0) next.cart = "Le panier est vide.";
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      mode: form.mode,
      notes: form.notes.trim() || undefined,
      items,
      total,
    };

    try {
      window.localStorage.setItem(
        "tacos-n-smash-customer",
        JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          address: payload.address,
        }),
      );
    } catch {}

    try {
      window.sessionStorage.removeItem("tacos-n-smash-persist-status");
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      })
        .then((res) => {
          const status = res.ok ? "ok" : res.status === 429 ? "rate_limited" : "failed";
          try {
            window.sessionStorage.setItem("tacos-n-smash-persist-status", status);
          } catch {}
          if (!res.ok) console.error("order persist failed", res.status);
        })
        .catch((error) => {
          try {
            window.sessionStorage.setItem("tacos-n-smash-persist-status", "failed");
          } catch {}
          console.error("order persist error", error);
        });
    } catch (error) {
      console.error("order persist threw", error);
    }

    try {
      window.sessionStorage.setItem(
        "tacos-n-smash-last-order",
        JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
      );
    } catch {}

    const url = buildWhatsappUrl(buildOrderMessage(payload));
    window.open(url, "_blank", "noopener,noreferrer");

    clear();
    router.push("/confirmation");
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="card p-8">
        <StickerPill color="orange" rotation={-2}>
          Panier vide
        </StickerPill>
        <h2 className="mt-5 font-display text-5xl uppercase leading-none text-brand-brown">
          Ajoute ton festin
        </h2>
        <p className="mt-3 max-w-lg text-sm font-bold leading-6 text-brand-brown/70">
          Choisis un tacos, un smash ou compose ton tacos avant de finaliser la commande.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <StreetButton href="/menu">Voir le menu</StreetButton>
          <StreetButton href="/composer" variant="secondary">Composer</StreetButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <StickerPill color="green" rotation={-2}>
            Vos informations
          </StickerPill>
          <h2 className="mt-5 font-display text-5xl uppercase leading-none text-brand-brown">
            Checkout rapide
          </h2>
        </div>
        <div className="rounded-full border-2 border-brand-brown bg-brand-yellow px-4 py-2 font-display text-3xl text-brand-orange shadow-hard">
          <AnimatedCounter value={total} suffix=" DH" />
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Nom complet"
          error={errors.name}
          input={
            <input
              id="name"
              className="input"
              placeholder="Ex : Yassine M."
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              autoComplete="name"
              required
            />
          }
        />
        <Field
          id="phone"
          label="Téléphone"
          error={errors.phone}
          input={
            <input
              id="phone"
              className="input"
              placeholder="06 12 34 56 78"
              type="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              autoComplete="tel"
              required
            />
          }
        />
      </div>

      <div className="mt-7">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-brand-brown/70">
          Mode de commande
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeButton
            active={form.mode === "livraison"}
            icon={<Truck size={24} />}
            title="Livraison"
            text="On vient jusqu'à vous"
            onClick={() => update("mode", "livraison")}
          />
          <ModeButton
            active={form.mode === "surplace"}
            icon={<Store size={24} />}
            title="Sur place"
            text="À emporter au restaurant"
            onClick={() => update("mode", "surplace")}
          />
        </div>
      </div>

      {form.mode === "livraison" && (
        <div className="mt-5">
          <Field
            id="address"
            label="Adresse de livraison"
            error={errors.address}
            input={
              <input
                id="address"
                className="input"
                placeholder="Ex : 4 Rue El Amal, Meknès"
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                autoComplete="street-address"
                required
              />
            }
          />
        </div>
      )}

      <div className="mt-5">
        <Field
          id="notes"
          label="Notes / Instructions"
          input={
            <textarea
              id="notes"
              className="input min-h-28 resize-y"
              placeholder="Ex : sans oignons, appeler à l'arrivée..."
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
            />
          }
        />
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Trust icon={<MapPin size={18} />} title="Meknès" text="Livraison locale" />
        <Trust icon={<Clock size={18} />} title="Minuit" text="Ouvert tard" />
        <Trust icon={<Wallet size={18} />} title="Cash" text="À la livraison" />
        <Trust icon={<ShieldCheck size={18} />} title="WhatsApp" text="Confirmation" />
      </div>

      {errors.cart && (
        <p className="mt-5 rounded-[14px] border-2 border-brand-brown bg-brand-orange p-3 text-sm font-black text-brand-cream">
          {errors.cart}
        </p>
      )}

      <div className="mt-7">
        <StreetButton
          type="submit"
          disabled={submitting || items.length === 0}
          fullWidth
          size="lg"
          icon={<MessageCircle size={21} />}
        >
          Confirmer sur WhatsApp
        </StreetButton>
        <p className="mt-3 text-center text-xs font-bold leading-5 text-brand-brown/65">
          Une fenêtre WhatsApp s'ouvre avec le message prérempli. Appuie sur envoyer pour transmettre la commande au restaurant.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  input,
  error,
}: {
  id: string;
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-brand-brown/70">
        {label}
      </label>
      {input}
      {error && <p className="mt-2 text-sm font-black text-brand-orange">{error}</p>}
    </div>
  );
}

function ModeButton({
  active,
  icon,
  title,
  text,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex min-h-24 items-center gap-4 rounded-[16px] border-[3px] border-brand-brown p-4 text-left shadow-hard transition-transform hover:-translate-y-0.5",
        active ? "bg-brand-green text-brand-yellow" : "bg-brand-cream text-brand-brown",
      ].join(" ")}
      aria-pressed={active}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-brown bg-brand-yellow text-brand-brown">
        {icon}
      </span>
      <span>
        <span className="block font-display text-3xl uppercase leading-none">{title}</span>
        <span className="mt-1 block text-sm font-bold">{text}</span>
      </span>
    </button>
  );
}

function Trust({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[14px] border-2 border-brand-brown bg-brand-yellow p-3 shadow-hard">
      <div className="flex items-center gap-2 text-brand-green">
        {icon}
        <span className="font-display text-2xl uppercase leading-none text-brand-brown">{title}</span>
      </div>
      <p className="mt-1 text-xs font-bold text-brand-brown/72">{text}</p>
    </div>
  );
}
