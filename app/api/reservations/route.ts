import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { computeHourlyRateCents, computeTotalCents } from "@/lib/pricing";
import { splitRevenue } from "@/lib/revenue";
import { reserveSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = reserveSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const { lotId, spotType, startAt, endAt } = parsed.data;

  const lot = await prisma.parkingLot.findUnique({
    where: { id: lotId },
    include: { spots: true }
  });
  if (!lot) return NextResponse.json({ error: "Lot not found" }, { status: 404 });

  const candidate = lot.spots.find((s) => s.type === spotType && !s.isOccupied && !s.isReserved);
  if (!candidate) return NextResponse.json({ error: "No spot available" }, { status: 409 });

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

  const split = splitRevenue(totalCents, {
    manager: lot.managerShareBps,
    driver: lot.driverCashbackBps,
    platform: lot.platformFeeBps
  });

  const reservation = await prisma.$transaction(async (tx) => {
    const spot = await tx.parkingSpot.update({
      where: { id: candidate.id },
      data: { isReserved: true }
    });

    return tx.reservation.create({
      data: {
        userId: session.id,
        lotId: lot.id,
        spotId: spot.id,
        status: "CONFIRMED",
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        hourlyRateCents,
        totalCents,
        currency: lot.currency,
        managerAmountCents: split.managerAmount,
        driverCashbackCents: split.driverCashback,
        platformFeeCents: split.platformFee
      }
    });
  });

  // Credit cashback to wallet (MVP). In real life you would settle after completion/charge succeeds.
  await prisma.wallet.upsert({
    where: { userId: session.id },
    update: { balanceCents: { increment: reservation.driverCashbackCents } },
    create: { userId: session.id, balanceCents: reservation.driverCashbackCents, currency: reservation.currency }
  });

  return NextResponse.json({ reservationId: reservation.id });
}

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reservations = await prisma.reservation.findMany({
    where: { userId: session.id },
    include: { lot: true, spot: true },
    orderBy: { createdAt: "desc" }
  });

  const wallet = await prisma.wallet.findUnique({ where: { userId: session.id } });

  return NextResponse.json({ reservations, wallet });
}
