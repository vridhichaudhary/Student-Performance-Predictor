import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '../services/api';

const ChatBot = ({ studentId, isDemo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI Performance Assistant. I've analyzed your data. How can I help you improve today?", timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const mockResponses = {
    "math": "Your math scores showed a slight dip in March due to Calculus topics. I recommend focusing on integral basics this week.",
    "focus": "Based on your trend analysis, prioritizing Geography and History will yield the highest GPA boost right now.",
    "predict": "If you maintain your current study frequency, I predict a 92% score on your final exam next month.",
    "improve": "To improve consistently, try the active recall method for 45 minutes daily on your weakest subjects.",
    "default": "That's an interesting question. Looking at your performance patterns, I can say that consistency is key. Would you like a specific study schedule?"
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    if (isDemo || !studentId) {
      // Simulate AI thinking for demo
      setTimeout(() => {
        const lowerInput = userMessage.content.toLowerCase();
        let response = mockResponses.default;
        
        if (lowerInput.includes('math')) response = mockResponses.math;
        else if (lowerInput.includes('focus') || lowerInput.includes('study')) response = mockResponses.focus;
        else if (lowerInput.includes('predict') || lowerInput.includes('score')) response = mockResponses.predict;
        else if (lowerInput.includes('improve')) response = mockResponses.improve;

        setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
        setIsTyping(false);
      }, 1500);
    } else {
      try {
        const response = await sendChatMessage(studentId, userMessage.content);
        setMessages(prev => [...prev, { role: 'assistant', content: response.message, timestamp: new Date() }]);
      } catch (error) {
        console.error("Chat API error:", error);
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my servers right now.", timestamp: new Date() }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-brand-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-brand-500 transition-colors group"
          >
            <MessageSquare className="group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-surface-950" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className={`glass-card shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isMinimized ? 'h-16 w-72' : 'h-[500px] w-96'}`}
          >
            {/* Header */}
            <div className="p-4 bg-brand-600 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Tutor</h3>
                  <span className="text-[10px] opacity-80 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded">
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-950/50"
                >
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-surface-800' : 'bg-brand-600/20 text-brand-400'}`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-600 text-white rounded-tr-none' : 'bg-surface-900 border border-surface-800 text-surface-200 rounded-tl-none'}`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600/20 text-brand-400 flex items-center justify-center">
                          <Bot size={16} />
                        </div>
                        <div className="bg-surface-900 border border-surface-800 p-3 rounded-2xl rounded-tl-none">
                          <Loader2 size={16} className="animate-spin text-brand-400" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-surface-800 bg-surface-900">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about your performance..."
                      className="w-full bg-surface-950 border border-surface-800 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    <button 
                      onClick={handleSend}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-500 hover:text-brand-400 transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
