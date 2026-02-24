import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('--- Nettoyage de la base ---')
  await prisma.reservation.deleteMany({})
  await prisma.parkingSpot.deleteMany({})

  console.log('--- Injection des places Viize ---')
  const spots = []
  for (let i = 1; i <= 12; i++) {
    const isEV = i % 4 === 0
    spots.push({
      number: i.toString().padStart(2, '0'),
      type: isEV ? 'EV' : 'STANDARD',
      status: 'AVAILABLE',
      price: isEV ? 21.75 : 14.50
    })
  }

  for (const spot of spots) {
    await prisma.parkingSpot.create({ data: spot })
  }
  console.log('✅ Base de données synchronisée et prête !')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
