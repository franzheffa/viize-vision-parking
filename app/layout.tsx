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
        <div className="fixed top-6 right-6 z-50 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          Buttertech <span className="text-slate-400 font-medium">powered by</span>{" "}
          <span className="font-extrabold text-slate-900">Interac</span>
        </div>

        {children}
      </body>
    </html>
  );
}
