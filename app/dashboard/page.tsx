import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
              🚗
            </div>
            <div>
              <div className="font-extrabold">VIIZE</div>
              <div className="text-xs text-slate-500">Operations</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold text-slate-600">
              Buttertech <span className="text-slate-400">powered by</span>{" "}
              <span className="font-extrabold text-black">Interac</span>
            </div>

            <Link
              href="/reserve"
              className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold"
            >
              Conducteur →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-black mb-8">
          OPERATIONS HUB
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <div className="text-sm text-slate-500">Revenue</div>
            <div className="text-2xl font-bold">$152.25</div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <div className="text-sm text-slate-500">Occupancy</div>
            <div className="text-2xl font-bold">75%</div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <div className="text-sm text-slate-500">Total Spots</div>
            <div className="text-2xl font-bold">12</div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <div className="text-sm text-slate-500">Active</div>
            <div className="text-2xl font-bold">9</div>
          </div>
        </div>
      </main>
    </div>
  );
}
