import type { ReactNode } from "react";
import StickerPill from "@/components/ui/StickerPill";

type SectionHeaderProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  variant?: "yellow" | "cream" | "green" | "orange";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  variant = "yellow",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const pillColor = variant === "orange" ? "brown" : variant === "green" ? "orange" : "green";

  return (
    <div
      className={[
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <StickerPill color={pillColor} rotation={centered ? -1 : -2}>
        {eyebrow}
      </StickerPill>
      <h2
        className={[
          "mt-5 font-display text-section-sm uppercase sm:text-section",
          variant === "green" ? "text-brand-yellow" : "text-brand-brown",
        ].join(" ")}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={[
            "mt-3 max-w-2xl text-base font-semibold leading-7",
            centered ? "mx-auto" : "",
            variant === "green" ? "text-brand-cream/86" : "text-brand-brown/72",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
