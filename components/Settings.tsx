
import React, { useState, useEffect } from 'react';
import { checkAPIStatus } from '../services/geminiService';

const Settings: React.FC<{ t: any }> = ({ t }) => {
  const [apiKeyDetected, setApiKeyDetected] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const status = checkAPIStatus();
    setApiKeyDetected(status);
    
    // Capture environment context for debugging on Vercel
    setDebugInfo({
      processExists: typeof process !== 'undefined',
      envExists: typeof process !== 'undefined' && !!process.env,
      keyLength: ((window as any).process?.env?.API_KEY?.length) || 0,
      location: window.location.hostname
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">{t.settings}</h1>
        <p className="text-slate-400">Manage your system credentials and engine parameters.</p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 shadow-2xl">
        <div className="p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
             <svg className="w-5 h-5 mr-2 rtl:ml-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" strokeWidth="2"/></svg>
             {t.apiConfig}
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <p className="text-slate-200 font-semibold">Gemini API Key Status</p>
                <p className="text-xs text-slate-500">Detected via Vercel Environment</p>
              </div>
              <div className={`px-4 py-1 rounded-full text-[10px] font-bold border uppercase transition-all ${apiKeyDetected ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {apiKeyDetected ? 'Active' : 'Missing'}
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Vercel Environment Diagnostics</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div className="text-[11px]">
                    <span className="text-slate-500">Process Shim:</span> <span className={debugInfo.processExists ? 'text-green-400' : 'text-red-400'}>{debugInfo.processExists ? 'OK' : 'FAIL'}</span>
                  </div>
                  <div className="text-[11px]">
                    <span className="text-slate-500">Key Length:</span> <span className="text-indigo-400 font-mono">{debugInfo.keyLength} chars</span>
                  </div>
               </div>
            </div>

            {!apiKeyDetected && (
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                 <p className="text-amber-400 text-xs font-bold uppercase mb-1">Action Required</p>
                 <p className="text-slate-400 text-xs leading-relaxed">
                   API Key is not being read. Ensure you have added <b>API_KEY</b> in Vercel Dashboard and triggered a <b>New Deployment</b>.
                 </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-bold text-white mb-6">{t.networkSecurity}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Default Browser Engine</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500">
                <option>Chrome (Headless)</option>
                <option>Stealth WebKit</option>
              </select>
            </div>
             <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Request Timeout (ms)</label>
              <input type="number" defaultValue={30000} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 rtl:space-x-reverse">
        <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all shadow-lg active:scale-95">{t.reset}</button>
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95">{t.saveChanges}</button>
      </div>
    </div>
  );
};

export default Settings;
