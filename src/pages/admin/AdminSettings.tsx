import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNotificationStore } from '../../store/useNotificationStore';

export const AdminSettings: React.FC = () => {
  const [storeName, setStoreName] = useState('NovaMart Space Marketplace');
  const [currency, setCurrency] = useState('USD ($)');
  const [taxRate, setTaxRate] = useState('8.0');
  const addToast = useNotificationStore((s) => s.addToast);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Store Settings Saved',
      message: 'Global marketplace preferences updated.',
    });
  };

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader title="Store Configuration Settings" description="General marketplace preferences, tax rules, and currency." />

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSaveSettings} className="bg-[#18181B] border border-white/10 rounded-2xl p-8 space-y-6">
          <Input
            label="Marketplace Brand Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Primary Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
            <Input
              label="Global Tax Rate (%)"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              required
            />
          </div>
          <Button variant="primary" type="submit" leftIcon={<Save className="w-4 h-4" />}>
            Save Store Settings
          </Button>
        </form>
      </div>
    </div>
  );
};
