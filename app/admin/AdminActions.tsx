"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";

export default function AdminActions() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => start(() => router.refresh())}
      className="btn-outline text-sm"
      disabled={pending}
    >
      <RefreshCw size={14} className={pending ? "animate-spin" : ""} /> Actualiser
    </button>
  );
}
