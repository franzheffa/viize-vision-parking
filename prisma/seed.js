/**
 * Seed JS (fallback) aligné avec prisma/schema.prisma
 * Champs ParkingSpot: number, type, status, price
 */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('--- PURGE (seed.js) ---')
  await prisma.reservation.deleteMany({})
  await prisma.parkingSpot.deleteMany({})

  console.log('--- INJECTION (seed.js) ---')
  const spots = [
    { number: '101', type: 'STANDARD', status: 'AVAILABLE', price: 15.0 },
    { number: '102', type: 'STANDARD', status: 'AVAILABLE', price: 15.0 },
    { number: '103', type: 'STANDARD', status: 'AVAILABLE', price: 15.0 },
    { number: '104', type: 'EV',       status: 'AVAILABLE', price: 22.0 },
    { number: '105', type: 'STANDARD', status: 'AVAILABLE', price: 15.0 },
    { number: '106', type: 'STANDARD', status: 'AVAILABLE', price: 15.0 }
  ]

  for (const spot of spots) {
    await prisma.parkingSpot.create({ data: spot })
  }

  console.log('✅ Seed.js terminé.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
