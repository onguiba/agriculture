
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Marketplace from './components/Marketplace';
import AgroIA from './components/AgroIA';
import TransporterDetails from './components/TransporterDetails';
import TransporterModule from './components/TransporterModule';
import InvoiceView from './components/InvoiceView';
import AdminDashboard from './components/AdminDashboard';
import MapView from './components/MapView';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import StarRating from './components/StarRating';
import { UserRole, Product, Order, OrderStatus, User, Notification } from './types';
import { mockOrders, mockProducts as initialProducts } from './mockData';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('market');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedTransporter, setSelectedTransporter] = useState<User | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Order | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('agrochain_user');
    if (saved) {
      setUser(JSON.parse(saved));
      setShowLanding(false);
    }
  }, []);

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      time: 'À l\'instant',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateOrderStatus = (orderId: string, nextStatus: OrderStatus, photo?: string, transporterId?: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          if (nextStatus === OrderStatus.ASSIGNED) {
            addNotification('Chauffeur en route', `Votre commande est prise en charge par ${transporterId || 'un expert'}.`, 'delivery');
          } else if (nextStatus === OrderStatus.DELIVERED) {
            addNotification('Colis arrivé !', `Produit livré. Merci de noter votre expérience.`, 'order');
          }
          return { 
            ...order, 
            status: nextStatus, 
            deliveryPhoto: photo || order.deliveryPhoto, 
            transporterId: transporterId || order.transporterId,
            isPaid: nextStatus === OrderStatus.DELIVERED ? true : order.isPaid
          };
        }
        return order;
      })
    );
  };

  const handleCreateOrder = (product: Product, requestedQty: number = 10) => {
    if (!user) return;
    if (product.quantity < requestedQty) {
      alert("Stock insuffisant.");
      return;
    }

    const distanceSim = Math.floor(Math.random() * 150) + 10;
    const deliveryFee = distanceSim * 50;

    const newOrder: Order = {
      id: `o${Date.now()}`,
      productId: product.id,
      productName: product.name,
      clientId: user.id,
      clientName: user.name,
      farmerId: product.farmerId,
      quantity: requestedQty,
      totalPrice: (requestedQty * product.pricePerUnit) + deliveryFee,
      status: OrderStatus.PENDING,
      destination: user.zone || 'Bamako Centre',
      paymentMethod: 'CASH'
    };

    setProducts(prev => prev.map(p => {
      const newQty = p.id === product.id ? p.quantity - requestedQty : p.quantity;
      if (p.id === product.id && newQty < 50) {
         addNotification('Stock Bas', `${p.name} : Il ne reste plus que ${newQty}kg !`, 'system');
      }
      return { ...p, quantity: newQty };
    }));

    setOrders([...orders, newOrder]);
    addNotification('Commande envoyée', `Total: ${newOrder.totalPrice} CFA. En attente d'un transporteur.`, 'order');
    setActiveTab('profile');
  };

  if (showLanding) return <LandingPage onEnter={() => setShowLanding(false)} />;
  if (!user) return <Auth onLogin={(u) => { setUser(u); localStorage.setItem('agrochain_user', JSON.stringify(u)); }} onBackToLanding={() => setShowLanding(true)} />;
  if (isAdminView) return <AdminDashboard orders={orders} onUpdateStatus={updateOrderStatus} onBack={() => setIsAdminView(false)} />;

  const renderContent = () => {
    if (viewingInvoice) return <InvoiceView order={viewingInvoice} onBack={() => setViewingInvoice(null)} />;
    if (selectedTransporter) return <TransporterDetails transporter={selectedTransporter} onBack={() => setSelectedTransporter(null)} />;

    switch (activeTab) {
      case 'market': return <Marketplace onOrder={handleCreateOrder} products={products} />;
      case 'ai': return <AgroIA />;
      case 'farmer':
        return (
          <div className="space-y-6 animate-fade-in pb-20">
            <h2 className="text-2xl font-black text-gray-800 tracking-tight italic uppercase">Mes Ventes</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-[2rem] border-white/60 shadow-lg">
                <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Vendu</p>
                <p className="text-xl font-black text-gray-800 tracking-tighter">1.2M <span className="text-[10px]">CFA</span></p>
              </div>
              <div className="glass-card p-6 rounded-[2rem] border-white/60 shadow-lg">
                <p className="text-[8px] font-black text-orange-600 uppercase tracking-widest mb-1">Commandes</p>
                <p className="text-xl font-black text-gray-800 tracking-tighter">{orders.filter(o => o.farmerId === user.id || o.farmerId === 'f1').length}</p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-[2rem] font-black shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-95 transition-all text-xs uppercase tracking-widest">
              <span className="text-2xl">➕</span> Nouvelle Récolte
            </button>
            <div className="space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">Flux de commandes</p>
              {orders.filter(o => o.farmerId === user.id || o.farmerId === 'f1').reverse().map(o => (
                <div key={o.id} className="p-6 glass-card rounded-[2.5rem] flex justify-between items-center transition-all hover:translate-x-1">
                  <div>
                    <p className="font-black text-gray-800 text-sm">{o.productName}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{o.clientName} • {o.quantity}kg</p>
                  </div>
                  <span className={`text-[8px] font-black px-3 py-1.5 rounded-full uppercase ${
                    o.status === OrderStatus.DELIVERED ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600 animate-pulse'
                  }`}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'logistics':
        return <TransporterModule user={user} orders={orders} onUpdateOrderStatus={updateOrderStatus} />;
      case 'profile':
        return (
          <div className="space-y-6 animate-fade-in pb-20">
            <div className="bg-emerald-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border border-emerald-800/50">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center text-4xl mb-4 border border-white/10 shadow-inner group">
                  <span className="group-hover:scale-125 transition-transform duration-500">{user.roles.includes(UserRole.FARMER) ? '👨‍🌾' : '🛒'}</span>
                </div>
                <h2 className="text-2xl font-black tracking-tighter italic uppercase">{user.name}</h2>
                <div className="mt-4 flex items-center gap-3 bg-white/5 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md">
                   <StarRating rating={user.rating} />
                   <span className="text-[10px] font-black text-emerald-400">{user.rating}</span>
                </div>
              </div>
            </div>

            {user.roles.includes(UserRole.ADMIN) && (
              <button onClick={() => setIsAdminView(true)} className="w-full bg-white/10 backdrop-blur-md text-gray-800 font-black py-6 rounded-[2.2rem] text-[9px] uppercase tracking-[0.4em] shadow-lg active:scale-95 transition-all border border-white">
                Console Administration 🛠️
              </button>
            )}

            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-2">Historique d'achat</h3>
              {orders.filter(o => o.clientId === user.id).reverse().map(o => (
                <div key={o.id} className="p-6 glass-card rounded-[2.8rem] shadow-sm space-y-5 transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-gray-800 text-lg tracking-tight italic">{o.productName}</p>
                      <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1">{o.totalPrice} CFA Total</p>
                    </div>
                    <span className={`text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${
                      o.status === OrderStatus.DELIVERED ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {o.status}
                    </span>
                  </div>
                  
                  {o.status === OrderStatus.DELIVERED && !o.isPaid && (
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                      <p className="text-[9px] font-black text-emerald-800 uppercase tracking-widest mb-3 text-center">Noter la prestation</p>
                      <div className="flex justify-center">
                        <StarRating rating={0} interactive onRatingChange={() => alert("Merci pour votre avis !")} />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => setViewingInvoice(o)} className="flex-1 py-4 bg-white/60 text-[8px] font-black uppercase tracking-[0.2em] rounded-2xl active:bg-white border border-white shadow-sm">Facture</button>
                    <button className="flex-1 py-4 bg-emerald-50/50 text-emerald-700 text-[8px] font-black uppercase tracking-[0.2em] rounded-2xl active:bg-emerald-100 border border-emerald-100/30">Suivi</button>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={() => { setUser(null); localStorage.removeItem('agrochain_user'); setShowLanding(true); }} className="w-full text-red-500/30 font-black py-10 text-[9px] uppercase tracking-[0.5em] hover:text-red-500 transition-colors">
              Fermer la session
            </button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRoles={user.roles} notifications={notifications}>
      {renderContent()}
    </Layout>
  );
};

export default App;
