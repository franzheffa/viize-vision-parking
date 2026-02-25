import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#4B45E6]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <span className="text-lg text-white">🚗</span>
          </div>
          <div className="text-white">
            <div className="text-sm font-bold tracking-wide">VIIZE</div>
            <div className="text-[11px] text-white/70 -mt-0.5">Vision Parking</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Link
            href="/reserve"
            className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
          >
            Conducteur
          </Link>
          <Link
            href="/dashboard"
            className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
          >
            Manager
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="mx-auto grid max-w-2xl place-items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/15 ring-1 ring-white/20">
            <span className="text-2xl text-white">🚙</span>
          </div>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
            VIIZE VISION
          </h1>
          <p className="mt-3 text-lg text-white/80">
            L'IA au service du stationnement urbain.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/reserve"
              className="rounded-2xl bg-white px-8 py-4 text-sm font-extrabold tracking-wide text-[#4B45E6] shadow-lg shadow-black/20 hover:opacity-95"
            >
              ENTRER DANS L'INTERFACE
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl bg-white/10 px-8 py-4 text-sm font-extrabold tracking-wide text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              OPERATIONS HUB
            </Link>
          </div>

          <div className="mt-10 text-xs text-white/60">
            Demo UI • Réservation • Pricing dynamique IA (live) • USD
          </div>
        </div>
      </main>
    </div>
  );
}
