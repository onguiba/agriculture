
import React, { useState } from 'react';
import { UserRole, Notification } from '../types';
import Notifications from './Notifications';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRoles: UserRole[];
  notifications: Notification[];
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userRoles, notifications }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen pb-32 flex flex-col max-w-md mx-auto relative overflow-hidden font-sans selection:bg-emerald-200">
      <header className="bg-white/60 backdrop-blur-xl p-5 sticky top-0 z-[60] flex justify-between items-center border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        <h1 className="text-xl font-extrabold flex items-center gap-2 tracking-tighter bg-gradient-to-r from-emerald-800 to-emerald-500 bg-clip-text text-transparent">
          <span className="text-2xl filter drop-shadow-md">🚜</span> AgroChain
        </h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative w-11 h-11 flex items-center justify-center bg-white/80 rounded-2xl border border-white/40 shadow-sm active:scale-90 transition-all hover:bg-white"
          >
            <span className="text-lg">🔔</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-tr from-red-500 to-pink-500 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-white shadow-lg">
                {unreadCount}
              </span>
            )}
          </button>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-emerald-500/20 ring-2 ring-white/50">
            MT
          </div>
        </div>
      </header>

      {showNotifs && (
        <Notifications 
          notifications={notifications} 
          onClose={() => setShowNotifs(false)} 
          onMarkRead={() => {}}
        />
      )}

      <main className="flex-1 p-5 overflow-y-auto">
        {children}
      </main>

      {/* Navigation Glassmorphism */}
      <nav className="fixed bottom-8 left-5 right-5 max-w-[calc(448px-2.5rem)] mx-auto glass-nav rounded-[2.5rem] flex justify-around p-3 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
        {[
          { id: 'market', icon: '🛒', label: 'Marché' },
          { id: 'farmer', icon: '🌾', label: 'Ventes', role: UserRole.FARMER },
          { id: 'logistics', icon: '🚚', label: 'Logistique', role: UserRole.TRANSPORTER },
          { id: 'ai', icon: '✨', label: 'AgroIA' },
          { id: 'profile', icon: '👤', label: 'Moi' }
        ].map(item => {
          if (item.role && !userRoles.includes(item.role)) return null;
          const isActive = activeTab === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-3 transition-all rounded-[1.8rem] relative ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[1.5rem] shadow-lg shadow-emerald-500/40 animate-in zoom-in-75 duration-300"></div>
              )}
              <span className={`text-xl relative z-10 transition-transform ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
              <span className={`text-[8px] font-extrabold uppercase tracking-widest relative z-10 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
