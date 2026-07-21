import React, { useState } from 'react';
import { User, Mail, Phone, Save } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const addToast = useNotificationStore((s) => s.addToast);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone });
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your personal information was saved successfully.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'User Account' }, { label: 'Profile' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2 flex items-center gap-2">
          <User className="w-7 h-7 text-purple-400" /> Account Profile Settings
        </h1>
      </div>

      <div className="bg-[#18181B] border border-white/10 rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'}
            alt="User avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/50"
          />
          <div>
            <h3 className="text-lg font-bold text-zinc-100 font-display">{user?.name}</h3>
            <span className="text-xs text-teal-400 font-mono">Premium VIP Member</span>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4 text-zinc-400" />}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-zinc-400" />}
            required
          />
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4 text-zinc-400" />}
          />
          <Button variant="primary" type="submit" leftIcon={<Save className="w-4 h-4" />}>
            Save Account Changes
          </Button>
        </form>
      </div>
    </div>
  );
};
