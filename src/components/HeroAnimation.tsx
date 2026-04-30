import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, DollarSign, BookOpen, CheckCircle2 } from 'lucide-react';

const inquiries = [
  "How much is it?",
  "I'll get back to you...",
  "Do you do delivery?"
];

const payments = [
  "₦15,000",
  "₦25,000",
  "₦50,000"
];

export default function HeroAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % inquiries.length);
    }, 4000); // 4 second cycle
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto h-[180px] md:h-[220px] mt-8 mb-12 flex items-center justify-center pointer-events-none select-none">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-[#25D366]/5 blur-[80px] rounded-full" />
      
      {/* Center Pathway Line */}
      <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      {/* 1. Left Side: Incoming Enquiry */}
      <div className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "inq"}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white border border-zinc-200/80 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-start gap-3 w-fit"
          >
            <div className="mt-0.5 bg-zinc-100 rounded-full p-1.5 shrink-0">
               <MessageCircle className="w-3.5 h-3.5 text-zinc-500" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-medium mb-0.5 uppercase tracking-wide">Customer Idea</p>
              <p className="text-sm font-semibold text-zinc-800 leading-tight">{inquiries[index]}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Center: The Script / Playbook */}
      <div className="absolute z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(37,211,102,0)", "0 0 30px rgba(37,211,102,0.3)", "0 0 0px rgba(37,211,102,0)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-3 items-center justify-center rounded-2xl border border-zinc-800 flex flex-col gap-2 relative shadow-xl"
        >
          <div className="relative w-12 h-12 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 flex items-center justify-center overflow-hidden">
             {/* Scanning line effect */}
             <motion.div 
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent to-[#25D366]/30"
             />
             <BookOpen className="w-6 h-6 text-[#25D366] relative z-10" />
          </div>
        </motion.div>
        
        {/* Animated Process dots */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[110%] flex gap-1">
           {[0, 1, 2].map((i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0.2 }}
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
               className="w-1 h-1 rounded-full bg-zinc-300"
             />
           ))}
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-[110%] flex gap-1">
           {[0, 1, 2].map((i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0.2 }}
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
               className="w-1 h-1 rounded-full bg-[#25D366]"
             />
           ))}
        </div>
      </div>

      {/* 3. Right Side: Transformation (Sale) */}
      <div className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 flex justify-end w-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "pay"}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }} // slightly delayed after query
            className="bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-3 rounded-2xl shadow-sm flex items-start gap-3 backdrop-blur-sm w-fit"
          >
            <div className="mt-0.5 bg-[#25D366] rounded-full p-1.5 shrink-0 shadow-lg shadow-green-500/30">
              <DollarSign className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#128C7E] uppercase tracking-wide mb-0.5 flex items-center gap-1">
                 <CheckCircle2 className="w-3 h-3" /> Payment Sent
              </span>
              <span className="text-sm font-black text-green-900 leading-tight">{payments[index]}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
