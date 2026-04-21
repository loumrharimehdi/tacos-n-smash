"use client";

import { useEffect, useState } from "react";
import { Lock, LogOut, RefreshCw, Trash2 } from "lucide-react";
import { RESTAURANT } from "@/lib/menu";

type StoredOrder = {
  id: string;
  name: string;
  phone: string;
  address: string;
  mode: "livraison" | "surplace";
  notes?: string;
  total: number;
  items: { name: string; price: number; quantity: number; options?: string }[];
  createdAt: string;
};

const ADMIN_STORAGE_KEY = "tacos-n-smash-admin-orders";
const AUTH_STORAGE_KEY = "tacos-n-smash-admin-auth";
// Demo password — replace with NextAuth once Supabase is configured.
const DEMO_PASSWORD = "tacos2026";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "1") {
      setAuthed(true);
      loadOrders();
    }
  }, []);

  function loadOrders() {
    try {
      const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
      setOrders(raw ? JSON.parse(raw) : []);
    } catch {
      setOrders([]);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, "1");
      setAuthed(true);
      setError(null);
      loadOrders();
    } else {
      setError("Mot de passe incorrect.");
    }
  }

  function handleLogout() {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthed(false);
    setPassword("");
  }

  function clearAll() {
    if (!confirm("Supprimer toutes les commandes enregistrées localement ?")) return;
    window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    setOrders([]);
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
        <div className="w-full">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
            <Lock size={22} />
          </div>
          <h1 className="mt-4 text-center text-3xl font-black">Admin</h1>
          <p className="mt-2 text-center text-sm text-white/60">
            Tableau de bord protégé. Entre le mot de passe admin pour continuer.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="input"
              autoFocus
            />
            {error && (
              <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <button type="submit" className="btn-yellow w-full">
              Se connecter
            </button>
          </form>

          <p className="mt-8 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/50">
            ℹ️ Version démo — l'authentification NextAuth + Supabase sera branchée
            une fois les credentials configurés dans <code>.env</code>. Les
            commandes sont stockées localement dans le navigateur.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Commandes</h1>
          <p className="text-sm text-white/60">
            {orders.length} commande{orders.length > 1 ? "s" : ""} · stockage
            local (démo).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={loadOrders} className="btn-outline text-sm">
            <RefreshCw size={14} /> Actualiser
          </button>
          <button onClick={clearAll} className="btn-outline text-sm hover:border-red-400/50 hover:text-red-300">
            <Trash2 size={14} /> Tout vider
          </button>
          <button onClick={handleLogout} className="btn-outline text-sm">
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card mt-8 p-10 text-center text-white/60">
          Aucune commande enregistrée pour l'instant.
          <div className="mt-2 text-xs text-white/40">
            Les commandes envoyées depuis le site via WhatsApp apparaîtront ici.
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {orders.map((o) => (
            <details
              key={o.id}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 open:bg-white/[0.07]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{o.name}</span>
                    <span className="chip">
                      {o.mode === "livraison" ? "🚚 Livraison" : "🏪 Sur place"}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-white/60">
                    {new Date(o.createdAt).toLocaleString("fr-FR")} · {o.phone}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-brand-yellow">
                    {o.total} DH
                  </div>
                  <div className="text-xs text-white/50">
                    {o.items.reduce((s, i) => s + i.quantity, 0)} articles
                  </div>
                </div>
              </summary>

              <div className="mt-4 space-y-2 border-t border-white/10 pt-3 text-sm">
                {o.mode === "livraison" && o.address && (
                  <div>
                    <span className="text-white/50">Adresse : </span>
                    {o.address}
                  </div>
                )}
                {o.notes && (
                  <div>
                    <span className="text-white/50">Notes : </span>
                    {o.notes}
                  </div>
                )}
                <ul className="mt-2 divide-y divide-white/5">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex items-start justify-between py-2">
                      <div>
                        <div>
                          {it.name}{" "}
                          <span className="text-white/50">× {it.quantity}</span>
                        </div>
                        {it.options && (
                          <div className="text-xs text-white/50">{it.options}</div>
                        )}
                      </div>
                      <div className="font-semibold text-brand-yellow">
                        {it.price * it.quantity} DH
                      </div>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${o.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-green mt-3 text-sm"
                >
                  💬 Contacter le client sur WhatsApp
                </a>
              </div>
            </details>
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-white/40">
        Tacos & Smash — {RESTAURANT.city} · admin interne
      </p>
    </div>
  );
}
