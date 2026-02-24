import prisma from '@/lib/prisma'

export default async function ReservePage() {
  const spots = await prisma.parkingSpot.findMany({
    orderBy: { number: 'asc' }
  })

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Réserver une place</h1>

      {spots.length === 0 ? (
        <p>Aucune place disponible pour le moment.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
          {spots.map((s) => (
            <div
              key={s.id}
              style={{
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: 12,
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 800 }}>Spot {s.number}</div>
                <div style={{ opacity: 0.75, fontSize: 14 }}>
                  Type: {s.type} • Statut: {s.status} • Prix: {s.price}
                </div>
              </div>

              <a
                href={`/reserve/${encodeURIComponent(s.id)}`}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  border: '1px solid rgba(0,0,0,0.18)',
                  fontWeight: 700
                }}
              >
                Choisir
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
