import React from 'react';
import { Bell, Package, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const Notifications: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'User Account' }, { label: 'Notification Center' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2 flex items-center gap-2">
          <Bell className="w-7 h-7 text-pink-400" /> Notifications Feed
        </h1>
      </div>

      <div className="bg-[#18181B] border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
        {user?.notifications.map((n) => (
          <div key={n.id} className="p-5 flex items-start gap-4 hover:bg-white/5 transition-colors">
            <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 shrink-0">
              {n.type === 'order' ? <Package className="w-5 h-5 text-purple-400" /> : <Sparkles className="w-5 h-5 text-teal-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-zinc-100">{n.title}</h4>
                <span className="text-xs text-zinc-500">{n.timestamp}</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
