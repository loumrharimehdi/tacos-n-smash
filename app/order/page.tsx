import Cart from "@/components/Cart";
import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Commander · Tacos & Smash",
  description:
    "Passe ta commande chez Tacos & Smash — livraison sans contact ou à emporter. Cash à la livraison.",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <div className="chip mb-3">🛒 Commande</div>
        <h1 className="section-title">Finalise ta commande</h1>
        <p className="mt-3 max-w-xl text-white/70">
          Vérifie ton panier, laisse tes infos et envoie la commande au restaurant
          par WhatsApp. Paiement cash à la livraison.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <OrderForm />
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Cart />
        </aside>
      </div>
    </div>
  );
}
