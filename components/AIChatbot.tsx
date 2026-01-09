
import React, { useState, useRef, useEffect } from 'react';
import { chatWithKnowledgeBase } from '../services/geminiService';

const AIChatbot: React.FC<{ t: any }> = ({ t }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: t.chatbotInstruction }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
      const response = await chatWithKnowledgeBase(userMessage, history);
      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: 'Error...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col space-y-4">
      <header className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2"/></svg>
          </div>
          <div>
            <h2 className="font-bold text-white">{t.aiChatbot}</h2>
            <p className="text-xs text-slate-400">{t.salesAssistant}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700">{t.trainOnData}</button>
          <button className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700">{t.exportLogs}</button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 bg-slate-900/30 border border-slate-800 rounded-2xl p-6 overflow-y-auto space-y-6 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <input 
            type="text" 
            placeholder={t.typeMessage}
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-indigo-600 text-white p-3 rounded-xl transition shadow-lg shadow-indigo-600/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="2.5"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
