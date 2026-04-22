import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin · Tacos & Smash",
  description: "Dashboard administration.",
  path: "/admin",
  noindex: true,
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
