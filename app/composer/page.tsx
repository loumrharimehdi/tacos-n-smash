import TacosConfigurator from "@/components/TacosConfigurator";

export const metadata = {
  title: "Composer mon Tacos · Tacos & Smash",
  description:
    "Compose ton tacos sur mesure : taille, viandes, sauce. Sauce fromagère maison incluse, frites dedans.",
};

export default function ComposerPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="relative overflow-hidden border-b border-white/10 bg-ink-900">
        <div className="absolute inset-0 bg-radial-spot" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="kicker">🌮 Configurateur</div>
          <h1 className="mt-4 section-title">
            Compose ton <span className="text-brand-yellow">tacos</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/60">
            Choisis ta taille, ta (ou tes) viande(s) et ta sauce. Sauce fromagère
            maison et frites incluses.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <TacosConfigurator />
      </div>
    </div>
  );
}
