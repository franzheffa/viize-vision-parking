import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function reserveSpot(spotId: string, userEmail: string = "user@buttertech.io") {
  try {
    const spot = await prisma.parkingSpot.findUnique({ where: { id: spotId } })
    if (!spot || spot.status === 'OCCUPIED') throw new Error('Place non disponible')

    await prisma.$transaction([
      prisma.parkingSpot.update({
        where: { id: spotId },
        data: { status: 'OCCUPIED' }
      }),
      prisma.reservation.create({
        data: {
          spotId,
          userEmail,
          totalAmount: spot.price
        }
      })
    ])
    revalidatePath('/reserve')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de la réservation" }
  }
}

export async function getDashboardData() {
  const spots = await prisma.parkingSpot.count()
  const occupied = await prisma.parkingSpot.count({ where: { status: 'OCCUPIED' } })
  const revenue = await prisma.reservation.aggregate({ _sum: { totalAmount: true } })
  
  return {
    occupancy: spots > 0 ? Math.round((occupied / spots) * 100) : 0,
    totalRevenue: (revenue._sum.totalAmount || 0).toFixed(2)
  }
}
