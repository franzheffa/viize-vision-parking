import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { computeHourlyRateCents, computeTotalCents } from "@/lib/pricing";
import { quoteSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const { lotId, spotType, startAt, endAt } = parsed.data;

  const lot = await prisma.parkingLot.findUnique({ where: { id: lotId }, include: { spots: true } });
  if (!lot) return NextResponse.json({ error: "Lot not found" }, { status: 404 });

  const total = lot.spots.length;
  const occupied = lot.spots.filter((s) => s.isOccupied).length;
  const reserved = lot.spots.filter((s) => s.isReserved).length;
  const occupancyPct = total === 0 ? 0 : Math.round(((occupied + reserved) / total) * 100);

  const hourlyRateCents = computeHourlyRateCents({
    baseRateCents: lot.baseRateCents,
    occupancyPct,
    targetOccupancyPct: lot.targetOccupancyPct,
    surgeMaxPct: lot.surgeMaxPct,
    spotType,
    evPremiumPct: lot.evPremiumPct
  });

  const totalCents = computeTotalCents(hourlyRateCents, new Date(startAt), new Date(endAt));

  return NextResponse.json({ currency: lot.currency, occupancyPct, hourlyRateCents, totalCents });
}
