
import React, { useState, useRef } from 'react';
import { Order, OrderStatus, User } from '../types';

interface TransporterModuleProps {
  user: User;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, photo?: string) => void;
}

const TransporterModule: React.FC<TransporterModuleProps> = ({ user, orders, onUpdateOrderStatus }) => {
  const [view, setView] = useState<'missions' | 'history'>('missions');
  const [capturingPhotoFor, setCapturingPhotoFor] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeDeliveries = orders.filter(o => 
    (o.status === OrderStatus.ASSIGNED || o.status === OrderStatus.IN_PROGRESS || o.status === OrderStatus.IN_DELIVERY) && 
    (o.transporterId === user.id)
  );

  const handleStartCamera = async (orderId: string) => {
    setCapturingPhotoFor(orderId);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Erreur caméra:", err);
      alert("Impossible d'accéder à la caméra");
      setCapturingPhotoFor(null);
    }
  };

  const takePhoto = (orderId: string) => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      // Stopper la caméra
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      
      onUpdateOrderStatus(orderId, OrderStatus.DELIVERED, dataUrl);
      setCapturingPhotoFor(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <h2 className="text-2xl font-black text-gray-800 tracking-tight">Espace Transporteur</h2>
      
      <div className="flex bg-white/50 backdrop-blur-md p-1 rounded-2xl border border-white/40 shadow-sm">
        <button onClick={() => setView('missions')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${view === 'missions' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400'}`}>Missions</button>
        <button onClick={() => setView('history')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${view === 'history' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400'}`}>Historique</button>
      </div>

      {capturingPhotoFor && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6">
          <video ref={videoRef} className="w-full rounded-[2rem] bg-gray-900 aspect-square object-cover" />
          <div className="mt-8 flex gap-4 w-full">
            <button onClick={() => setCapturingPhotoFor(null)} className="flex-1 py-5 bg-white/10 text-white font-black rounded-2xl uppercase text-[10px]">Annuler</button>
            <button onClick={() => takePhoto(capturingPhotoFor)} className="flex-1 py-5 bg-emerald-500 text-white font-black rounded-2xl uppercase text-[10px] shadow-xl shadow-emerald-500/40">Capturer & Livrer</button>
          </div>
        </div>
      )}

      {view === 'missions' && (
        <div className="space-y-5">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-[2.5rem]">
              <span className="text-4xl block mb-2">🚛</span>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">En attente de nouvelles missions</p>
            </div>
          ) : (
            activeDeliveries.map(order => (
              <div key={order.id} className="glass-card rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 transition-all border-white/60">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      order.status === OrderStatus.IN_PROGRESS ? 'bg-orange-100 text-orange-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {order.status === OrderStatus.IN_PROGRESS ? 'Course en cours' : 'Mission Active'}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase">{order.quantity} KG</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-800">{order.productName}</h3>
                  
                  <div className="space-y-3 bg-white/40 p-4 rounded-2xl border border-white/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <p className="text-xs font-bold text-gray-600">Ramassage: Zone Agricole</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <p className="text-xs font-bold text-gray-600">Livraison: {order.destination}</p>
                    </div>
                  </div>

                  {order.status === OrderStatus.ASSIGNED && (
                    <button 
                      onClick={() => onUpdateOrderStatus(order.id, OrderStatus.IN_PROGRESS)} 
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-100 active:scale-95 transition-all uppercase text-[10px] tracking-widest"
                    >
                      Démarrer la course 🏁
                    </button>
                  )}

                  {order.status === OrderStatus.IN_PROGRESS && (
                    <button 
                      onClick={() => handleStartCamera(order.id)} 
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-100 active:scale-95 transition-all uppercase text-[10px] tracking-widest"
                    >
                      Prendre Photo & Terminer ✅
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === 'history' && (
        <div className="space-y-4">
           {orders.filter(o => o.status === OrderStatus.DELIVERED && o.transporterId === user.id).map(order => (
             <div key={order.id} className="p-4 glass-card rounded-2xl opacity-80 flex items-center gap-4">
                {order.deliveryPhoto && <img src={order.deliveryPhoto} className="w-12 h-12 rounded-xl object-cover" />}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-black text-gray-800">{order.productName}</p>
                    <p className="text-[10px] font-bold text-emerald-600">+{order.totalPrice} CFA</p>
                  </div>
                  <p className="text-[9px] text-gray-400 uppercase mt-1">Livré à {order.destination}</p>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default TransporterModule;
