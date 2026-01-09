
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiAssistantResponse } from '../services/geminiService';
import { ChatMessage, Product } from '../types';

interface GeminiAssistantProps {
  products: Product[];
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o assistente da TechSphere. Como posso ajudar você hoje com seu novo setup tecnológico?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || inputValue;
    if (!textToSend.trim() || isLoading) return;

    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    const aiResponse = await getGeminiAssistantResponse(textToSend, products);
    
    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl transition-all active:scale-90 ${isOpen ? 'bg-secondary' : 'bg-gradient-to-br from-primary to-accent animate-bounce shadow-primary/20'}`}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[580px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-[assistant_0.4s_cubic-bezier(0.16,1,0.3,1)]">
          <div className="p-6 bg-secondary text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-accent/20">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3 className="font-black text-lg">TechSphere AI</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-accent font-black uppercase tracking-widest">Sincronizado</p>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-secondary border border-slate-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none flex gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-white">
            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Pergunte sobre tecnologia..."
                  className="w-full px-6 py-4 bg-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                />
              </div>
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !inputValue.trim()}
                className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-90"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes assistant {
          from { opacity: 0; transform: translateY(40px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default GeminiAssistant;
