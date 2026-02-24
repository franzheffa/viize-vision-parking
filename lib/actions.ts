'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Récupère les stats pour le Dashboard Manager
export async function getDashboardData() {
  const totalSpots = await prisma.parkingSpot.count()
  const occupiedSpots = await prisma.parkingSpot.count({
    where: { status: 'OCCUPIED' }
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

// Action de réservation pour l'interface utilisateur
export async function reserveSpot(spotId: string) {
  const spot = await prisma.parkingSpot.findUnique({ where: { id: spotId } })
  
  if (!spot || spot.status !== 'AVAILABLE') return
  
  await prisma.$transaction([
    prisma.parkingSpot.update({
      where: { id: spotId },
      data: { status: 'OCCUPIED' }
    }),
    prisma.reservation.create({
      data: {
        spotId,
        userEmail: 'demo@viize.io',
        totalAmount: spot.price
      }
    })
  ])
  
  revalidatePath('/reserve')
  revalidatePath('/dashboard')
}
