import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const scope = url.searchParams.get("scope"); // managed | null

  if (scope === "managed") {
    const session = getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const lots = await prisma.parkingLot.findMany({
      where: { managers: { some: { id: session.id } } },
      include: { spots: true },
      orderBy: { createdAt: "desc" }
    });

    const mapped = lots.map((l) => ({
      id: l.id,
      name: l.name,
      currency: l.currency,
      totalSpots: l.spots.length,
      occupied: l.spots.filter((s) => s.isOccupied).length,
      reserved: l.spots.filter((s) => s.isReserved).length,
      baseRateCents: l.baseRateCents,
      targetOccupancyPct: l.targetOccupancyPct,
      evPremiumPct: l.evPremiumPct,
      surgeMaxPct: l.surgeMaxPct,
      managerShareBps: l.managerShareBps,
      driverCashbackBps: l.driverCashbackBps,
      platformFeeBps: l.platformFeeBps
    }));

    return NextResponse.json({ lots: mapped });
  }

  const lots = await prisma.parkingLot.findMany({
    select: { id: true, name: true, currency: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json({ lots });
}
