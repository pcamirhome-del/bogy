
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const StatCard = ({ title, value, change, color, language }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-sm">
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`} dir="ltr">{change}</span>
    </div>
    <div className={`mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden`}>
      <div className={`h-full ${color}`} style={{ width: '65%' }}></div>
    </div>
  </div>
);

const Dashboard: React.FC<{ t: any, language: string }> = ({ t, language }) => {
  const data = [
    { name: language === 'ar' ? 'اثنين' : 'Mon', leads: 40, msgs: 240 },
    { name: language === 'ar' ? 'ثلاثاء' : 'Tue', leads: 30, msgs: 198 },
    { name: language === 'ar' ? 'أربعاء' : 'Wed', leads: 20, msgs: 300 },
    { name: language === 'ar' ? 'خميس' : 'Thu', leads: 27, msgs: 208 },
    { name: language === 'ar' ? 'جمعة' : 'Fri', leads: 18, msgs: 480 },
    { name: language === 'ar' ? 'سبت' : 'Sat', leads: 23, msgs: 380 },
    { name: language === 'ar' ? 'أحد' : 'Sun', leads: 34, msgs: 430 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{t.growthDashboard}</h1>
          <p className="text-slate-400">{t.realTimePerformance}</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-lg shadow-indigo-600/20">
          {t.syncEngines}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t.totalLeads} value="1,284" change="+12%" color="bg-indigo-500" language={language} />
        <StatCard title={t.messagesSent} value="45,902" change="+24%" color="bg-emerald-500" language={language} />
        <StatCard title={t.avgResponse} value="42s" change="-8%" color="bg-amber-500" language={language} />
        <StatCard title={t.conversionRate} value="3.8%" change="+1.2%" color="bg-rose-500" language={language} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">{t.leadTrend}</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" reversed={language === 'ar'} />
                <YAxis stroke="#94a3b8" orientation={language === 'ar' ? 'right' : 'left'} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">{t.engagementActivity}</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" reversed={language === 'ar'} />
                <YAxis stroke="#94a3b8" orientation={language === 'ar' ? 'right' : 'left'} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="msgs" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">{t.recentActivity}</h2>
          <button className="text-indigo-400 text-sm font-semibold hover:underline">{t.viewAllLogs}</button>
        </div>
        <table className="w-full text-left rtl:text-right">
          <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">{t.action}</th>
              <th className="px-6 py-4">{t.target}</th>
              <th className="px-6 py-4">{t.status}</th>
              <th className={`px-6 py-4 ${language === 'ar' ? 'text-left' : 'text-right'}`}>{t.time}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300 text-sm">
            <tr>
              <td className="px-6 py-4 flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/></svg>
                </div>
                <span>Maps Scrape: Coffee Shops</span>
              </td>
              <td className="px-6 py-4">Dubai, UAE</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20">Completed</span></td>
              <td className={`px-6 py-4 ${language === 'ar' ? 'text-left' : 'text-right'}`}>2 mins ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
