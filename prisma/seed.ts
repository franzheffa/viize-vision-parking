import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Nettoyage des données...')
  await prisma.parkingSpot.deleteMany({})

  console.log('Injection des spots (Champs obligatoires inclus)...')
  const spots = [
    { number: 'A-101', status: 'AVAILABLE', type: 'STANDARD', price: 15 },
    { number: 'A-102', status: 'OCCUPIED', type: 'STANDARD', price: 15 },
    { number: 'B-201', status: 'RESERVED', type: 'PREMIUM', price: 25 },
    { number: 'B-202', status: 'AVAILABLE', type: 'PREMIUM', price: 25 },
    { number: 'EV-301', status: 'AVAILABLE', type: 'ELECTRIC', price: 20 }
  ]

  for (const spot of spots) {
    await prisma.parkingSpot.create({
      data: spot
    })
  }

  console.log('Seed fini. Matrice synchronisée.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
