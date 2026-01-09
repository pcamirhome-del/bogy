
import React, { useState } from 'react';
import { findLeadsWithMaps, checkAPIStatus } from '../services/geminiService';

const MapsScraper: React.FC<{ t: any }> = ({ t }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Stealth Settings State
  const [mouseEmulation, setMouseEmulation] = useState(true);
  const [uaRotation, setUaRotation] = useState(true);
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [proxyList, setProxyList] = useState('');

  const hasApiKey = checkAPIStatus();

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!keyword) return;

    if (!hasApiKey) {
      setError("API Key is missing. Please set API_KEY in your environment variables on Vercel.");
      return;
    }

    setIsScraping(true);
    try {
      const data = await findLeadsWithMaps(`${keyword} in ${location}`);
      setSummary(data.text);
      setResults(data.links);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during scraping.");
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-fade-in">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t.mapsScraper}</h1>
          <p className="text-slate-400">{t.extractIntelligence}</p>
        </div>
        {!hasApiKey && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2 rounded-xl flex items-center animate-pulse font-bold">
            <svg className="w-4 h-4 mr-2 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2"/></svg>
            API Key Missing
          </div>
        )}
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-center space-x-3 rtl:space-x-reverse text-red-400 text-sm font-medium animate-bounce-short">
           <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/></svg>
           <span>{error}</span>
        </div>
      )}

      {/* Main Scraper Form */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleScrape} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">{t.targetKeyword}</label>
            <input 
              type="text" 
              placeholder="e.g. Restaurants" 
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none text-white transition-all focus:ring-1 focus:ring-indigo-500/50"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">{t.cityLocation}</label>
            <input 
              type="text" 
              placeholder="e.g. Dubai" 
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none text-white transition-all focus:ring-1 focus:ring-indigo-500/50"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              disabled={isScraping}
              className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg shadow-indigo-600/20 active:scale-95 ${isScraping ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isScraping ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t.scrapingData}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2"/></svg>
                  <span>{t.startExtraction}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Stealth Mode Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-3 rtl:space-x-reverse">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="2"/></svg>
            <span>{t.stealthMode}</span>
          </h2>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 font-bold tracking-tighter uppercase">High Stealth Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mouse Emulation */}
          <div className="flex items-start space-x-4 rtl:space-x-reverse group">
            <div className="pt-1">
               <button 
                onClick={() => setMouseEmulation(!mouseEmulation)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${mouseEmulation ? 'bg-indigo-600' : 'bg-slate-800'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${mouseEmulation ? (t.language === 'ar' ? 'left-1' : 'right-1') : (t.language === 'ar' ? 'right-1' : 'left-1')}`}></div>
               </button>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">{t.mouseEmulation}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">{t.mouseEmulationDesc}</p>
            </div>
          </div>

          {/* User-Agent Rotation */}
          <div className="flex items-start space-x-4 rtl:space-x-reverse group">
            <div className="pt-1">
               <button 
                onClick={() => setUaRotation(!uaRotation)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${uaRotation ? 'bg-indigo-600' : 'bg-slate-800'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${uaRotation ? (t.language === 'ar' ? 'left-1' : 'right-1') : (t.language === 'ar' ? 'right-1' : 'left-1')}`}></div>
               </button>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">{t.uaRotation}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">{t.uaRotationDesc}</p>
            </div>
          </div>

          {/* Proxy Support */}
          <div className="flex items-start space-x-4 rtl:space-x-reverse md:col-span-2 group">
            <div className="pt-1">
               <button 
                onClick={() => setProxyEnabled(!proxyEnabled)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${proxyEnabled ? 'bg-indigo-600' : 'bg-slate-800'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${proxyEnabled ? (t.language === 'ar' ? 'left-1' : 'right-1') : (t.language === 'ar' ? 'right-1' : 'left-1')}`}></div>
               </button>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">{t.proxySupport}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1 mb-4">{t.proxySupportDesc}</p>
              
              {proxyEnabled && (
                <div className="animate-fade-in space-y-3">
                  <textarea 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 text-xs font-mono outline-none focus:border-indigo-500 transition-colors"
                    placeholder={t.proxyPlaceholder}
                    rows={4}
                    value={proxyList}
                    onChange={(e) => setProxyList(e.target.value)}
                  />
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Proxy Pool: {proxyList ? proxyList.split('\n').filter(l => l.trim()).length : 0} Nodes</span>
                    <button className="text-[10px] text-indigo-400 font-bold hover:underline">Verify All Proxies</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {summary && (
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl animate-fade-in shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2 rtl:space-x-reverse">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            <span>{t.extractionSummary}</span>
          </h3>
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {summary}
          </div>
          
          {results.length > 0 && (
            <div className="mt-10">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2 inline-block">{t.referencedSources}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {results.map((chunk, idx) => (
                  <a 
                    key={idx} 
                    href={chunk.maps?.uri || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-indigo-500/50 hover:bg-slate-950 transition-all group flex justify-between items-center shadow-lg"
                  >
                    <div>
                      <p className="text-white font-semibold text-sm group-hover:text-indigo-400 truncate max-w-[200px]">
                        {chunk.maps?.title || 'Business Name'}
                      </p>
                      <p className="text-slate-500 text-[10px] mt-1 uppercase font-bold tracking-tighter">Google Maps Reference</p>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors text-slate-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2"/></svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapsScraper;
