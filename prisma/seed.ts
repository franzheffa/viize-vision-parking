import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Créer ou récupérer un Parking de base
  const lot = await prisma.parkingLot.upsert({
    where: { id: 'default-lot' },
    update: {},
    create: {
      id: 'default-lot',
      name: 'Parking Central Viize',
      address: 'Avenue de la Vision, Paris',
    },
  })

  // 2. Créer 12 places de parking avec les bons champs
  const spots = Array.from({ length: 12 }, (_, i) => ({
    label: `P-${i + 1}`,
    type: 'STANDARD' as const,
    isOccupied: false,
    isReserved: false,
    lotId: lot.id,
  }))

  console.log('🌱 Seed en cours...')
  
  for (const spot of spots) {
    await prisma.parkingSpot.upsert({
      where: { label_lotId: { label: spot.label, lotId: spot.lotId } },
      update: {},
      create: spot,
    })
  }

  console.log('✅ Base de données synchronisée et prête !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$client.disconnect()
  })
