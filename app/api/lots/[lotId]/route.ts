import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { updateLotSchema } from "@/lib/validation";

export async function GET(_: Request, { params }: { params: { lotId: string } }) {
  const lot = await prisma.parkingLot.findUnique({
    where: { id: params.lotId },
    include: { spots: true }
  });
  if (!lot) return NextResponse.json({ error: "Lot not found" }, { status: 404 });
  return NextResponse.json({ lot });
}

export async function PATCH(req: Request, { params }: { params: { lotId: string } }) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const isManagerOfLot = await prisma.parkingLot.findFirst({
    where: { id: params.lotId, managers: { some: { id: session.id } } },
    select: { id: true }
  });
  if (!isManagerOfLot) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = updateLotSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const updated = await prisma.parkingLot.update({
    where: { id: params.lotId },
    data: parsed.data
  });
  return NextResponse.json({ lot: updated });
}
