import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

/**
 * GET /api/lots
 * If we have a manager id, filter through relation `managers` (no managerId field exists).
 */
type Lot = Awaited<ReturnType<typeof prisma.parkingLot.findMany>>[number];

export async function GET(_req: Request) {
  const session = await getSession();

  const managerId =
    (session as any)?.user?.id ??
    (session as any)?.managerId ??
    (session as any)?.userId ??
    null;

  const lots = await prisma.parkingLot.findMany({
    where: managerId
      ? {
          managers: {
            some: { id: managerId },
          },
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  const mapped = (lots as Lot[]).map((l: Lot) => ({
    id: (l as any).id,
    name: (l as any).name,
    currency: (l as any).currency,
    capacity: (l as any).capacity,
    hourlyRate: (l as any).hourlyRate,
    createdAt: (l as any).createdAt,
  }));

  return NextResponse.json(mapped);
}
