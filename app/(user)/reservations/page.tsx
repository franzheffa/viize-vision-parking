"use client";
import { useEffect, useState } from "react";

type Res = {
  id: string;
  status: string;
  startAt: string;
  endAt: string;
  totalCents: number;
  currency: string;
  lot: { name: string };
  spot: { label: string; type: string } | null;
};

export default function ReservationsPage() {
  const [items, setItems] = useState<Res[]>([]);
  const [wallet, setWallet] = useState<{ balanceCents: number; currency: string } | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    const r = await fetch("/api/reservations");
    const d = await r.json();
    if (r.ok) {
      setItems(d.reservations);
      setWallet(d.wallet ?? null);
    }
  }

  useEffect(() => { load(); }, []);

  async function cancel(id: string) {
    setMsg("");
    const r = await fetch(`/api/reservations/${id}/cancel`, { method: "POST" });
    const d = await r.json();
    if (!r.ok) return setMsg(d.error ?? "Cancel failed");
    setMsg("✅ Annulée");
    await load();
  }

  return (
    <main style={{ maxWidth: 880, margin: "40px auto", padding: 16 }}>
      <h1>Mes réservations</h1>
      {wallet && (
        <p>
          Cashback wallet: <b>{(wallet.balanceCents / 100).toFixed(2)} {wallet.currency}</b>
        </p>
      )}
      {msg && <p>{msg}</p>}
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <b>{r.lot.name}</b>
              <span>{r.status}</span>
            </div>
            <div>Spot: {r.spot ? `${r.spot.label} (${r.spot.type})` : "auto"}</div>
            <div>
              {new Date(r.startAt).toLocaleString()} → {new Date(r.endAt).toLocaleString()}
            </div>
            <div>Total: {(r.totalCents / 100).toFixed(2)} {r.currency}</div>
            {r.status === "CONFIRMED" && (
              <button onClick={() => cancel(r.id)} style={{ marginTop: 8, padding: "8px 12px" }}>
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
