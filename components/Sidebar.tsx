
import React from 'react';
import { View } from '../types';
import { Language } from '../translations';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, language, setLanguage, t }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: t.dashboard, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: View.MAPS_SCRAPER, label: t.mapsScraper, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: View.SOCIAL_AUTOMATION, label: t.socialEngine, icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' },
    { id: View.WHATSAPP_MODULE, label: t.whatsapp, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { id: View.AI_CHATBOT, label: t.aiChatbot, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z' },
    { id: View.SETTINGS, label: t.settings, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M12 15a3 3 0 100-6 3 3 0 000 6z' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">{t.appName}</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
            }`}
          >
            <svg className={`w-5 h-5 ${currentView === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
           <button 
             onClick={() => setLanguage('en')}
             className={`flex-1 text-[10px] font-bold py-1 rounded transition ${language === 'en' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500'}`}
           >
             EN
           </button>
           <button 
             onClick={() => setLanguage('ar')}
             className={`flex-1 text-[10px] font-bold py-1 rounded transition ${language === 'ar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-500'}`}
           >
             AR
           </button>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">{t.systemStatus}</p>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-300">{t.allNodesOnline}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
