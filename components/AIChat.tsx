import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Soy la versión IA de Alex. Pregúntame sobre mis proyectos, experiencia o stack tecnológico.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Call API
    // We pass context history, excluding the very first welcome message if desired, 
    // but usually passing all history helps context.
    const responseText = await sendMessageToGemini(messages.map(m => ({role: m.role, text: m.text})), userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl transition-all hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Chat with AI"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <h3 className="text-white font-bold">Alex AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none px-4 py-3">
                   <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pregunta sobre mi experiencia..."
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="text-xs text-center text-slate-500 mt-2">
              Powered by Google Gemini
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;