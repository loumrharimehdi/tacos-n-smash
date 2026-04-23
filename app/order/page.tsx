import Cart from "@/components/Cart";
import OrderForm from "@/components/OrderForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Commander · Tacos & Smash Meknès",
  description:
    "Passe ta commande chez Tacos & Smash Meknès — livraison sans contact ou à emporter. Cash à la livraison.",
  path: "/order",
});

export default function OrderPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="relative overflow-hidden border-b border-brand-brown/10 bg-brand-yellow">
        <div className="absolute inset-0 bg-radial-spot" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="kicker">🛒 Finalise ta commande</div>
          <h1 className="mt-4 section-title">
            Dernière <span className="text-brand-green">étape</span>
          </h1>
          <p className="mt-4 max-w-xl text-brand-brown/60">
            Vérifie ton panier, laisse tes infos et envoie la commande au
            restaurant par WhatsApp. Paiement cash à la livraison.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1fr_420px]">
        <div>
          <OrderForm />
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Cart />
        </aside>
      </div>
    </div>
  );
}
