import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await prisma.reservation.findUnique({ where: { id: params.id } });
  if (!res || res.userId !== session.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.$transaction(async (tx) => {
    await tx.reservation.update({ where: { id: res.id }, data: { status: "CANCELLED" } });
    if (res.spotId) await tx.parkingSpot.update({ where: { id: res.spotId }, data: { isReserved: false } });
  });

  return NextResponse.json({ ok: true });
}
