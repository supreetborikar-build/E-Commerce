import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Shield, Truck } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const HelpCenter: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does global shipping take?',
      a: 'All items are dispatched via express air freight, ensuring delivery within 2 to 3 business days worldwide.',
    },
    {
      q: 'What is the return policy for bio-tech rings & sensors?',
      a: 'We offer a 30-day trial period. Every ring comes with an anti-microbial bio-box for effortless returns and zero shipping charges.',
    },
    {
      q: 'Can I replace mock services with my own REST/GraphQL backend?',
      a: 'Yes! NovaMart was built specifically for GSoC and open source developers. All data services in `src/services/` return Promises, allowing drop-in API replacements without modifying UI components.',
    },
    {
      q: 'How do I active Web3 / Crypto payment options?',
      a: 'During checkout, choose the Web3 payment tile. Connect your MetaMask, Phantom, or Coinbase Wallet to complete instant on-chain settlements.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Breadcrumb items={[{ label: 'Support' }, { label: 'Help Center' }]} />
        <h1 className="text-3xl font-extrabold text-zinc-100 font-display mt-2 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-purple-400" /> Help Center & FAQ
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Find instant solutions or speak with our neural assistant.
        </p>
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-2 text-center">
          <Truck className="w-8 h-8 text-teal-400 mx-auto" />
          <h4 className="font-bold text-zinc-100 text-sm font-display">Shipping & Tracking</h4>
          <p className="text-xs text-zinc-400">Track express deliveries and customs</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-2 text-center">
          <Shield className="w-8 h-8 text-purple-400 mx-auto" />
          <h4 className="font-bold text-zinc-100 text-sm font-display">Warranty & Security</h4>
          <p className="text-xs text-zinc-400">Hardware protection plans</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-2 text-center">
          <MessageSquare className="w-8 h-8 text-pink-400 mx-auto" />
          <h4 className="font-bold text-zinc-100 text-sm font-display">24/7 Neural Chat</h4>
          <p className="text-xs text-zinc-400">Talk to live support agents</p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-zinc-100 font-display mb-4">Frequently Asked Questions</h3>
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-5 text-left text-sm font-semibold text-zinc-100 hover:text-purple-400 transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
