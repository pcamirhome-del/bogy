
import React, { useState } from 'react';

const SocialAutomation: React.FC<{ t: any }> = ({ t }) => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'poster'>('monitor');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
       <header>
        <h1 className="text-3xl font-bold text-white mb-2">{t.socialEngine}</h1>
        <p className="text-slate-400">Manage interactions and groups.</p>
      </header>

      <div className="flex space-x-1 rtl:space-x-reverse bg-slate-900 p-1 rounded-xl w-fit border border-slate-800">
        <button 
          onClick={() => setActiveTab('monitor')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'monitor' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          {t.commentMonitor}
        </button>
        <button 
          onClick={() => setActiveTab('poster')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'poster' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          {t.groupPoster}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
             <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="font-bold text-white">{t.liveFeed}</h2>
                <span className="text-[10px] text-slate-400 uppercase font-bold">{t.scanningCompetitors}</span>
             </div>
             <div className="p-12 text-center text-slate-500 text-sm">Waiting for live data...</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
           <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">{t.saveConfig}</button>
        </div>
      </div>
    </div>
  );
};

export default SocialAutomation;
