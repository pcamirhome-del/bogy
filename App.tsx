
import React, { useState, useEffect } from 'react';
import { View } from './types';
import { Language, translations } from './translations';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MapsScraper from './components/MapsScraper';
import SocialAutomation from './components/SocialAutomation';
import WhatsAppModule from './components/WhatsAppModule';
import AIChatbot from './components/AIChatbot';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <h1 className="text-xl font-bold tracking-widest animate-pulse">NEXUSFLOW</h1>
        <p className="text-slate-400 text-sm italic">Initializing Marketing Engine...</p>
      </div>
    );
  }

  const renderView = () => {
    const props = { language, t };
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard {...props} />;
      case View.MAPS_SCRAPER: return <MapsScraper {...props} />;
      case View.SOCIAL_AUTOMATION: return <SocialAutomation {...props} />;
      case View.WHATSAPP_MODULE: return <WhatsAppModule {...props} />;
      case View.AI_CHATBOT: return <AIChatbot {...props} />;
      case View.SETTINGS: return <Settings {...props} />;
      default: return <Dashboard {...props} />;
    }
  };

  return (
    <div className={`flex h-screen bg-slate-950 overflow-hidden ${language === 'ar' ? 'font-sans' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        language={language} 
        setLanguage={setLanguage}
        t={t}
      />
      <main className="flex-1 overflow-y-auto p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
