export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <svg className="w-24 h-24 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-black">VIIZE VISION</h1>
          <p className="text-slate-500 font-medium">L'IA au service du stationnement urbain.</p>
        </div>

        <a 
          href="/dashboard" 
          className="inline-block w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all uppercase tracking-widest no-underline"
        >
          Entrer dans l'interface
        </a>
      </div>
    </div>
  )
}
