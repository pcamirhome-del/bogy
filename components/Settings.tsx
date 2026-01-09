
import React from 'react';

const Settings: React.FC<{ t: any }> = ({ t }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">{t.settings}</h1>
        <p className="text-slate-400">Manage system parameters.</p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800">
        <div className="p-8">
          <h3 className="text-lg font-bold text-white mb-6">{t.apiConfig}</h3>
          <div className="flex justify-between items-center">
            <p className="text-slate-200 font-semibold">Gemini API Connection</p>
            <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20 font-bold">STABLE</div>
          </div>
        </div>
        <div className="p-8">
          <h3 className="text-lg font-bold text-white mb-6">{t.networkSecurity}</h3>
          <h3 className="text-lg font-bold text-white mt-8 mb-6">{t.integrations}</h3>
        </div>
      </div>

      <div className="flex justify-end space-x-4 rtl:space-x-reverse">
        <button className="px-6 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl">{t.reset}</button>
        <button className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20">{t.saveChanges}</button>
      </div>
    </div>
  );
};

export default Settings;
