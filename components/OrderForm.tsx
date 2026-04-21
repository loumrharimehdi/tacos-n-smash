"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Truck, Store, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/store";
import { buildOrderMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import type { OrderMode } from "@/lib/types";

type FormState = {
  name: string;
  phone: string;
  address: string;
  mode: OrderMode;
  notes: string;
};

const ADMIN_STORAGE_KEY = "tacos-n-smash-admin-orders";

function saveLocalOrder(payload: any) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift({ ...payload, id: `ord-${Date.now()}` });
    window.localStorage.setItem(
      ADMIN_STORAGE_KEY,
      JSON.stringify(arr.slice(0, 100))
    );
  } catch {}
}

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prefill from prior session
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("tacos-n-smash-customer");
      if (saved) {
        const data = JSON.parse(saved);
        setForm((f) => ({ ...f, ...data }));
      }
    } catch {}
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Ton nom est requis.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8)
      return "Numéro de téléphone invalide.";
    if (form.mode === "livraison" && !form.address.trim())
      return "Adresse requise pour la livraison.";
    if (items.length === 0) return "Ton panier est vide.";
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
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

    // Save customer info for next time
    try {
      window.localStorage.setItem(
        "tacos-n-smash-customer",
        JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          address: payload.address,
        })
      );
    } catch {}

    // Save to local admin log (demo — real DB comes later)
    saveLocalOrder({ ...payload, createdAt: new Date().toISOString() });

    // Persist last order for confirmation page
    try {
      window.sessionStorage.setItem(
        "tacos-n-smash-last-order",
        JSON.stringify({ ...payload, createdAt: new Date().toISOString() })
      );
    } catch {}

    const message = buildOrderMessage(payload);
    const url = buildWhatsappUrl(message);

    // Open WhatsApp (new tab) — the window.open call must be sync with the click
    window.open(url, "_blank", "noopener,noreferrer");

    clear();
    router.push("/confirmation");
  }

  if (hydrated && items.length === 0) {
    return null; // Let parent page show empty cart state
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/60">
            Nom complet
          </label>
          <input
            className="input"
            placeholder="Ton nom"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/60">
            Téléphone
          </label>
          <input
            className="input"
            placeholder="06 00 00 00 00"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">
          Mode de commande
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => update("mode", "livraison")}
            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
              form.mode === "livraison"
                ? "border-brand-yellow bg-brand-yellow/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <Truck className="shrink-0 text-brand-yellow" />
            <div>
              <div className="font-bold">Livraison</div>
              <div className="text-xs text-white/60">Sans contact · Cash</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => update("mode", "surplace")}
            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
              form.mode === "surplace"
                ? "border-brand-yellow bg-brand-yellow/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <Store className="shrink-0 text-brand-yellow" />
            <div>
              <div className="font-bold">Sur place / À emporter</div>
              <div className="text-xs text-white/60">4 Rue El Amal</div>
            </div>
          </button>
        </div>
      </div>

      {form.mode === "livraison" && (
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/60">
            Adresse de livraison
          </label>
          <input
            className="input"
            placeholder="Rue, quartier, ville…"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            required
          />
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/60">
          Notes (optionnel)
        </label>
        <textarea
          className="input min-h-[80px] resize-y"
          placeholder="Allergies, instructions pour le livreur, etc."
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-white/60">Paiement</span>
          <span className="font-semibold">💵 Cash à la livraison</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-white/60">Total</span>
          <span className="text-2xl font-black text-brand-yellow">{total} DH</span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || items.length === 0}
        className="btn-yellow w-full text-base"
      >
        <MessageCircle size={18} />
        Envoyer la commande par WhatsApp
      </button>

      <p className="text-center text-xs text-white/50">
        Ta commande sera envoyée par WhatsApp au restaurant. L'équipe confirmera
        par message.
      </p>
    </form>
  );
}
