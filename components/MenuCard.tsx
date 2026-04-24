import ProductCard from "@/components/ProductCard";
import type { MenuItem } from "@/lib/types";

export default function MenuCard({
  item,
  index = 0,
}: {
  item: MenuItem;
  index?: number;
}) {
  return <ProductCard product={item} index={index} />;
}
