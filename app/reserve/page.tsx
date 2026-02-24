import { PrismaClient } from '@prisma/client'
import { reserveSpot } from '@/lib/actions'

const prisma = new PrismaClient()

export default async function ReservePage() {
  const spots = await prisma.parkingSpot.findMany({ orderBy: { number: 'asc' } })

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <header className="flex justify-between items-center mb-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-black text-2xl italic text-indigo-900">
          <div className="bg-indigo-600 p-1 rounded-lg text-white">VIIZE</div>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-bold border border-indigo-100">500.00€</div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800">Réserver une place</h2>
            <p className="text-slate-500 font-medium">Places disponibles en temps réel à Montréal.</p>
          </div>
          <div className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black border border-orange-200 uppercase tracking-widest">
            Demande IA: X1.45
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {spots.map((spot) => (
            <div key={spot.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative group">
              <div className={`absolute top-5 right-5 h-3 w-3 rounded-full border-2 border-white ${spot.status === 'AVAILABLE' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${spot.type === 'STANDARD' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-600'}`}>
                {spot.type === 'EV' ? 'Borne Électrique' : 'Standard'}
              </span>
              <div className="mt-4 mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Place</p>
                <p className="text-4xl font-black text-slate-800 italic">#{spot.number}</p>
              </div>
              <p className="text-indigo-600 font-black text-xl mb-4">{spot.price.toFixed(2)}€</p>
              
              {spot.status === 'AVAILABLE' && (
                <form action={async () => { 'use server'; await reserveSpot(spot.id); }}>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-tighter">Réserver</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
