import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const lotId = url.searchParams.get("lotId");
  if (!lotId) return NextResponse.json({ error: "lotId required" }, { status: 400 });

  const isManagerOfLot = await prisma.parkingLot.findFirst({
    where: { id: lotId, managers: { some: { id: session.id } } },
    select: { id: true, currency: true }
  });
  if (!isManagerOfLot) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const reservations = await prisma.reservation.findMany({
    where: { lotId, status: { in: ["CONFIRMED", "COMPLETED"] } }
  });

  const totals = reservations.reduce(
    (acc, r) => {
      acc.gross += r.totalCents;
      acc.manager += r.managerAmountCents;
      acc.driver += r.driverCashbackCents;
      acc.platform += r.platformFeeCents;
      return acc;
    },
    { gross: 0, manager: 0, driver: 0, platform: 0 }
  );

  return NextResponse.json({ currency: isManagerOfLot.currency, totals, count: reservations.length });
}
