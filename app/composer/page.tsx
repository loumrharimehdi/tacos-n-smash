import TacosConfigurator from "@/components/TacosConfigurator";
import { buildMetadata } from "@/lib/seo";
import StickerPill from "@/components/ui/StickerPill";

export const metadata = buildMetadata({
  title: "Composer mon Tacos · Tacos & Smash Meknès",
  description:
    "Compose ton tacos sur mesure à Meknès : taille, viandes, sauce, sauce fromagère maison incluse et confirmation WhatsApp.",
  path: "/composer",
});

export default function ComposerPage() {
  return (
    <div className="pt-20">
      <section className="yellow-paper border-b-[3px] border-brand-brown px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <StickerPill color="green" rotation={-2}>
            Crée ton tacos
          </StickerPill>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-hero-sm uppercase leading-none text-brand-brown sm:text-hero">
            Compose
            <br />
            <span className="poster-title-orange inline-block">ta bête</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-7 text-brand-brown/74">
            Choisis la taille, les viandes et la sauce. On s'occupe du reste :
            sauce fromagère maison, frites et générosité.
          </p>
        </div>
      </section>

      <section className="food-paper px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <TacosConfigurator />
        </div>
      </section>
    </div>
  );
}
