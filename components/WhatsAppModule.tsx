
import React, { useState } from 'react';

const WhatsAppModule: React.FC<{ t: any }> = ({ t }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'ui' | 'python'>('ui');

  const pythonCode = `import pandas as pd
import pyautogui
import webbrowser
import time
import random
import urllib.parse

# --- Library Breakdown ---
# time: Used to pause the program execution (Sleep).
# random: Used to generate non-fixed intervals, mimicking human behavior to trick protection systems.

# 1. Load your Excel file
# The file must have columns: 'Phone' and 'Message'
file_path = 'leads.xlsx'
df = pd.read_excel(file_path)

print(f"Loaded {len(df)} leads. Starting automation...")

for index, row in df.iterrows():
    phone = str(row['Phone'])
    message = str(row['Message'])
    
    # URL encode the message to handle spaces and special characters
    encoded_message = urllib.parse.quote(message)
    
    # 2. Format the direct WhatsApp link
    whatsapp_url = f"https://web.whatsapp.com/send?phone={phone}&text={encoded_message}"
    
    print(f"[{index+1}/{len(df)}] Preparing message for: {phone}")
    
    # 3. Open the browser
    webbrowser.open(whatsapp_url)
    
    # 4. Wait for page load (Essential for WhatsApp Web initialization)
    time.sleep(15) 
    
    # 5. Human Emulation: Simulate pressing 'Enter' to send
    pyautogui.press('enter')
    
    # 6. Safety Delay after keystroke
    time.sleep(random.uniform(2, 5))
    
    # 7. Close the browser tab (Ctrl+W) to keep the environment clean
    pyautogui.hotkey('ctrl', 'w')
    
    # 8. CRITICAL ANTI-BAN PROTECTION:
    # Uses random.randint(15, 45) to wait a non-fixed time after each message.
    # This ensures activity isn't detected as robotic.
    wait_time = random.randint(15, 45)
    print(f"Security Gap: Waiting {wait_time}s before next contact...")
    time.sleep(wait_time)

print("Automation Completed! All messages sent safely.")
`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t.whatsapp}</h1>
          <p className="text-slate-400">{t.inboxRetargeter}</p>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setActiveTab('ui')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === 'ui' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Dashboard UI
          </button>
          <button 
            onClick={() => setActiveTab('python')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${activeTab === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {t.pythonScript}
          </button>
        </div>
      </header>

      {activeTab === 'ui' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6">{t.campaignSettings}</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">{t.messageTemplate}</label>
                  <textarea 
                    rows={5} 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500" 
                    defaultValue="Hi {name}, we have a special offer for you!"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">{t.minDelay}</label>
                    <input type="number" defaultValue={15} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">{t.maxDelay}</label>
                    <input type="number" defaultValue={45} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
               <div className="p-6 border-b border-slate-800">
                  <h3 className="font-bold text-white">{t.queueOverview}</h3>
               </div>
               <div className="p-20 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-600 mb-4 animate-pulse">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/></svg>
                  </div>
                  <h4 className="text-slate-300 font-semibold mb-1">{t.noActiveCampaign}</h4>
                  <p className="text-xs text-slate-500">{t.pythonScriptDesc}</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-white font-bold mb-4">{t.leadSource}</h3>
              <div className="space-y-4">
                <label className="block w-full cursor-pointer group">
                  <input type="file" className="hidden" onChange={(e) => setCsvFile(e.target.files?.[0] || null)} />
                  <div className="p-6 border-2 border-dashed border-slate-700 group-hover:border-indigo-500 rounded-xl flex flex-col items-center justify-center transition bg-slate-950/50">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter text-center">{csvFile ? csvFile.name : t.uploadCSV}</span>
                  </div>
                </label>
                <button className="w-full py-3 px-4 bg-slate-800 text-slate-200 text-sm font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition">{t.importScraper}</button>
              </div>
            </div>
            
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl">
               <h3 className="text-indigo-400 font-bold mb-2">{t.automationWorkflow}</h3>
               <div className="space-y-4 mt-4">
                  {[t.step1, t.step2, t.step3, t.step4].map((step, i) => (
                    <div key={i} className="flex items-start space-x-3 rtl:space-x-reverse">
                       <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                       <p className="text-[11px] text-slate-300 leading-tight">{step}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Python Code Display */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800 px-6 py-3 flex justify-between items-center border-b border-slate-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                   <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                   <span className="text-xs font-mono text-slate-400 ml-4">whatsapp_bot.py</span>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(pythonCode)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded transition"
                >
                  {t.copyCode}
                </button>
              </div>
              <div className="p-6 bg-slate-950 font-mono text-xs leading-relaxed overflow-x-auto text-indigo-300 max-h-[600px]">
                <pre>{pythonCode}</pre>
              </div>
            </div>

            {/* Library Descriptions & Info */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-4">{t.pythonScript} Info</h3>
                <div className="space-y-4">
                   <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-indigo-400 text-xs font-bold mb-1">Time Library</p>
                      <p className="text-[10px] text-slate-400">Used to pause the program (Sleep) to match page loading times.</p>
                   </div>
                   <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-emerald-400 text-xs font-bold mb-1">Random Library</p>
                      <p className="text-[10px] text-slate-400">Creates non-fixed intervals (e.g., 5s, 8s, 6s) to mimic human pace and avoid bot detection.</p>
                   </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2"/></svg>
                  <span>{t.excelFormatting}</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{t.excelFormattingDesc}</p>
                <button className="w-full py-3 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-xs font-bold hover:bg-indigo-600/20 transition">
                  {t.downloadTemplate}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppModule;
