'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getDashboardData() {
  const totalSpots = await prisma.parkingSpot.count()
  const occupiedSpots = await prisma.parkingSpot.count({
    where: { OR: [{ isOccupied: true }, { isReserved: true }] }
  })
  
  const reservations = await prisma.reservation.findMany()
  const totalRevenue = reservations.reduce((acc, res) => acc + res.totalAmount, 0)
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
        userEmail: 'demo@viize.io',
        totalAmount: 15.00 // Prix fixe par défaut pour le MVP
      }
    })
  ])
  
  revalidatePath('/reserve')
  revalidatePath('/dashboard')
}
