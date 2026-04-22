import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingItem = {
  name: string;
  price: number;
  quantity: number;
  options?: string | Record<string, unknown> | null;
};

type IncomingOrder = {
  name: string;
  phone: string;
  address?: string;
  mode: "livraison" | "surplace";
  notes?: string;
  total: number;
  items: IncomingItem[];
};

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`orders:${ip}`, 5, 10 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  let body: IncomingOrder;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.name?.trim()) return NextResponse.json({ error: "name required" }, { status: 400 });
  if (!body?.phone?.trim()) return NextResponse.json({ error: "phone required" }, { status: 400 });
  if (body.mode !== "livraison" && body.mode !== "surplace")
    return NextResponse.json({ error: "invalid mode" }, { status: 400 });
  if (body.mode === "livraison" && !body.address?.trim())
    return NextResponse.json({ error: "address required" }, { status: 400 });
  if (!Array.isArray(body.items) || body.items.length === 0)
    return NextResponse.json({ error: "empty cart" }, { status: 400 });

  const order = await prisma.order.create({
    data: {
      name: body.name.trim().slice(0, 120),
      phone: body.phone.trim().slice(0, 40),
      address: (body.address ?? "").trim().slice(0, 400),
      mode: body.mode,
      notes: body.notes?.trim().slice(0, 800) || null,
      total: Number(body.total) || 0,
      items: {
        create: body.items.slice(0, 50).map((it) => ({
          name: String(it.name).slice(0, 200),
          price: Number(it.price) || 0,
          quantity: Math.max(1, Math.min(99, Number(it.quantity) || 1)),
          options:
            it.options == null
              ? null
              : typeof it.options === "string"
                ? it.options.slice(0, 1000)
                : JSON.stringify(it.options).slice(0, 1000),
        })),
      },
    },
    select: { id: true, createdAt: true },
  });

  return NextResponse.json({ id: order.id, createdAt: order.createdAt });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!isAdminEmail(session?.user?.email)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { items: true },
  });
  return NextResponse.json({ orders });
}
