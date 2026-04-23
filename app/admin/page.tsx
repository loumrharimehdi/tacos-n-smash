import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { LogOut } from "lucide-react";
import { authOptions, isAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RESTAURANT } from "@/lib/menu";
import AdminActions from "./AdminActions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!isAdminEmail(session?.user?.email)) {
    redirect("/admin/signin");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { items: true },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pt-28 sm:px-6 sm:pt-32">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Commandes</h1>
          <p className="text-sm text-brand-brown/60">
            {orders.length} commande{orders.length > 1 ? "s" : ""} · connecté en{" "}
            <span className="text-brand-brown/80">{session?.user?.email}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminActions />
          <Link href="/api/auth/signout" className="btn-outline text-sm">
            <LogOut size={14} /> Déconnexion
          </Link>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card mt-8 p-10 text-center text-brand-brown/60">
          Aucune commande pour l'instant.
          <div className="mt-2 text-xs text-brand-brown/60">
            Les commandes envoyées depuis le site apparaîtront ici.
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {orders.map((o) => (
            <details
              key={o.id}
              className="group rounded-2xl border border-brand-brown/10 bg-brand-cream/5 p-4 open:bg-white/[0.07]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{o.name}</span>
                    <span className="chip">
                      {o.mode === "livraison" ? "🚚 Livraison" : "🏪 Sur place"}
                    </span>
                    <span className="chip">{o.status}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-brand-brown/60">
                    {new Date(o.createdAt).toLocaleString("fr-FR")} · {o.phone}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-brand-green">
                    {o.total} DH
                  </div>
                  <div className="text-xs text-brand-brown/65">
                    {o.items.reduce((s, i) => s + i.quantity, 0)} articles
                  </div>
                </div>
              </summary>

              <div className="mt-4 space-y-2 border-t border-brand-brown/10 pt-3 text-sm">
                {o.mode === "livraison" && o.address && (
                  <div>
                    <span className="text-brand-brown/65">Adresse : </span>
                    {o.address}
                  </div>
                )}
                {o.notes && (
                  <div>
                    <span className="text-brand-brown/65">Notes : </span>
                    {o.notes}
                  </div>
                )}
                <ul className="mt-2 divide-y divide-brand-brown/5">
                  {o.items.map((it) => (
                    <li key={it.id} className="flex items-start justify-between py-2">
                      <div>
                        <div>
                          {it.name}{" "}
                          <span className="text-brand-brown/65">× {it.quantity}</span>
                        </div>
                        {it.options && (
                          <div className="text-xs text-brand-brown/65">{it.options}</div>
                        )}
                      </div>
                      <div className="font-semibold text-brand-green">
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

      <p className="mt-10 text-center text-xs text-brand-brown/60">
        Tacos & Smash — {RESTAURANT.city} · admin interne
      </p>
    </div>
  );
}
