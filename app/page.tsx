export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        
        {/* Badge Or */}
        <div style={{ display: 'inline-block', padding: '4px 12px', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '10px', fontWeight: '900', letterSpacing: '0.3em', textTransform: 'uppercase', borderRadius: '99px', marginBottom: '32px' }}>
          Smart Vision System
        </div>

        {/* Titre Noir Massif */}
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: '900', color: '#000000', letterSpacing: '-0.05em', textTransform: 'uppercase', lineHeight: '0.9', margin: '0 0 24px 0', fontStyle: 'italic' }}>
          VIIZE<br/>VISION
        </h1>

        <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '500', marginBottom: '48px' }}>
          L'excellence de l'IA au service du stationnement urbain.
        </p>

        {/* Bouton Noir & Or */}
        <a 
          href="/dashboard" 
          style={{ display: 'inline-block', width: '100%', padding: '20px', backgroundColor: '#000000', color: '#ffffff', borderRadius: '16px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
        >
          Entrer dans l'interface
        </a>

        {/* Footer */}
        <div style={{ marginTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', opacity: 0.3 }}>
          <div style={{ h: '1px', width: '40px', backgroundColor: '#000' }}></div>
          <span style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', color: '#000' }}>Premium Access</span>
          <div style={{ h: '1px', width: '40px', backgroundColor: '#000' }}></div>
        </div>
      </div>
    </div>
  )
}
