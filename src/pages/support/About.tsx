import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div>
        <Breadcrumb items={[{ label: 'About NovaMart' }]} />
        <h1 className="text-4xl font-extrabold text-zinc-100 font-display mt-2">
          Pioneering Space-Grade E-Commerce
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          NovaMart is a premium futuristic e-commerce marketplace platform engineered for maximum scalability, visual elegance, and seamless open-source extensibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-3">
          <Cpu className="w-8 h-8 text-purple-400" />
          <h3 className="text-lg font-bold text-zinc-100 font-display">Frontend Architecture</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Built with React 19, Vite, TypeScript, Zustand, and Tailwind CSS. Designed with a clean asynchronous service layer ready for GSoC backend contributors.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-3">
          <Sparkles className="w-8 h-8 text-teal-400" />
          <h3 className="text-lg font-bold text-zinc-100 font-display">Aesthetic Philosophy</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Dark minimal aesthetics with custom violet, teal, and pink glowing highlights, glassmorphic blur effects, and fluid micro-animations.
          </p>
        </div>
      </div>
    </div>
  );
};
