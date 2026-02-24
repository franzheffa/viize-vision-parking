import prisma from '@/lib/prisma'

export async function getDashboardStats() {
  const totalSpots = await prisma.parkingSpot.count()

  // "Occupé" = tout ce qui n'est pas AVAILABLE (schema actuel)
  const occupiedSpots = await prisma.parkingSpot.count({
    where: { NOT: { status: 'AVAILABLE' } }
  })

  const reservations = await prisma.reservation.findMany({
    orderBy: { startTime: 'desc' }
  })

  const totalRevenue = reservations.reduce((sum, r) => sum + (r.totalAmount || 0), 0)
  const occupancy =
    totalSpots === 0 ? 0 : Math.round((occupiedSpots / totalSpots) * 100)

  return {
    totalSpots,
    occupiedSpots,
    availableSpots: Math.max(totalSpots - occupiedSpots, 0),
    totalRevenue,
    occupancy,
    reservations
  }
}

// Alias rétro-compat
export const getDashboardData = getDashboardStats
