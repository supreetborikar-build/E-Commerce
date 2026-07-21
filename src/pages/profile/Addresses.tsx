import React from 'react';
import { MapPin, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const Addresses: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'User Account' }, { label: 'Saved Addresses' }]} />
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-3xl font-extrabold text-zinc-100 font-display flex items-center gap-2">
            <MapPin className="w-7 h-7 text-teal-400" /> Saved Delivery Addresses
          </h1>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add New Address
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user?.addresses.map((addr) => (
          <div key={addr.id} className="bg-[#18181B] border border-white/10 rounded-2xl p-6 space-y-3 relative">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-zinc-100 text-sm font-display">{addr.fullName}</h4>
              {addr.isDefault && <Badge variant="secondary">DEFAULT</Badge>}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {addr.street}<br />
              {addr.city}, {addr.state} {addr.postalCode}<br />
              {addr.country}
            </p>
            <p className="text-xs text-zinc-500 font-mono">Phone: {addr.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
