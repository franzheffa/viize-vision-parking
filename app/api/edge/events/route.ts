import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { edgeEventSchema } from "@/lib/validation";
import { publishEdgeEvent } from "@/lib/pubsub";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = edgeEventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  if (parsed.data.secret !== process.env.EDGE_INGEST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const spot = await prisma.parkingSpot.findFirst({
    where: { lotId: parsed.data.lotId, externalRef: parsed.data.externalSpotRef }
  });

  if (!spot) {
    return NextResponse.json({ error: "Spot not found" }, { status: 404 });
  }

  await prisma.parkingSpot.update({
    where: { id: spot.id },
    data: { isOccupied: parsed.data.occupied }
  });

  await publishEdgeEvent({
    lotId: parsed.data.lotId,
    externalSpotRef: parsed.data.externalSpotRef,
    occupied: parsed.data.occupied,
    ts: parsed.data.ts
  });

  return NextResponse.json({ ok: true });
}
