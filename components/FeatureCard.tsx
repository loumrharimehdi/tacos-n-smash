import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
  tone?: "green" | "orange";
};

export default function FeatureCard({
  icon,
  title,
  text,
  tone = "green",
}: FeatureCardProps) {
  return (
    <div className="rounded-[18px] border-[3px] border-brand-brown bg-brand-cream p-5 shadow-green">
      <div
        className={[
          "flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-brown text-brand-cream shadow-hard",
          tone === "green" ? "bg-brand-green" : "bg-brand-orange",
        ].join(" ")}
      >
        {icon}
      </div>
      <h3 className="mt-4 font-display text-3xl uppercase leading-none text-brand-brown">
        {title}
      </h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-brand-brown/72">
        {text}
      </p>
    </div>
  );
}
