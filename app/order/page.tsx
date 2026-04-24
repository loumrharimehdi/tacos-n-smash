import CartSummary from "@/components/CartSummary";
import OrderForm from "@/components/OrderForm";
import StickerPill from "@/components/ui/StickerPill";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Commander · Tacos & Smash Meknès",
  description:
    "Passe ta commande chez Tacos & Smash Meknès : livraison sans contact ou sur place, confirmation WhatsApp et paiement cash.",
  path: "/order",
});

export default function OrderPage() {
  return (
    <div className="pt-20">
      <section className="yellow-paper border-b-[3px] border-brand-brown px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <StickerPill color="green" rotation={-2}>
            Dernière étape
          </StickerPill>
          <h1 className="mx-auto mt-6 max-w-5xl font-display text-hero-sm uppercase leading-none text-brand-brown sm:text-hero">
            On te livre
            <br />
            <span className="poster-title-orange inline-block">où ?</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-7 text-brand-brown/74">
            Commande en ligne, confirmation sur WhatsApp et paiement cash à la livraison.
          </p>
        </div>
      </section>

      <section className="food-paper px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_410px]">
          <OrderForm />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <CartSummary showCheckout={false} title="Récap commande" />
          </div>
        </div>
      </section>
    </div>
  );
}
