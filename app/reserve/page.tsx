import { prisma } from '@/lib/prisma'
import { reserveSpot } from '@/lib/actions'

export default async function ReservePage() {
  const spots = await prisma.parkingSpot.findMany({ 
    orderBy: { label: 'asc' } 
  })

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8 italic tracking-tighter">VIIZE VISION - RÉSERVATION</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {spots.map((spot) => {
            const isAvailable = !spot.isOccupied && !spot.isReserved;
            return (
              <form key={spot.id} action={async () => {
                'use server'
                await reserveSpot(spot.id)
              }}>
                <button
                  disabled={!isAvailable}
                  className={`w-full p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
                    isAvailable 
                    ? 'border-white bg-white shadow-sm hover:border-indigo-500 hover:shadow-md' 
                    : 'border-slate-200 bg-slate-100 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xs font-black text-slate-400">PLACE</span>
                  <span className="text-2xl font-black text-slate-900">{spot.label}</span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-200 text-slate-600 uppercase">
                    {spot.type}
                  </span>
                </button>
              </form>
            );
          })}
        </div>
      </div>
    </div>
  )
}
