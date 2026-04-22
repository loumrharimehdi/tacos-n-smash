import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Confirmation · Tacos & Smash Meknès",
  description: "Commande confirmée.",
  path: "/confirmation",
  noindex: true,
});

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
