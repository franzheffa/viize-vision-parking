export const dynamic = 'force-dynamic'
import { getDashboardData } from '@/lib/actions'
import { LayoutDashboard, Car, Euro, BarChart3 } from 'lucide-react'

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-8 italic tracking-tighter uppercase">Operations Hub</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Revenue" value={`${data.totalRevenue}€`} icon={<Euro className="w-6 h-6"/>} color="bg-emerald-500" />
          <StatCard title="Occupancy" value={`${data.occupancy}%`} icon={<BarChart3 className="w-6 h-6"/>} color="bg-blue-500" />
          <StatCard title="Total Spots" value={data.totalSpots} icon={<LayoutDashboard className="w-6 h-6"/>} color="bg-slate-800" />
          <StatCard title="Active" value={data.occupiedSpots} icon={<Car className="w-6 h-6"/>} color="bg-indigo-500" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-black text-slate-900">{value}</p>
    </div>
  )
}
