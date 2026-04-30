import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, ShieldCheck, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function LeadCaptureWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hi there! I'm the AI Sales Assistant for the Profit-Lock™ Method. What questions do you have about the Sales Rescue Kit?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Initialize chat only once
    if (!chatRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: `You are an AI sales assistant for the 'Profit-Lock™ Method / Sales Rescue Kit'. 
            This is a digital product tailored for Nigerian online business owners and vendors. 
            It helps them recover lost sales from WhatsApp chats, DMs, and ghosting.
            The kit includes a Script Bank, Lead Tracker, and Sales Leak Audit.
            
            Your goal is to answer their questions accurately and concisely, handle objections, and encourage them to buy the kit.
            Keep your answers short (1-3 sentences max) and conversational. Use a confident, helpful, and slightly persuasive tone.
            If they ask about price, mention it's ₦25,000 but currently discounted. Guide them to click "Get Full Access Now".
            Do not use markdown formatting like **bold** in your responses as it will be displayed as raw text.`
          }
        });
      } catch (e) {
        console.error("Failed to initialize Gemini API", e);
      }
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      if (chatRef.current) {
        const response = await chatRef.current.sendMessage({ message: userMessage });
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      } else {
         // Fallback if API fails to initialize
         setMessages(prev => [...prev, { role: 'model', text: "I'm currently offline, but you can find all the details about the Sales Rescue Kit on this page!" }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please check out the page above for details!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[80]">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-6 h-6" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[340px] md:w-[380px] bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-zinc-200 z-[90] overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
          >
             <div className="bg-[#128C7E] p-4 text-white flex items-center justify-between shrink-0">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                 </div>
                 <div>
                   <p className="font-bold text-sm leading-none">Profit-Lock™ Assistant</p>
                   <p className="text-[10px] text-green-100 mt-1">AI Sales Representative</p>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                 <X className="w-5 h-5" />
               </button>
             </div>

             <div className="p-4 bg-[url('https://www.transparenttextures.com/patterns/whatsapp-pattern.png')] bg-zinc-50 flex-1 overflow-y-auto flex flex-col gap-4">
                {messages.map((msg, index) => (
                   <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-2xl text-sm font-medium shadow-sm max-w-[85%] ${
                      msg.role === 'model' 
                        ? 'bg-white rounded-tl-sm border border-zinc-200 text-zinc-800 self-start' 
                        : 'bg-[#daf8cb] rounded-tr-sm border border-green-200 text-zinc-900 self-end'
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-3 rounded-2xl rounded-tl-sm border border-zinc-200 shadow-sm w-fit self-start flex gap-1 items-center"
                  >
                    <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
             </div>
             
             <div className="p-4 bg-white border-t border-zinc-100 shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-2 mb-3">
                   <input 
                     type="text" 
                     placeholder="Type a message..."
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     disabled={isTyping}
                     className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#25D366] focus:bg-white transition-colors"
                   />
                   <button 
                    type="submit" 
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-[#25D366] disabled:bg-[#25D366]/50 text-white w-11 h-11 rounded-xl flex items-center justify-center hover:bg-[#20bd5a] transition-colors shrink-0"
                   >
                     {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                   </button>
                 </form>

                  <a href="#pricing" onClick={() => setIsOpen(false)} className="block text-[#128C7E] font-bold text-xs bg-green-50 px-4 py-2 rounded-lg w-full text-center hover:bg-green-100 transition-colors">
                    Ready to buy? Get Full Access Now
                  </a>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
