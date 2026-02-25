"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { money } from "@/lib/money";

type SpotType = "STANDARD" | "EV";

type Spot = {
  id: string;
  label: string;
  type: SpotType;
  address: string;
  basePrice: number;
  available: boolean;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function ReservePage() {
  const [mode, setMode] = useState<"Conducteur" | "Manager">("Conducteur");
  const [demand, setDemand] = useState<number>(1.45);

  const spots: Spot[] = useMemo(
    () => [
      { id: "01", label: "PLACE #01", type: "STANDARD", address: "Berry UQAM • Rue Berri, Montréal", basePrice: 14.5, available: true },
      { id: "02", label: "PLACE #02", type: "STANDARD", address: "Village • Rue Sainte-Catherine E, Montréal", basePrice: 14.5, available: true },
      { id: "03", label: "PLACE #03", type: "STANDARD", address: "Quartier Latin • Rue Saint-Denis, Montréal", basePrice: 14.5, available: true },
      { id: "04", label: "PLACE #04", type: "EV", address: "Borne • Place Émilie-Gamelin, Montréal", basePrice: 21.75, available: true },
      { id: "05", label: "PLACE #05", type: "STANDARD", address: "Centre-ville • Boulevard René-Lévesque E, Montréal", basePrice: 14.5, available: true },
      { id: "06", label: "PLACE #06", type: "STANDARD", address: "Plateau • Avenue du Mont-Royal E, Montréal", basePrice: 14.5, available: true },
      { id: "07", label: "PLACE #07", type: "STANDARD", address: "McGill • Rue Sherbrooke O, Montréal", basePrice: 14.5, available: true },
      { id: "08", label: "PLACE #08", type: "EV", address: "Borne • Rue Saint-Urbain, Montréal", basePrice: 21.75, available: true },
      { id: "09", label: "PLACE #09", type: "STANDARD", address: "Old Port • Rue de la Commune, Montréal", basePrice: 14.5, available: true },
      { id: "10", label: "PLACE #10", type: "STANDARD", address: "Chinatown • Rue de la Gauchetière O, Montréal", basePrice: 14.5, available: true },
      { id: "11", label: "PLACE #11", type: "STANDARD", address: "Concordia • Boulevard de Maisonneuve O, Montréal", basePrice: 14.5, available: true },
      { id: "12", label: "PLACE #12", type: "EV", address: "Borne • Rue Notre-Dame O, Montréal", basePrice: 21.75, available: true },
    ],
    []
  );

  useEffect(() => {
    const t = setInterval(() => {
      // Démo "live": fluctuation légère autour de 1.45
      const drift = (Math.random() - 0.5) * 0.06; // +-0.03
      setDemand((d) => clamp(Number((d + drift).toFixed(2)), 1.05, 1.95));
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const wallet = useMemo(() => 500.0, []);
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
              <div className="text-[11px] text-slate-500 -mt-0.5">Vision Parking</div>
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
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Réserver une place
            </h1>
            <p className="mt-2 text-slate-500">
              Places disponibles en temps réel à Montréal.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            <div className="rounded-full bg-amber-50 px-4 py-2 text-xs font-extrabold text-amber-700 ring-1 ring-amber-200">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400 align-middle" />
              {demandLabel}
            </div>

            <Link
              href="/dashboard"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Operations Hub →
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {spots.map((s) => {
            const finalPrice = Number((s.basePrice * demand).toFixed(2));
            const chip =
              s.type === "EV"
                ? { text: "BORNE ÉLECTRIQUE", cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" }
                : { text: "STANDARD", cls: "bg-slate-100 text-slate-600 ring-1 ring-slate-200" };

            return (
              <div
                key={s.id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${chip.cls}`}>
                    {chip.text}
                  </span>
                  <span className={`h-3 w-3 rounded-full ${s.available ? "bg-emerald-400" : "bg-slate-300"}`} />
                </div>

                <div className="mt-5 text-[11px] font-extrabold tracking-widest text-slate-400">
                  PLACE
                </div>
                <div className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900">
                  #{s.id}
                </div>

                <div className="mt-2 text-xs text-slate-500">
                  {s.address}
                </div>

                <div className="mt-4 text-2xl font-extrabold text-[#4B45E6]">
                  {money(finalPrice, "USD")}
                </div>

                <button
                  className="mt-4 w-full rounded-2xl bg-[#4B45E6] py-3 text-sm font-extrabold text-white shadow-sm hover:opacity-95 disabled:opacity-40"
                  disabled={!s.available}
                >
                  Réserver
                </button>

                <div className="mt-3 text-[11px] text-slate-500">
                  Base {money(s.basePrice, "USD")} • IA x{demand.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-extrabold text-slate-900">Pricing dynamique IA (live)</div>
              <div className="text-xs text-slate-500">Démo UI — brancher ensuite sur données réelles (Prisma + API).</div>
            </div>

            <button
              onClick={() => setDemand((d) => clamp(Number((d + 0.12).toFixed(2)), 1.05, 1.95))}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:opacity-95"
            >
              Déclencher optimisation IA
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
