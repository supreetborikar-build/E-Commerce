import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../common/CartDrawer';
import { ToastContainer } from '../ui/ToastContainer';
import { PageWrapper } from './PageWrapper';

export const StoreLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-purple-500 selection:text-white">
      <Navbar />
      <CartDrawer />
      <ToastContainer />
      <PageWrapper className="flex-1">
        <Outlet />
      </PageWrapper>
      <Footer />
    </div>
  );
};
