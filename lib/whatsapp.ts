import type { CartItem, OrderMode } from "./types";
import { RESTAURANT } from "./menu";

export type OrderPayload = {
  name: string;
  phone: string;
  address: string;
  mode: OrderMode;
  notes?: string;
  items: CartItem[];
  total: number;
};

export function buildOrderMessage(order: OrderPayload): string {
  const lines = [
    "🌮 *NOUVELLE COMMANDE — Tacos & Smash*",
    "",
    `👤 Nom : ${order.name}`,
    `📱 Téléphone : ${order.phone}`,
    `📍 Adresse : ${order.address || "—"}`,
    `🚚 Mode : ${order.mode === "livraison" ? "Livraison" : "Sur place / À emporter"}`,
    "",
    "🛒 *Commande :*",
  ];

  for (const item of order.items) {
    const line = `• ${item.name} x${item.quantity} — ${item.price * item.quantity} DH`;
    lines.push(line);
    if (item.options) {
      lines.push(`   └ ${item.options}`);
    }
  }

  lines.push("");
  lines.push(`💰 *Total : ${order.total} DH*`);
  lines.push("💳 Paiement : Cash à la livraison");

  if (order.notes && order.notes.trim()) {
    lines.push("");
    lines.push(`📝 Notes : ${order.notes.trim()}`);
  }

  return lines.join("\n");
}

export function getWhatsappNumber(): string {
  const raw =
    process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") ||
    RESTAURANT.whatsapp.replace(/\D/g, "");
  return raw;
}

export function buildWhatsappUrl(message: string): string {
  const number = getWhatsappNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
