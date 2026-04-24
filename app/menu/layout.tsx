import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "Menu · Tacos & Smash Meknès — Carte complète",
  description:
    "Découvrez la carte Tacos & Smash : tacos français, smash burgers, menus family, suppléments, boissons et desserts à Meknès.",
  path: "/menu",
});

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", path: "/" },
          { name: "Menu", path: "/menu" },
        ]}
      />
      {children}
    </>
  );
}
