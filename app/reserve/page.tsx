import Link from "next/link";

export default function ReservePage() {
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
              <div className="text-xs text-slate-500">Conducteur</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold text-slate-600">
              Buttertech <span className="text-slate-400">powered by</span>{" "}
              <span className="font-extrabold text-black">Interac</span>
            </div>

            <Link
              href="/dashboard"
              className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold"
            >
              Manager →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-extrabold mb-6">
          Interface Conducteur
        </h1>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <p className="text-slate-600">
            Réservation intelligente avec pricing dynamique IA.
          </p>
        </div>
      </main>
    </div>
  );
}
