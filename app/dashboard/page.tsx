import { getDashboardData } from '@/lib/actions'

export default async function ManagerDashboard() {
  const data = await getDashboardData()

  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-4xl font-black text-indigo-950 mb-12 italic tracking-tighter">Tableau de Bord IA</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Revenus Totaux</p>
          <p className="text-5xl font-black text-slate-900 tracking-tighter">{data.totalRevenue}€</p>
        </div>
        
        <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Occupation</p>
          <p className="text-5xl font-black text-slate-900 tracking-tighter">{data.occupancy}%</p>
        </div>

        <div className="bg-[#0F172A] p-8 rounded-[40px] text-white relative overflow-hidden flex flex-col justify-center shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">Analyse MedGemma™</h3>
            <span className="bg-indigo-600 text-[10px] px-2 py-1 rounded font-mono uppercase tracking-widest">Reasoning Engine</span>
          </div>
          <p className="italic text-slate-300 font-medium leading-relaxed">
            "Forte demande détectée près du centre-ville. Ajustement dynamique des tarifs (+12%) recommandé."
          </p>
        </div>
      </div>
    </div>
  )
}
