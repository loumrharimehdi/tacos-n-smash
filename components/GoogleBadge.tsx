import { Star } from "lucide-react";
import { RESTAURANT } from "@/lib/menu";

export default function GoogleBadge({ compact = false }: { compact?: boolean }) {
  const stars = Array.from({ length: 5 });
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur ${
        compact ? "px-3 py-1.5" : "px-4 py-2"
      }`}
    >
      <span className="text-base font-bold text-white">G</span>
      <div className="flex items-center gap-0.5 text-brand-yellow">
        {stars.map((_, i) => (
          <Star
            key={i}
            size={compact ? 12 : 14}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </div>
      <span className={`font-bold text-white ${compact ? "text-sm" : "text-base"}`}>
        {RESTAURANT.googleRating.toFixed(1).replace(".", ",")}
      </span>
      <span className={`text-white/60 ${compact ? "text-xs" : "text-sm"}`}>
        ({RESTAURANT.googleReviews} avis)
      </span>
    </div>
  );
}
