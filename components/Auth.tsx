
import React, { useState } from 'react';
import { UserRole, User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onBackToLanding?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBackToLanding }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'roles'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 8) setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') setStep('roles'); // Mock OTP
    else alert("Code erroné (essayez 123456)");
  };

  const toggleRole = (role: UserRole) => {
    setSelectedRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleFinalize = () => {
    if (!name || selectedRoles.length === 0) return;
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      phone,
      roles: selectedRoles,
      zone: 'Zone par défaut',
      rating: 5.0
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 space-y-8 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>

        <button 
          onClick={step === 'phone' ? onBackToLanding : () => setStep(step === 'roles' ? 'otp' : 'phone')}
          className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 active:scale-90 transition-transform z-10"
        >
          ⬅️
        </button>

        <div className="text-center pt-4">
          <span className="text-6xl drop-shadow-xl inline-block animate-bounce-slow">🚜</span>
          <h1 className="text-3xl font-black text-emerald-900 mt-6 tracking-tighter italic">AGROCHAIN</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Le pont entre la terre et vous</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Numéro de téléphone</label>
              <input 
                type="tel" 
                placeholder="Ex: +223 70 00 00 00"
                className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-gray-700"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-emerald-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-100 active:scale-95 transition-all uppercase text-[10px] tracking-[0.2em]">
              Continuer vers l'OTP
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-xs font-bold text-gray-600">Code envoyé au <span className="text-emerald-600">{phone}</span></p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">(Utilisez 123456)</p>
            </div>
            <input 
              type="text" 
              placeholder="000 000"
              maxLength={6}
              className="w-full p-5 bg-gray-50 border-none rounded-2xl text-center text-3xl tracking-[0.5em] font-black focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="w-full bg-emerald-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-100 active:scale-95 transition-all uppercase text-[10px] tracking-[0.2em]">
              Vérifier l'identité
            </button>
          </form>
        )}

        {step === 'roles' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom Complet / Coopérative</label>
              <input 
                type="text" 
                placeholder="Ex: Moussa Traoré"
                className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Choisissez vos rôles</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: UserRole.FARMER, label: 'Agriculteur', icon: '🌾', desc: 'Je vends mes récoltes' },
                  { id: UserRole.CLIENT, label: 'Acheteur', icon: '🛒', desc: 'Je souhaite commander' },
                  { id: UserRole.TRANSPORTER, label: 'Transporteur', icon: '🚚', desc: 'Je propose mes services' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => toggleRole(r.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                      selectedRoles.includes(r.id) 
                      ? 'border-emerald-500 bg-emerald-50/50' 
                      : 'border-gray-50 bg-gray-50'
                    }`}
                  >
                    <span className="text-3xl">{r.icon}</span>
                    <div className="flex-1">
                      <p className="font-black text-gray-800 text-xs uppercase tracking-tight">{r.label}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{r.desc}</p>
                    </div>
                    {selectedRoles.includes(r.id) && (
                      <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleFinalize}
              disabled={!name || selectedRoles.length === 0}
              className="w-full bg-emerald-900 text-white font-black py-5 rounded-[2rem] shadow-xl disabled:opacity-30 active:scale-95 transition-all uppercase text-[10px] tracking-[0.2em]"
            >
              Créer mon accès
            </button>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Auth;
