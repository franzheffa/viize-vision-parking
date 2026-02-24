import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#4F46E5] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-8">
        <div className="bg-white/20 p-6 rounded-3xl mb-4">
          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        
        <h1 className="text-6xl font-black text-white tracking-tighter italic">VIIZE VISION</h1>
        <p className="text-white/80 text-lg font-medium">L'IA au service du stationnement urbain.</p>
        
        <Link href="/reserve" className="w-full bg-white text-[#4F46E5] py-5 rounded-2xl text-xl font-bold hover:bg-opacity-90 transition-all shadow-xl">
          ENTRER DANS L'INTERFACE
        </Link>
      </div>
    </main>
  );
}
