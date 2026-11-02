
import React from 'react';

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  markers?: { position: [number, number]; label: string; icon: string }[];
}

const MapView: React.FC<MapViewProps> = ({ markers = [] }) => {
  return (
    <div className="relative w-full h-48 bg-emerald-50 rounded-[2.5rem] border-4 border-white overflow-hidden shadow-2xl group ring-1 ring-gray-100">
      {/* Fond de carte stylisé */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_2px_2px,_rgba(0,0,0,0.05)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
      
      {/* Routes symboliques */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <path d="M0,50 Q150,150 400,100" stroke="currentColor" strokeWidth="8" fill="none" className="text-green-900" />
        <path d="M50,0 Q100,200 300,400" stroke="currentColor" strokeWidth="4" fill="none" className="text-green-900" />
      </svg>

      {/* Marqueurs stylisés */}
      {markers.map((m, i) => (
        <div 
          key={i}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 transition-transform duration-500 hover:scale-110"
          style={{ left: `${30 + (i * 30)}%`, top: `${40 + (i * 10)}%` }}
        >
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xl text-[9px] font-black border border-green-100 mb-1 whitespace-nowrap uppercase tracking-tighter text-green-800">
            {m.label}
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-40 animate-pulse"></div>
            <div className="text-3xl drop-shadow-2xl filter saturate-150 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
              {m.icon}
            </div>
          </div>
        </div>
      ))}

      {/* Légende minimaliste */}
      <div className="absolute top-4 left-4 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white shadow-sm">
        <p className="text-[8px] font-black text-green-800 uppercase tracking-widest">Zone Opérationnelle : Mali Sud</p>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-1">
        <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm flex items-center justify-center text-xs">➕</div>
        <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm flex items-center justify-center text-xs">➖</div>
      </div>
    </div>
  );
};

export default MapView;
