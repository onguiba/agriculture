
import React from 'react';
import { User } from '../types';

interface TransporterDetailsProps {
  transporter: User;
  onBack: () => void;
}

const TransporterDetails: React.FC<TransporterDetailsProps> = ({ transporter, onBack }) => {
  // Mock extended data for MVP display
  const vehicleInfo = {
    type: transporter.id === 't1' ? 'Camion Plateau' : 'Pickup 4x4',
    capacity: transporter.id === 't1' ? '10 Tonnes' : '2 Tonnes',
    license: 'Catégorie C',
    licenseExpiry: '12/10/2026',
    experience: '5 ans',
    plateNumber: transporter.id === 't1' ? 'AM-4432-B2' : 'BM-9012-M1',
    availabilityStatus: 'Disponible immédiatement'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-4 active:scale-95 transition-transform"
      >
        <span className="bg-emerald-50 w-8 h-8 flex items-center justify-center rounded-xl">⬅️</span>
        Retour
      </button>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="h-32 bg-emerald-900 flex items-end p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-lg flex items-center justify-center text-3xl border-4 border-white translate-y-8 z-10">
            🚚
          </div>
        </div>
        
        <div className="pt-12 p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tight italic uppercase">{transporter.name}</h2>
              <p className="text-gray-400 text-xs font-bold mt-1">{transporter.phone}</p>
            </div>
            <div className="bg-yellow-50 px-3 py-1.5 rounded-full flex items-center gap-1 border border-yellow-100 shadow-sm">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="font-black text-yellow-700 text-xs">{transporter.rating}</span>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Spécifications Véhicule</h3>
              <span className="h-px flex-1 bg-gray-100"></span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Modèle</p>
                <p className="font-black text-gray-800 text-xs uppercase">{vehicleInfo.type}</p>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Capacité Max</p>
                <p className="font-black text-gray-800 text-xs uppercase">{vehicleInfo.capacity}</p>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Immatriculation</p>
                <p className="font-black text-emerald-700 text-xs uppercase tracking-tighter">{vehicleInfo.plateNumber}</p>
              </div>
              <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                <p className="text-[9px] text-orange-400 uppercase font-black tracking-widest mb-1">Exp. Licence</p>
                <p className="font-black text-orange-700 text-xs uppercase">{vehicleInfo.licenseExpiry}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Zone de Couverture</h3>
              <div className="flex flex-wrap gap-2">
                {transporter.zone.split(',').map((z, i) => (
                  <span key={i} className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-2 rounded-xl border border-emerald-100 uppercase tracking-tighter">
                    {z.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Profil Professionnel</h3>
              <div className="space-y-4 bg-emerald-50/30 p-5 rounded-[2rem] border border-emerald-100/50">
                <div className="flex justify-between items-center border-b border-emerald-100/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🪪</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Type de Permis</span>
                  </div>
                  <span className="font-black text-emerald-900 text-xs">{vehicleInfo.license}</span>
                </div>
                <div className="flex justify-between items-center border-b border-emerald-100/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏳</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Ancienneté</span>
                  </div>
                  <span className="font-black text-emerald-900 text-xs">{vehicleInfo.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✅</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Disponibilité</span>
                  </div>
                  <span className="font-black text-emerald-600 text-[10px] uppercase">{vehicleInfo.availabilityStatus}</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full mt-10 bg-emerald-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-100 active:scale-95 transition-all uppercase text-[10px] tracking-[0.2em]">
            Contacter le transporteur
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransporterDetails;
