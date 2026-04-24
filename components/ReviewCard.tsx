import { Star } from "lucide-react";

type ReviewCardProps = {
  quote: string;
  author: string;
  tone?: "yellow" | "cream";
};

export default function ReviewCard({
  quote,
  author,
  tone = "cream",
}: ReviewCardProps) {
  return (
    <figure
      className={[
        "rounded-[16px] border-[3px] border-brand-brown p-5 shadow-orange",
        tone === "yellow" ? "bg-brand-yellow" : "bg-brand-cream",
      ].join(" ")}
    >
      <div className="flex gap-1 text-brand-orange" aria-label="5 étoiles">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-3 text-sm font-bold leading-6 text-brand-brown">
        “{quote}”
      </blockquote>
      <figcaption className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-brand-green">
        {author}
      </figcaption>
    </figure>
  );
}
