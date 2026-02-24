import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('--- RESTAURATION DU SYSTÈME ---')
  
  // Suppression sécurisée (uniquement ce qui existe)
  try {
    await prisma.parkingSpot.deleteMany({})
    console.log('Anciennes données purgées.')
  } catch (e) {
    console.log('Erreur lors de la purge (normal si la table est vide).')
  }

  const spots = [
    { number: '101', status: 'AVAILABLE', type: 'STANDARD', price: 15 },
    { number: '102', status: 'OCCUPIED', type: 'STANDARD', price: 15 },
    { number: '201', status: 'RESERVED', type: 'PREMIUM', price: 25 },
    { number: '202', status: 'AVAILABLE', type: 'PREMIUM', price: 25 },
    { number: '301', status: 'AVAILABLE', type: 'ELECTRIC', price: 20 }
  ]

  console.log('Injection des données en cours...')

  for (const spot of spots) {
    await prisma.parkingSpot.create({
      data: spot
    })
  }

  console.log('--- SEED RÉUSSI : 5 PLACES CRÉÉES ---')
}

main()
  .catch((e) => {
    console.error('ERREUR CRITIQUE SEED :', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
