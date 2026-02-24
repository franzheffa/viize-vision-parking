'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getDashboardData() {
  const totalSpots = await prisma.parkingSpot.count()
  const occupiedSpots = await prisma.parkingSpot.count({
    where: { OR: [{ isOccupied: true }, { isReserved: true }] }
  })
  
  const reservations = await prisma.reservation.findMany()
  // On divise par 100 car ton schéma stocke en centimes (Cents)
  const totalRevenue = reservations.reduce((acc, res) => acc + (res.totalAmountCents || 0), 0) / 100
  
  const occupancyRate = totalSpots > 0 ? (occupiedSpots / totalSpots) * 100 : 0

  return {
    totalRevenue: totalRevenue.toFixed(2),
    occupancy: Math.round(occupancyRate),
    totalSpots,
    occupiedSpots
  }
}

export async function reserveSpot(spotId: string) {
  const spot = await prisma.parkingSpot.findUnique({ where: { id: spotId } })
  if (!spot || spot.isOccupied || spot.isReserved) return
  
  await prisma.$transaction([
    prisma.parkingSpot.update({
      where: { id: spotId },
      data: { isReserved: true }
    }),
    prisma.reservation.create({
      data: {
        spotId,
        userId: 'demo-user-id', // Ajusté selon ton schéma (userId est requis)
        lotId: spot.lotId,
        status: 'CONFIRMED',
        startAt: new Date(),
        endAt: new Date(Date.now() + 3600000), // +1 heure
        totalAmountCents: 1500, // 15.00€
        hourlyRateCents: 1500,
        platformFeeCents: 0
      }
    })
  ])
  
  revalidatePath('/reserve')
  revalidatePath('/dashboard')
}
