import React from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#4F46E5] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#4F46E5] p-3 rounded-2xl mb-4 text-white">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-800 italic tracking-tighter">BIENVENUE</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Connectez-vous à Viize</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email</label>
            <input type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" placeholder="admin@viize.io" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mot de passe</label>
            <input type="password" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" placeholder="••••••••" />
          </div>
          <button className="w-full bg-[#4F46E5] text-white py-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all uppercase tracking-widest shadow-lg shadow-indigo-200">
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
}
