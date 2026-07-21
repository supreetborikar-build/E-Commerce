import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const PaymentMethods: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'User Account' }, { label: 'Payment Methods' }]} />
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-3xl font-extrabold text-zinc-100 font-display flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-purple-400" /> Saved Payment Cards
          </h1>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Card
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-tr from-purple-950/60 via-[#18181B] to-teal-950/40 border border-purple-500/30 rounded-2xl p-6 space-y-4 shadow-glow-primary">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-purple-300">VISA NEURAL PASS</span>
            <Badge variant="primary">DEFAULT</Badge>
          </div>
          <div className="text-lg font-mono text-zinc-100 tracking-wider">
            •••• •••• •••• 4242
          </div>
          <div className="flex justify-between text-xs text-zinc-400 pt-2">
            <span>Kaelen Vance</span>
            <span>Exp: 12/28</span>
          </div>
        </div>
      </div>
    </div>
  );
};
