
import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center overflow-x-hidden font-sans relative">
      {/* Aurora Background Effect */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-emerald-950 overflow-hidden rounded-b-[5rem] shadow-2xl">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-400/30 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-teal-500/20 blur-[100px] rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-[20%] left-[30%] w-[30%] h-[30%] bg-lime-400/20 blur-[80px] rounded-full animate-pulse delay-1000"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative w-full pt-28 pb-32 px-8 max-w-md mx-auto text-center space-y-10 z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-white/20 blur-3xl scale-150"></div>
          <span className="text-8xl drop-shadow-[0_20px_50px_rgba(255,255,255,0.3)] inline-block animate-float">🚜</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white leading-[0.95] tracking-tighter italic">
            AGRO<span className="text-emerald-400">CHAIN</span> <br/>
            <span className="text-2xl not-italic font-extrabold text-emerald-100/60 uppercase tracking-[0.4em] block mt-4">Premium Tech</span>
          </h1>
          <p className="text-emerald-100/70 text-base font-medium leading-relaxed max-w-[300px] mx-auto">
            L'excellence agricole connectée. Du champ à votre table en un clic.
          </p>
        </div>
        
        <div className="pt-6">
          <button 
            onClick={onEnter}
            className="group relative bg-gradient-to-br from-amber-400 to-orange-500 text-emerald-950 font-black py-6 px-12 rounded-[2.5rem] text-sm uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(245,158,11,0.4)] active:scale-95 transition-all overflow-hidden border border-white/20"
          >
            <span className="relative z-10">Lancer l'App</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/2 left-0 text-4xl opacity-30 animate-float delay-150">🌾</div>
        <div className="absolute top-1/3 right-4 text-4xl opacity-30 animate-float delay-1000">📦</div>
      </section>

      {/* Stats Section Glass */}
      <section className="max-w-md w-full px-6 -mt-16 relative z-20">
        <div className="glass-card rounded-[3.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex justify-between gap-2 border border-white/50">
          <div className="text-center">
            <p className="text-3xl font-black text-emerald-900 tracking-tighter">500+</p>
            <p className="text-[9px] font-black text-emerald-600/60 uppercase tracking-widest mt-2">Agriculteurs</p>
          </div>
          <div className="w-[1px] bg-emerald-900/10 self-stretch"></div>
          <div className="text-center">
            <p className="text-3xl font-black text-emerald-900 tracking-tighter">12k</p>
            <p className="text-[9px] font-black text-emerald-600/60 uppercase tracking-widest mt-2">Ventes</p>
          </div>
          <div className="w-[1px] bg-emerald-900/10 self-stretch"></div>
          <div className="text-center">
            <p className="text-3xl font-black text-emerald-900 tracking-tighter">24h</p>
            <p className="text-[9px] font-black text-emerald-600/60 uppercase tracking-widest mt-2">Logistique</p>
          </div>
        </div>
      </section>

      {/* Role Previews */}
      <section className="max-w-md w-full p-10 space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Choisissez votre rôle</h2>
          <p className="text-3xl font-extrabold text-gray-900 tracking-tight italic uppercase">Agissez maintenant</p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {[
            { title: "Agriculteur", desc: "Monétisez vos récoltes", icon: "🌾", color: "from-emerald-400 to-emerald-600" },
            { title: "Acheteur", desc: "Fraîcheur garantie", icon: "🛒", color: "from-blue-400 to-blue-600" },
            { title: "Transporteur", desc: "Rentabilisez vos trajets", icon: "🚚", color: "from-orange-400 to-orange-600" }
          ].map((role, i) => (
            <div 
              key={i}
              className="group flex items-center gap-6 p-6 glass-card rounded-[3rem] shadow-sm hover:shadow-xl hover:translate-x-2 transition-all cursor-pointer active:scale-95"
              onClick={onEnter}
            >
              <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${role.color} flex items-center justify-center text-4xl shadow-xl shadow-inner border border-white/20 transition-transform group-hover:rotate-6`}>
                {role.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">{role.title}</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-semibold">{role.desc}</p>
              </div>
              <div className="text-emerald-500/30 group-hover:text-emerald-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto py-12 text-center">
        <div className="inline-block p-4 rounded-full glass-card border-white/20">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-emerald-950/40">Mali Sud Excellence • 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
