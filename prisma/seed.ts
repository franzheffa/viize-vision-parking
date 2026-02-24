import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Nettoyage de la base...')
  // On supprime dans l'ordre pour respecter les contraintes de clés étrangères
  await prisma.reservation.deleteMany({})
  await prisma.parkingSpot.deleteMany({})
  await prisma.parkingLot.deleteMany({})

  // 1. Créer le Parking
  const lot = await prisma.parkingLot.create({
    data: {
      id: 'default-lot',
      name: 'Parking Central Viize',
      address: 'Avenue de la Vision, Paris',
    },
  })

  // 2. Créer 12 places
  console.log('🌱 Création des 12 places...')
  const spotsData = Array.from({ length: 12 }, (_, i) => ({
    label: `P-${i + 1}`,
    type: 'STANDARD' as any,
    isOccupied: false,
    isReserved: false,
    lotId: lot.id,
  }))

  await prisma.parkingSpot.createMany({
    data: spotsData
  })

  console.log('✅ Base de données prête !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
