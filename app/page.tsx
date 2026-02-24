export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-6 font-sans selection:bg-[#D4AF37] selection:text-white">
      <div className="max-w-2xl w-full text-center space-y-12">
        
        {/* Logo / Brand Section */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-black tracking-[0.3em] uppercase rounded-full mb-4">
            Smart Vision System
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-black tracking-tighter uppercase italic leading-[0.8]">
            VIIZE<br/>VISION
          </h1>
          <p className="text-slate-400 text-lg font-medium tracking-tight">
            L'excellence de l'IA au service du stationnement urbain.
          </p>
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-center space-y-6">
          <a 
            href="/dashboard" 
            className="group relative inline-flex items-center justify-center px-12 py-5 bg-black text-white overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span className="relative z-10 font-black uppercase tracking-[0.2em] text-sm">
              Entrer dans l'interface
            </span>
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          
          <div className="flex items-center space-x-4 opacity-20">
            <div className="h-[1px] w-12 bg-black"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">Premium Access</span>
            <div className="h-[1px] w-12 bg-black"></div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
        © 2026 Viize Vision Parking — All Rights Reserved
      </div>
    </div>
  )
}
