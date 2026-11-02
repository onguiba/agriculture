
import React from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'delivery' | 'system';
}

interface NotificationsProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onClose, onMarkRead }) => {
  return (
    <div className="absolute top-16 right-4 left-4 bg-white rounded-2xl shadow-2xl border z-[100] animate-fade-in overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-black text-gray-800 text-xs uppercase tracking-widest">Notifications</h3>
        <button onClick={onClose} className="text-gray-400 text-lg">✕</button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400 italic text-sm">
            Aucune nouvelle notification
          </div>
        ) : (
          notifications.map(n => (
            <div 
              key={n.id} 
              onClick={() => onMarkRead(n.id)}
              className={`p-4 border-b last:border-0 flex gap-3 transition-colors ${n.read ? 'opacity-60' : 'bg-green-50/30'}`}
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border text-lg">
                {n.type === 'order' ? '🛒' : n.type === 'delivery' ? '🚚' : '⚙️'}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${n.read ? 'font-medium' : 'font-bold'} text-gray-800`}>{n.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
