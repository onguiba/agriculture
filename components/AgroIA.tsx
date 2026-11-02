
import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import { Message } from '../types';

const AgroIA: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bonjour ! Je suis AgroBot. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me poser des questions sur les prix ou m\'envoyer une photo de votre culture pour un diagnostic.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const botResponse = await getChatbotResponse(history, textToSend);
      if (botResponse) {
        setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Oups, j'ai eu un petit problème technique." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageAnalysis = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      // Simulate image processing delay
      setTimeout(() => {
        handleSend("Analyse cette photo de mes plants de tomates. Ils ont des taches brunes sur les feuilles.");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/40 overflow-hidden shadow-2xl animate-fade-in relative">
      <div className="bg-emerald-900/90 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <span className="text-xl">✨</span>
          </div>
          <div>
            <h2 className="font-black text-white text-sm uppercase tracking-tight">AgroBot Premium</h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-[8px] font-black text-green-300 uppercase tracking-widest">IA Active</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all"
        >
          📷
        </button>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageAnalysis} />
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/20">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] shadow-sm ${
              m.role === 'user' 
              ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-tr-none' 
              : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-5 rounded-[2rem] rounded-tl-none shadow-sm flex gap-2 items-center">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/80 border-t border-gray-100 flex gap-2">
        <input 
          type="text"
          placeholder="Écrivez votre message..."
          className="flex-1 p-5 bg-gray-100/50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-medium"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={() => handleSend()}
          disabled={loading}
          className="bg-emerald-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-50"
        >
          <span className="text-xl">🚀</span>
        </button>
      </div>
    </div>
  );
};

export default AgroIA;
