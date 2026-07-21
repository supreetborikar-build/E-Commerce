import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-glow-primary">
        <Compass className="w-10 h-10 animate-pulse" />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-extrabold text-zinc-100 font-display">404</h1>
        <h2 className="text-xl font-bold text-purple-400 font-display">Page Not Found</h2>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          The requested page or product link could not be located.
        </p>
      </div>
      <Link to="/">
        <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Marketplace
        </Button>
      </Link>
    </div>
  );
};
