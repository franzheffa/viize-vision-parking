"use client";
import { useEffect, useMemo, useState } from "react";

type Lot = { id: string; name: string; currency: string };
type Quote = { occupancyPct: number; hourlyRateCents: number; totalCents: number; currency: string };

export default function ReservePage() {
  const [lots, setLots] = useState<Lot[]>([]);
  const [lotId, setLotId] = useState("");
  const [spotType, setSpotType] = useState<"STANDARD" | "EV">("STANDARD");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/lots").then((r) => r.json()).then((d) => setLots(d.lots));
  }, []);

  const ready = useMemo(() => lotId && startAt && endAt, [lotId, startAt, endAt]);

  async function getQuote() {
    setMsg("");
    const r = await fetch("/api/pricing/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lotId, spotType, startAt, endAt })
    });
    const d = await r.json();
    if (!r.ok) return setMsg(d.error ?? "Quote error");
    setQuote(d);
  }

  async function reserve() {
    setMsg("");
    const r = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lotId, spotType, startAt, endAt })
    });
    const d = await r.json();
    if (!r.ok) return setMsg(d.error ?? "Reservation error");
    setMsg(`✅ Réservation confirmée: ${d.reservationId}`);
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>Viize Parking — Réserver</h1>

      <label>Parking</label>
      <select value={lotId} onChange={(e) => setLotId(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 12 }}>
        <option value="">Choisir...</option>
        {lots.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>

      <label>Type de place</label>
      <select value={spotType} onChange={(e) => setSpotType(e.target.value as any)} style={{ width: "100%", padding: 10, marginBottom: 12 }}>
        <option value="STANDARD">Standard</option>
        <option value="EV">EV (borne)</option>
      </select>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label>Début</label>
          <input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} style={{ width: "100%", padding: 10 }} />
        </div>
        <div>
          <label>Fin</label>
          <input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} style={{ width: "100%", padding: 10 }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button disabled={!ready} onClick={getQuote} style={{ padding: "10px 14px" }}>
          Voir prix
        </button>
        <button disabled={!ready} onClick={reserve} style={{ padding: "10px 14px" }}>
          Réserver
        </button>
      </div>

      {quote && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 10 }}>
          <div>
            Occupation: <b>{quote.occupancyPct}%</b>
          </div>
          <div>
            Tarif/h: <b>{(quote.hourlyRateCents / 100).toFixed(2)} {quote.currency}</b>
          </div>
          <div>
            Total: <b>{(quote.totalCents / 100).toFixed(2)} {quote.currency}</b>
          </div>
        </div>
      )}

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
