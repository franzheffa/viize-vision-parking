import { ShieldCheck, Zap, ChevronRight, Crown, Car } from 'lucide-react'

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
        
        {/* Sketch de voiture stylisé */}
        <div style={{ marginBottom: '30px' }}>
          <svg width="180" height="80" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8C3 8 4 3 7 2C10 1 14 1 17 2C20 3 21 8 21 8H22C22.5 8 23 8.5 23 9V11H1V9C1 8.5 1.5 8 2 8H3Z" stroke="#D4AF37" strokeWidth="0.5" />
            <circle cx="7" cy="10" r="1.5" fill="#111" stroke="#D4AF37" strokeWidth="0.5" />
            <circle cx="17" cy="10" r="1.5" fill="#111" stroke="#D4AF37" strokeWidth="0.5" />
            <path d="M5 8L7 4H17L19 8" stroke="#D4AF37" strokeWidth="0.3" strokeDasharray="1 1" />
          </svg>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '10px', fontWeight: '800', letterSpacing: '0.3em', textTransform: 'uppercase', borderRadius: '4px', marginBottom: '20px' }}>
          <Crown size={12} /> Viize Vision AI
        </div>

        <h1 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: '0.8', marginBottom: '40px' }}>
          PRECISION<br/><span style={{ color: '#D4AF37' }}>PARKING</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
          <div style={{ background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #222' }}>
            <Zap size={20} color="#D4AF37" />
            <div style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>RÉSERVATION LIVE</div>
          </div>
          <div style={{ background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #222' }}>
            <ShieldCheck size={20} color="#D4AF37" />
            <div style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>ACCÈS SÉCURISÉ</div>
          </div>
        </div>

        <a 
          href="/dashboard" 
          style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            width: '100%', padding: '22px', backgroundColor: '#D4AF37', color: '#000', 
            borderRadius: '8px', fontWeight: '900', textTransform: 'uppercase', 
            textDecoration: 'none', transition: '0.2s'
          }}
        >
          Ouvrir le Panel <ChevronRight size={20} />
        </a>
      </div>
    </div>
  )
}
