import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { AdminHeader } from '../../components/layout/AdminHeader';

export const AdminAnalytics: React.FC = () => {
  const chartData = [
    { month: 'Jan', revenue: 14500, orders: 120 },
    { month: 'Feb', revenue: 18200, orders: 145 },
    { month: 'Mar', revenue: 22400, orders: 180 },
    { month: 'Apr', revenue: 26100, orders: 210 },
    { month: 'May', revenue: 31000, orders: 250 },
    { month: 'Jun', revenue: 36800, orders: 285 },
  ];

  return (
    <div className="flex-1 bg-[#09090B] space-y-6 min-h-screen">
      <AdminHeader title="Advanced Analytics & Insights" description="Deep dive performance charts and sales conversion trends." />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-zinc-100 font-display">Monthly Revenue Bar Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#71717A" fontSize={11} />
                <YAxis stroke="#71717A" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#18181B', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="revenue" fill="#14B8A6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
