
import React, { useState } from 'react';
import { Order, OrderStatus, User, UserRole } from '../types';
import { mockTransporters } from '../mockData';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus, transporterId?: string) => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onUpdateStatus, onBack }) => {
  const [filter, setFilter] = useState<'ALL' | 'DISPUTE' | 'LOGISTICS'>('ALL');
  const [assigningOrderId, setAssigningOrderId] = useState<string | null>(null);

  const stats = {
    activeUsers: 42,
    totalVolume: orders.reduce((acc, curr) => acc + curr.totalPrice, 0),
    deliveredCount: orders.filter(o => o.status === OrderStatus.DELIVERED).length,
    successRate: Math.round((orders.filter(o => o.status === OrderStatus.DELIVERED).length / (orders.length || 1)) * 100)
  };

  const pendingLogistics = orders.filter(o => o.status === OrderStatus.PENDING);

  const handleAssign = (orderId: string, transporter: User) => {
    onUpdateStatus(orderId, OrderStatus.ASSIGNED, transporter.id);
    setAssigningOrderId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in relative">
      {/* Header Admin */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-30">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-emerald-700 transition-colors"
        >
          <span className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-xl">⬅️</span>
          Quitter l'Admin
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Console Admin</span>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-32">
        {/* Analytics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Volume Total</p>
            <p className="text-xl font-black text-gray-800">{stats.totalVolume.toLocaleString()} <span className="text-[10px] text-emerald-600">CFA</span></p>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Succès</p>
            <p className="text-xl font-black text-green-600">{stats.successRate}%</p>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-3 py-2">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            {filter === 'ALL' ? 'Flux Global' : filter === 'LOGISTICS' ? 'Attribution Logistique' : 'Gestion des Litiges'}
          </h3>
          <span className="h-px flex-1 bg-gray-200"></span>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {(filter === 'LOGISTICS' ? pendingLogistics : orders).length === 0 ? (
            <div className="py-20 text-center">
              <span className="text-4xl block mb-4 grayscale opacity-50">📁</span>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Aucune donnée correspondante</p>
            </div>
          ) : (
            (filter === 'LOGISTICS' ? pendingLogistics : orders).map(o => (
              <div key={o.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-mono text-gray-300 uppercase tracking-tighter mb-1">ID: {o.id.slice(-6)}</p>
                    <h4 className="font-black text-gray-800 text-lg">{o.productName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">{o.clientName}</span>
                      <span className="text-gray-300">➔</span>
                      <span className="text-[9px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">{o.destination}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                    o.status === OrderStatus.DELIVERED ? 'bg-green-600 text-white' : 
                    o.status === OrderStatus.PENDING ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {o.status}
                  </span>
                </div>

                {assigningOrderId === o.id ? (
                  <div className="bg-blue-50 p-5 rounded-[2rem] space-y-3 border border-blue-100 animate-in fade-in slide-in-from-top-4">
                    <p className="text-[9px] font-black text-blue-700 uppercase tracking-[0.3em] mb-2 text-center">Transporteurs Disponibles</p>
                    <div className="space-y-2">
                      {mockTransporters.map(t => (
                        <button 
                          key={t.id}
                          onClick={() => handleAssign(o.id, t)}
                          className="w-full bg-white p-4 rounded-2xl border border-blue-100 text-left hover:border-blue-400 transition-all shadow-sm active:scale-95"
                        >
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-black text-gray-800">{t.name}</p>
                            <span className="text-[10px] font-black text-yellow-600">{t.rating} ★</span>
                          </div>
                          <p className="text-[9px] text-gray-400 uppercase tracking-tighter mt-1">{t.zone}</p>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setAssigningOrderId(null)} className="w-full text-[9px] font-black text-blue-400 py-2 uppercase tracking-widest">Annuler</button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-4 border-t border-dashed border-gray-100">
                    {o.status === OrderStatus.PENDING && (
                      <button 
                        onClick={() => setAssigningOrderId(o.id)}
                        className="flex-1 bg-blue-600 text-white text-[10px] font-black py-4 rounded-2xl uppercase tracking-[0.2em] shadow-lg shadow-blue-100 active:scale-95 transition-all"
                      >
                        🚚 Assigner
                      </button>
                    )}
                    <button 
                      onClick={() => confirm("Suspendre ce compte ?") && alert("Action effectuée.")}
                      className="flex-1 bg-gray-900 text-white text-[10px] font-black py-4 rounded-2xl uppercase tracking-[0.2em] active:scale-95 transition-all"
                    >
                      ⚠️ Litige
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Admin Navigation Bar - Fixée en bas */}
      <nav className="fixed bottom-6 left-6 right-6 max-w-[calc(448px-3rem)] mx-auto bg-gray-900/95 backdrop-blur-xl rounded-[2.5rem] flex justify-around p-3 z-50 shadow-2xl border border-white/10 ring-4 ring-black/5">
        {[
          { id: 'ALL', icon: '🌍', label: 'Flux', count: orders.length },
          { id: 'LOGISTICS', icon: '🚚', label: 'Logistique', count: pendingLogistics.length, highlight: pendingLogistics.length > 0 },
          { id: 'DISPUTE', icon: '🚨', label: 'Litiges', count: 0 }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`flex flex-col items-center gap-1 p-3 transition-all rounded-[1.5rem] min-w-[80px] relative ${
              filter === item.id ? 'bg-white text-gray-900 shadow-xl scale-110' : 'text-gray-500'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
            {item.count > 0 && (
              <span className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black border-2 ${
                item.highlight ? 'bg-red-500 text-white border-white animate-pulse' : 'bg-gray-200 text-gray-600 border-gray-900'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminDashboard;
