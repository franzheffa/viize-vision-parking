import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 820, margin: "48px auto", padding: 16 }}>
      <h1>Viize Vision-Parking</h1>
      <p>Reserve a spot (Standard or EV), dynamic pricing, and revenue sharing.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/login">Login</Link>
        <Link href="/reserve">Reserve</Link>
        <Link href="/reservations">My Reservations</Link>
        <Link href="/manager/dashboard">Manager Dashboard</Link>
      </div>
      <hr />
      <p style={{ fontSize: 14, opacity: 0.8 }}>
        Seeded demo accounts: manager@buttertech.io / Password123! and user@buttertech.io / Password123!
      </p>
    </main>
  );
}
