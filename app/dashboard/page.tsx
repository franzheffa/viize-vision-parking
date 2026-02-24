import { getDashboardData } from '@/lib/actions'

export default async function ManagerDashboard() {
  const data = await getDashboardData()

  return (
    <div className="min-h-screen bg-white p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-black text-[#0F172A] italic tracking-tighter">Tableau de Bord IA</h1>
          <div className="flex gap-4">
            <div className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest">Conducteur</div>
            <div className="bg-indigo-600 px-4 py-2 rounded-xl text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-indigo-100">Manager</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Carte Revenus */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Revenus Totaux</p>
            <p className="text-6xl font-black text-slate-900 tracking-tighter italic">{data.totalRevenue}€</p>
          </div>
          
          {/* Carte Occupation */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Occupation</p>
            <p className="text-6xl font-black text-slate-900 tracking-tighter italic">{data.occupancy}%</p>
          </div>

          {/* Carte IA MedGemma */}
          <div className="bg-[#0F172A] p-10 rounded-[40px] text-white relative overflow-hidden flex flex-col justify-center shadow-2xl border-4 border-indigo-500/20">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold tracking-tight">Analyse MedGemma™</h3>
              <span className="bg-indigo-600 text-[9px] px-3 py-1 rounded-full font-mono uppercase tracking-widest font-black">Reasoning Engine</span>
            </div>
            <p className="italic text-slate-300 font-medium leading-relaxed text-lg">
              "Forte demande détectée près du centre-ville. Ajustement dynamique des tarifs (+12%) recommandé pour optimiser les flux."
            </p>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Graphique Placeholder Style Minimal */}
        <div className="w-full h-64 bg-slate-50 rounded-[40px] border border-dashed border-slate-200 flex items-center justify-center">
          <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">Flux de données en direct...</p>
        </div>
      </div>
    </div>
  )
}
