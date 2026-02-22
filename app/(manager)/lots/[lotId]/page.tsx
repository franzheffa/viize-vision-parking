"use client";
import { useEffect, useState } from "react";

type Lot = {
  id: string;
  name: string;
  currency: string;
  baseRateCents: number;
  evPremiumPct: number;
  surgeMaxPct: number;
  targetOccupancyPct: number;
  managerShareBps: number;
  driverCashbackBps: number;
  platformFeeBps: number;
  spots: { id: string; label: string; type: string; isOccupied: boolean; isReserved: boolean; externalRef: string | null }[];
};

export default function ManageLotPage({ params }: { params: { lotId: string } }) {
  const [lot, setLot] = useState<Lot | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    const r = await fetch(`/api/lots/${params.lotId}`);
    const d = await r.json();
    if (r.ok) setLot(d.lot);
  }

  useEffect(() => { load(); }, [params.lotId]);

  async function save() {
    if (!lot) return;
    setMsg("");
    const r = await fetch(`/api/lots/${lot.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseRateCents: lot.baseRateCents,
        evPremiumPct: lot.evPremiumPct,
        surgeMaxPct: lot.surgeMaxPct,
        targetOccupancyPct: lot.targetOccupancyPct,
        managerShareBps: lot.managerShareBps,
        driverCashbackBps: lot.driverCashbackBps,
        platformFeeBps: lot.platformFeeBps
      })
    });
    const d = await r.json();
    if (!r.ok) return setMsg(d.error ?? "Save failed");
    setMsg("✅ Saved");
    await load();
  }

  async function simulate() {
    if (!lot) return;
    setMsg("");
    const r = await fetch(`/api/payouts/simulate?lotId=${lot.id}`);
    const d = await r.json();
    if (!r.ok) return setMsg(d.error ?? "Simulate failed");
    setMsg(`Payouts (count ${d.count}): Gross ${(d.totals.gross/100).toFixed(2)} ${d.currency} | Manager ${(d.totals.manager/100).toFixed(2)} | Driver ${(d.totals.driver/100).toFixed(2)} | Platform ${(d.totals.platform/100).toFixed(2)}`);
  }

  if (!lot) return <main style={{ padding: 16 }}>Loading...</main>;

  return (
    <main style={{ maxWidth: 980, margin: "40px auto", padding: 16 }}>
      <h1>{lot.name}</h1>
      {msg && <p>{msg}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <h3>Pricing</h3>
          <label>Base rate (cents/hour)</label>
          <input value={lot.baseRateCents} onChange={(e) => setLot({ ...lot, baseRateCents: Number(e.target.value) })} style={{ width: "100%", padding: 10 }} />
          <label>EV premium (%)</label>
          <input value={lot.evPremiumPct} onChange={(e) => setLot({ ...lot, evPremiumPct: Number(e.target.value) })} style={{ width: "100%", padding: 10 }} />
          <label>Surge max (%)</label>
          <input value={lot.surgeMaxPct} onChange={(e) => setLot({ ...lot, surgeMaxPct: Number(e.target.value) })} style={{ width: "100%", padding: 10 }} />
          <label>Target occupancy (%)</label>
          <input value={lot.targetOccupancyPct} onChange={(e) => setLot({ ...lot, targetOccupancyPct: Number(e.target.value) })} style={{ width: "100%", padding: 10 }} />
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <h3>Revenue sharing (bps)</h3>
          <p style={{ fontSize: 13, opacity: 0.8 }}>Must sum to 10000. Example: 9000 / 500 / 500.</p>
          <label>Manager share (bps)</label>
          <input value={lot.managerShareBps} onChange={(e) => setLot({ ...lot, managerShareBps: Number(e.target.value) })} style={{ width: "100%", padding: 10 }} />
          <label>Driver cashback (bps)</label>
          <input value={lot.driverCashbackBps} onChange={(e) => setLot({ ...lot, driverCashbackBps: Number(e.target.value) })} style={{ width: "100%", padding: 10 }} />
          <label>Platform fee (bps)</label>
          <input value={lot.platformFeeBps} onChange={(e) => setLot({ ...lot, platformFeeBps: Number(e.target.value) })} style={{ width: "100%", padding: 10 }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={save} style={{ padding: "10px 14px" }}>Save</button>
        <button onClick={simulate} style={{ padding: "10px 14px" }}>Simulate payouts</button>
      </div>

      <h3 style={{ marginTop: 20 }}>Spots</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {lot.spots.map((s) => (
          <div key={s.id} style={{ border: "1px solid #eee", borderRadius: 10, padding: 10, display: "flex", justifyContent: "space-between" }}>
            <span><b>{s.label}</b> ({s.type}) · extRef: {s.externalRef ?? "-"}</span>
            <span>{s.isOccupied ? "occupied" : "free"} · {s.isReserved ? "reserved" : "open"}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
