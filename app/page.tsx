import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#4B45E6] text-white">
      <header className="mx-auto max-w-6xl px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center">
            <span className="text-lg">🚗</span>
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">VIIZE</div>
            <div className="text-xs text-white/70">Vision Parking</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/reserve"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
          >
            Conducteur
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#4B45E6] hover:bg-white/90"
          >
            Manager
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-3xl bg-white/15 flex items-center justify-center">
            <span className="text-2xl">🚙</span>
          </div>

          <h1 className="mt-8 text-5xl md:text-6xl font-black tracking-tight">
            VIIZE VISION
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            L&apos;IA au service du stationnement urbain.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/reserve"
              className="rounded-2xl bg-white px-8 py-4 font-extrabold text-[#4B45E6] shadow-lg hover:bg-white/90"
            >
              ENTRER DANS L&apos;INTERFACE
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl bg-white/10 px-8 py-4 font-extrabold text-white border border-white/15 hover:bg-white/15"
            >
              OPERATIONS HUB
            </Link>
          </div>

          <div className="mt-6 text-xs text-white/60">
            Demo UI • Réservation • Pricing dynamique IA (live) • USD
          </div>

          <div className="mt-10 text-[12px] text-white/75">
            <span className="font-semibold">Buttertech</span>{" "}
            <span className="text-white/60">powered by</span>{" "}
            <span className="font-extrabold">Interac</span>
          </div>
        </div>
      </main>
    </div>
  );
}
