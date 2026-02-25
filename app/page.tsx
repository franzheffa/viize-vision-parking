import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#4b4fdc] text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/15" />
          <div className="text-left">
            <div className="text-sm font-semibold">VIIZE</div>
            <div className="text-xs text-white/70">Vision Parking</div>
          </div>
        </div>

        <div className="mb-10 rounded-2xl bg-white/10 px-6 py-5">
          <div className="mx-auto mb-6 h-12 w-12 rounded-2xl bg-white/10" />
          <h1 className="text-5xl font-black tracking-tight">VIIZE VISION</h1>
          <p className="mt-3 text-white/80">L&apos;IA au service du stationnement urbain.</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reserve"
              className="w-72 rounded-xl bg-white px-6 py-4 text-center text-sm font-extrabold text-[#3b3fd1] shadow-lg"
            >
              ENTRER DANS L&apos;INTERFACE
            </Link>

            <Link
              href="/dashboard"
              className="w-72 rounded-xl bg-white/10 px-6 py-4 text-center text-sm font-extrabold text-white ring-1 ring-white/20"
            >
              OPERATIONS HUB
            </Link>
          </div>

          <div className="mt-8 text-xs text-white/60">
            Demo UI · Réservation · Pricing dynamique IA (live) · USD
          </div>
        </div>
      </div>
    </main>
  );
}
