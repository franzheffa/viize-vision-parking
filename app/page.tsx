import { Car, ShieldCheck, Zap, ChevronRight, Crown } from 'lucide-react'

export default function LandingPage() {
  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px', 
      fontFamily: 'system-ui, sans-serif',
      backgroundImage: 'radial-gradient(circle at top right, rgba(212,175,55,0.05), transparent 400px)' 
    }}>
      <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        
        {/* Logo / Illustration */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ 
            display: 'inline-block', 
            backgroundColor: '#000', 
            padding: '30px', 
            borderRadius: '40px', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            border: '1px solid #D4AF37',
            position: 'relative'
          }}>
            <Car size={64} color="#D4AF37" strokeWidth={1} />
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#D4AF37', borderRadius: '50%', padding: '8px' }}>
              <Zap size={16} color="#000" fill="#000" />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ 
            color: '#D4AF37', 
            fontSize: '11px', 
            fontWeight: '900', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase',
            backgroundColor: 'rgba(212,175,55,0.1)',
            padding: '8px 20px',
            borderRadius: '50px'
          }}>
            Premium Experience
          </span>
        </div>

        <h1 style={{ fontSize: '75px', fontWeight: '900', color: '#000', letterSpacing: '-0.06em', textTransform: 'uppercase', lineHeight: '0.85', margin: '0 0 30px 0', fontStyle: 'italic' }}>
          VIIZE<br/><span style={{ color: '#D4AF37' }}>VISION</span>
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444', fontSize: '13px', fontWeight: '700' }}>
            <ShieldCheck size={18} color="#D4AF37" /> SÉCURITÉ
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444', fontSize: '13px', fontWeight: '700' }}>
            <Crown size={18} color="#D4AF37" /> PRESTIGE
          </div>
        </div>

        <a 
          href="/dashboard" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '15px',
            width: '100%', 
            padding: '24px', 
            backgroundColor: '#000', 
            color: '#fff', 
            borderRadius: '24px', 
            fontWeight: '900', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em', 
            textDecoration: 'none',
            boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          Accéder au Panel <ChevronRight size={20} strokeWidth={3} />
        </a>
      </div>
    </div>
  )
}
