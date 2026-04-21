import TacosConfigurator from "@/components/TacosConfigurator";

export const metadata = {
  title: "Composer mon Tacos · Tacos & Smash",
  description:
    "Compose ton tacos sur mesure : taille, viandes, sauce. Sauce fromagère maison incluse, frites dedans.",
};

export default function ComposerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <div className="chip mb-3">🌮 Configurateur</div>
        <h1 className="section-title">Compose ton tacos</h1>
        <p className="mt-3 max-w-xl text-white/70">
          Choisis ta taille, ta (ou tes) viande(s) et ta sauce. Sauce fromagère
          maison et frites incluses.
        </p>
      </div>

      <TacosConfigurator />
    </div>
  );
}
