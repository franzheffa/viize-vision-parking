import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viize Vision Parking",
  description: "Copilote IA du stationnement (réservation, pricing, allocation, dashboard).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
