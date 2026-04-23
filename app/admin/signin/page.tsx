"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Lock } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const res = await signIn("email", {
      email: email.trim(),
      redirect: false,
      callbackUrl: "/admin",
    });
    setStatus(res?.error ? "error" : "sent");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 pt-20 sm:pt-24">
      <div className="w-full">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white">
          <Lock size={22} />
        </div>
        <h1 className="mt-4 text-center text-3xl font-black">Admin</h1>
        <p className="mt-2 text-center text-sm text-brand-brown/60">
          Entre ton email admin pour recevoir un lien de connexion.
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            ✅ Un lien de connexion a été envoyé à <b>{email}</b>. Vérifie ta boîte
            mail (et les spams).
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemple.com"
              className="input"
              autoFocus
              required
            />
            {status === "error" && (
              <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
                Impossible d'envoyer le lien. Réessaie.
              </div>
            )}
            <button
              type="submit"
              className="btn-yellow w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Envoi…" : "Recevoir le lien"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
