"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { money } from "@/lib/money";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function Stat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-extrabold tracking-widest text-slate-400">
            {title}
          </div>
          <div className="mt-2 text-3xl font-extrabold">{value}</div>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [mode, setMode] = useState<"Conducteur" | "Manager">("Manager");
  const [demand, setDemand] = useState<number>(1.45);

  useEffect(() => {
    const t = setInterval(() => {
      const drift = (Math.random() - 0.5) * 0.06; // +-0.03
      setDemand((d) => clamp(Number((d + drift).toFixed(2)), 1.05, 1.95));
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const totalSpots = 12;
  const occupancy = 0.75;
  const revenue = 152.25; // démo

  const wallet = useMemo(() => 347.75, []);
  const demandLabel = `DEMANDE IA: x${demand.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#4B45E6] text-white shadow-sm">
              🚗
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-wide">VIIZE</div>
              <div className="text-[11px] text-slate-500 -mt-0.5">Operations</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex rounded-2xl bg-slate-100 p-1">
              <button
                onClick={() => setMode("Conducteur")}
                className={`rounded-2xl px-4 py-2 text-sm font-bold ${
                  mode === "Conducteur" ? "bg-white text-[#4B45E6] shadow-sm" : "text-slate-500"
                }`}
              >
                Conducteur
              </button>
              <button
                onClick={() => setMode("Manager")}
                className={`rounded-2xl px-4 py-2 text-sm font-bold ${
                  mode === "Manager" ? "bg-white text-[#4B45E6] shadow-sm" : "text-slate-500"
                }`}
              >
                Manager
              </button>
            </div>

            <div className="rounded-2xl bg-[#EEF2FF] px-4 py-2 text-sm font-extrabold text-[#4B45E6] ring-1 ring-indigo-100">
              {money(wallet, "USD")}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              OPERATIONS HUB
            </h1>
            <p className="mt-2 text-slate-500">
              Vue manager • performance • allocation • IA.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            <div className="rounded-full bg-amber-50 px-4 py-2 text-xs font-extrabold text-amber-700 ring-1 ring-amber-200">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400 align-middle" />
              {demandLabel}
            </div>

            <Link
              href="/reserve"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Réserver →
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <Stat title="REVENUE" value={money(revenue, "USD")} icon="💵" />
          <Stat title="OCCUPANCY" value={`${Math.round(occupancy * 100)}%`} icon="📈" />
          <Stat title="TOTAL SPOTS" value={`${totalSpots}`} icon="🔲" />
          <Stat title="ACTIVE" value={`${Math.round(totalSpots * occupancy)}`} icon="🚗" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-extrabold text-slate-900">Tableau de Bord IA</div>
                <div className="mt-1 text-xs text-slate-500">
                  Démo: stats + recommandations IA visibles.
                </div>
              </div>

              <button
                onClick={() => setDemand((d) => clamp(Number((d + 0.12).toFixed(2)), 1.05, 1.95))}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white hover:opacity-95"
              >
                Optimiser IA
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="text-xs font-extrabold tracking-widest text-slate-400">
                  REVENUS TOTAUX
                </div>
                <div className="mt-2 text-4xl font-extrabold">{money(revenue, "USD")}</div>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="text-xs font-extrabold tracking-widest text-slate-400">
                  OCCUPATION
                </div>
                <div className="mt-2 text-4xl font-extrabold">
                  {Math.round(occupancy * 100)}%
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 shadow-sm ring-1 ring-slate-800">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-extrabold text-white">Analyse IA</div>
              <div className="rounded-full bg-[#4B45E6] px-3 py-1 text-[11px] font-extrabold text-white">
                REASONING ENGINE
              </div>
            </div>

            <div className="mt-4 text-sm text-white/85">
              “Forte demande détectée près de Berry UQAM. Ajustement dynamique des tarifs
              (+{Math.round((demand - 1) * 100)}%) recommandé pour optimiser les flux.”
            </div>

            <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs font-extrabold text-white/70">Action</div>
              <div className="mt-1 text-sm text-white/90">
                Réallouer 2 places EV vers zone forte demande.
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/reserve"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-slate-900 hover:opacity-95"
              >
                Voir côté conducteur →
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/50">
              (Démo) Branche ensuite sur API/Prisma pour données réelles.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
