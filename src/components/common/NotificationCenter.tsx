import React, { useState } from 'react';
import { Bell, Check, Package, Sparkles, Shield, Info } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserService } from '../../services/userService';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  const unreadCount = user?.notifications?.filter((n) => !n.read).length || 0;

  const handleMarkRead = async (id: string) => {
    await UserService.markNotificationAsRead(id);
    useAuthStore.setState((state) => ({
      user: state.user
        ? {
            ...state.user,
            notifications: state.user.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
          }
        : null,
    }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-purple-400" />;
      case 'promo':
        return <Sparkles className="w-4 h-4 text-teal-400" />;
      case 'security':
        return <Shield className="w-4 h-4 text-amber-400" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 shadow-glow-accent animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-[#18181B] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-zinc-900/80">
              <span className="text-xs font-semibold text-zinc-100 font-display">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
              {!user?.notifications || user.notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-500">
                  No notifications yet.
                </div>
              ) : (
                user.notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 flex items-start gap-3 transition-colors ${
                      !notif.read ? 'bg-purple-950/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-zinc-900 border border-white/10 shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-semibold text-zinc-100 truncate">
                          {notif.title}
                        </h5>
                        <span className="text-[10px] text-zinc-500">{notif.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkRead(notif.id)}
                        className="text-zinc-500 hover:text-purple-400 p-1"
                        aria-label="Mark read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
