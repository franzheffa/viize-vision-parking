import prisma from '@/lib/prisma'

export async function getDashboardStats() {
  const totalSpots = await prisma.parkingSpot.count()

  // Schema actuel: status String (default "AVAILABLE")
  // "Occupé" = tout ce qui n'est pas AVAILABLE
  const occupiedSpots = await prisma.parkingSpot.count({
    where: { NOT: { status: 'AVAILABLE' } }
  })

  const reservations = await prisma.reservation.findMany({
    orderBy: { startTime: 'desc' }
  })

  return {
    totalSpots,
    occupiedSpots,
    availableSpots: Math.max(totalSpots - occupiedSpots, 0),
    reservations
  }
}

// Alias rétro-compat : certaines pages importent encore getDashboardData
export const getDashboardData = getDashboardStats
