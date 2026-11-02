
import React from 'react';
import { Order, OrderStatus } from '../types';

interface InvoiceViewProps {
  order: Order;
  onBack: () => void;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({ order, onBack }) => {
  const taxRate = 0.05;
  const taxAmount = order.totalPrice * taxRate;
  const grandTotal = order.totalPrice + taxAmount;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AGRO-${order.id}-${order.totalPrice}`;

  return (
    <div className="min-h-screen p-4 pb-24 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-emerald-700 font-black text-[10px] uppercase tracking-widest active:scale-95 transition-transform"
      >
        <span className="bg-white/80 w-8 h-8 flex items-center justify-center rounded-xl shadow-sm border border-white">⬅️</span>
        Retour
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm mx-auto overflow-hidden border border-white relative">
        {/* Traçabilité Timeline */}
        <div className="bg-emerald-900 p-8 text-white">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-60 text-center">Parcours du produit</h3>
          <div className="flex justify-between items-start relative px-2">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-white/10"></div>
            {[
              { label: 'Récolte', icon: '🌱', active: true },
              { label: 'Transport', icon: '🚚', active: order.status !== OrderStatus.PENDING },
              { label: 'Livré', icon: '✅', active: order.status === OrderStatus.DELIVERED }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${step.active ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'bg-white/10 text-white/40'}`}>
                  {step.icon}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-tighter ${step.active ? 'opacity-100' : 'opacity-40'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tighter italic">AGROCHAIN</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Reçu #{order.id.slice(-6)}</p>
            </div>
            {order.deliveryPhoto && (
              <div className="group relative">
                <img src={order.deliveryPhoto} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-50 shadow-lg rotate-3" />
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[8px] p-1 rounded-md font-black">POD</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-dashed border-gray-100">
            <div>
              <p className="text-[9px] font-black text-gray-300 uppercase mb-1">Producteur</p>
              <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Zone Sud Mali</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-300 uppercase mb-1">Client</p>
              <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{order.clientName}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{order.productName}</p>
                <p className="text-[10px] font-bold text-gray-400">{order.quantity}kg • Prix Direct</p>
              </div>
              <p className="font-black text-gray-800 text-sm">{order.totalPrice} CFA</p>
            </div>
            
            <div className="pt-4 space-y-2 border-t border-gray-50">
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>Services Plateforme (5%)</span>
                <span>{taxAmount.toFixed(0)} CFA</span>
              </div>
              <div className="flex justify-between text-xl font-black text-emerald-800 pt-2">
                <span className="italic">TOTAL</span>
                <span>{grandTotal.toFixed(0)} CFA</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-8 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
            <img src={qrCodeUrl} alt="QR" className="w-32 h-32 mb-4 mix-blend-multiply opacity-80" />
            <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.4em]">Vérification Blockchain</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3 max-w-sm mx-auto">
        <button onClick={() => window.print()} className="flex-1 bg-gray-900 text-white font-black py-5 rounded-[1.8rem] shadow-xl text-[10px] uppercase tracking-widest active:scale-95 transition-all">🖨️ PDF</button>
        <button className="flex-1 bg-emerald-600 text-white font-black py-5 rounded-[1.8rem] shadow-xl text-[10px] uppercase tracking-widest active:scale-95 transition-all">📩 Partager</button>
      </div>
    </div>
  );
};

export default InvoiceView;
