import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- PURGE ---')
  await prisma.reservation.deleteMany({})
  await prisma.parkingSpot.deleteMany({})

  console.log('--- INJECTION ---')

  const spots = [
    { number: '101', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '102', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '103', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '104', status: 'AVAILABLE', type: 'EV',       price: 22.0 },

    { number: '105', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '106', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '107', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '108', status: 'AVAILABLE', type: 'EV',       price: 22.0 },

    { number: '109', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '110', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '111', status: 'AVAILABLE', type: 'STANDARD', price: 15.0 },
    { number: '112', status: 'AVAILABLE', type: 'EV',       price: 22.0 }
  ] as const

  for (const spot of spots) {
    await prisma.parkingSpot.create({ data: spot })
  }

  console.log('✅ Seed terminé.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
