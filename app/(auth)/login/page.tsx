"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("manager@buttertech.io");
  const [password, setPassword] = useState("Password123!");
  const [msg, setMsg] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const d = await r.json();
    if (!r.ok) return setMsg(d.error ?? "Login failed");
    window.location.href = d.redirect ?? "/";
  }

  return (
    <main style={{ maxWidth: 520, margin: "48px auto", padding: 16 }}>
      <h1>Login</h1>
      <form onSubmit={login} style={{ display: "grid", gap: 10 }}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 10 }} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 10 }} />
        <button style={{ padding: "10px 14px" }}>Sign in</button>
      </form>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      <p style={{ fontSize: 13, opacity: 0.8 }}>
        Try: manager@buttertech.io / Password123! or user@buttertech.io / Password123!
      </p>
    </main>
  );
}
