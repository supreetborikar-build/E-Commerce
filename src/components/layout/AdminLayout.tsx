import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { ToastContainer } from '../ui/ToastContainer';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex selection:bg-teal-500 selection:text-zinc-950">
      <AdminSidebar />
      <ToastContainer />
      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
    </div>
  );
};
