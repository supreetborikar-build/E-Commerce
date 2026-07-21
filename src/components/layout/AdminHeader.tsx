import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, description }) => {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="bg-[#09090B]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-zinc-100 font-display">{title}</h1>
        {description && <p className="text-xs text-zinc-400 mt-0.5">{description}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search admin..."
            className="bg-zinc-900 text-xs text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/10 pl-8 pr-3 py-1.5 focus:outline-none focus:border-teal-500 w-48"
          />
        </div>

        {/* System Alert Bell */}
        <button className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        </button>

        {/* Admin User Badge */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
            alt="Admin"
            className="w-8 h-8 rounded-full border border-teal-500/40 object-cover"
          />
          <div className="hidden lg:flex flex-col text-xs">
            <span className="font-semibold text-zinc-100">{user?.name || 'Admin User'}</span>
            <span className="text-[10px] text-teal-400 font-mono">Store Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};
