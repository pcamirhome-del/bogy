
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ title, value, change, color, language }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-sm transition-all hover:scale-[1.02] hover:bg-slate-900/80">
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
      <span className={`text-sm font-medium px-2 py-0.5 rounded ${change.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`} dir="ltr">{change}</span>
    </div>
    <div className={`mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden`}>
      <div className={`h-full transition-all duration-1000 ${color}`} style={{ width: '65%' }}></div>
    </div>
  </div>
);

const Dashboard: React.FC<{ t: any, language: string }> = ({ t, language }) => {
  // Pre-populate with data to ensure it appears immediately on Vercel
  const [liveData, setLiveData] = useState<any[]>([
    { name: language === 'ar' ? 'اثنين' : 'Mon', leads: 40, msgs: 240 },
    { name: language === 'ar' ? 'ثلاثاء' : 'Tue', leads: 30, msgs: 198 },
    { name: language === 'ar' ? 'أربعاء' : 'Wed', leads: 20, msgs: 300 },
    { name: language === 'ar' ? 'خميس' : 'Thu', leads: 27, msgs: 208 },
    { name: language === 'ar' ? 'جمعة' : 'Fri', leads: 18, msgs: 480 },
    { name: language === 'ar' ? 'سبت' : 'Sat', leads: 23, msgs: 380 },
    { name: language === 'ar' ? 'أحد' : 'Sun', leads: 34, msgs: 430 },
  ]);

  const [stats, setStats] = useState({
    leads: 1284,
    msgs: 45902,
    rate: 3.8
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        leads: prev.leads + Math.floor(Math.random() * 2),
        msgs: prev.msgs + Math.floor(Math.random() * 5),
        rate: parseFloat((prev.rate + (Math.random() * 0.1 - 0.05)).toFixed(2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{t.growthDashboard}</h1>
          <p className="text-slate-400">{t.realTimePerformance}</p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
           <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Live Engine</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t.totalLeads} value={stats.leads.toLocaleString()} change="+12%" color="bg-indigo-500" language={language} />
        <StatCard title={t.messagesSent} value={stats.msgs.toLocaleString()} change="+24%" color="bg-emerald-500" language={language} />
        <StatCard title={t.avgResponse} value="42s" change="-8%" color="bg-amber-500" language={language} />
        <StatCard title={t.conversionRate} value={`${stats.rate}%`} change="+1.2%" color="bg-rose-500" language={language} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-inner">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 rtl:ml-2"></span>
            {t.leadTrend}
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={liveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" reversed={language === 'ar'} fontSize={10} />
                <YAxis stroke="#64748b" orientation={language === 'ar' ? 'right' : 'left'} fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-inner">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 rtl:ml-2"></span>
            {t.engagementActivity}
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" reversed={language === 'ar'} fontSize={10} />
                <YAxis stroke="#64748b" orientation={language === 'ar' ? 'right' : 'left'} fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="msgs" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
          <h2 className="text-lg font-bold text-white">{t.recentActivity}</h2>
          <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition">{t.viewAllLogs}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead className="bg-slate-800/30 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">{t.action}</th>
                <th className="px-6 py-4">{t.target}</th>
                <th className="px-6 py-4">{t.status}</th>
                <th className={`px-6 py-4 ${language === 'ar' ? 'text-left' : 'text-right'}`}>{t.time}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-sm">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-3 rtl:space-x-reverse font-medium">
                  <div className="w-8 h-8 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/></svg>
                  </div>
                  <span>Maps Scrape: Coffee Shops</span>
                </td>
                <td className="px-6 py-4">Dubai, UAE</td>
                <td className="px-6 py-4"><span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-bold border border-green-500/20 uppercase">Completed</span></td>
                <td className={`px-6 py-4 text-slate-500 ${language === 'ar' ? 'text-left' : 'text-right'}`}>2 mins ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
