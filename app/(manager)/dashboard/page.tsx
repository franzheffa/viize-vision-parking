"use client";
import { useEffect, useState } from "react";

type LotStats = {
  id: string;
  name: string;
  currency: string;
  totalSpots: number;
  occupied: number;
  reserved: number;
  baseRateCents: number;
  targetOccupancyPct: number;
  evPremiumPct: number;
  surgeMaxPct: number;
  managerShareBps: number;
  driverCashbackBps: number;
  platformFeeBps: number;
};

export default function ManagerDashboard() {
  const [lots, setLots] = useState<LotStats[]>([]);

  useEffect(() => {
    fetch("/api/lots?scope=managed").then((r) => r.json()).then((d) => setLots(d.lots));
  }, []);

  return (
    <div style={{ maxWidth: 980, margin: "40px auto", padding: 16 }}>
      <h1>Manager Dashboard</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {lots.map((l) => {
          const occPct = l.totalSpots ? Math.round(((l.occupied + l.reserved) / l.totalSpots) * 100) : 0;
          return (
            <div key={l.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
              <h3 style={{ margin: 0 }}>{l.name}</h3>
              <p style={{ margin: "6px 0" }}>
                Occupation: <b>{occPct}%</b> — Spots: {l.totalSpots} — Occupées: {l.occupied} — Réservées: {l.reserved}
              </p>
              <p style={{ margin: "6px 0" }}>
                Base: <b>{(l.baseRateCents / 100).toFixed(2)} {l.currency}/h</b> · Target: {l.targetOccupancyPct}% · EV +{l.evPremiumPct}% · Surge max +{l.surgeMaxPct}%
              </p>
              <p style={{ margin: "6px 0" }}>
                Split: Manager {(l.managerShareBps / 100).toFixed(2)}% · Driver {(l.driverCashbackBps / 100).toFixed(2)}% · Platform {(l.platformFeeBps / 100).toFixed(2)}%
              </p>
              <a href={`/manager/lots/${l.id}`}>Configurer le parking</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
