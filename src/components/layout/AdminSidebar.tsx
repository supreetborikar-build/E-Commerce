import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Warehouse, Ticket, Settings, ArrowLeft, Zap } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Inventory', path: '/admin/inventory', icon: Warehouse },
    { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#09090B] border-r border-white/10 hidden md:flex flex-col h-screen sticky top-0 shrink-0">
      {/* Admin Logo */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-100 font-display">NOVA ADMIN</h2>
            <span className="text-[9px] font-mono text-teal-400 uppercase">Control Center</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-2 font-display">
          Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600/20 border border-purple-500/40 text-purple-300 shadow-glow-primary'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Back to Storefront Link */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 border border-white/10 py-2.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Store
        </Link>
      </div>
    </aside>
  );
};
