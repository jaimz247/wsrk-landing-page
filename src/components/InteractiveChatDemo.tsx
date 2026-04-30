import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Check, CheckCircle2, XCircle } from 'lucide-react';

const Demos = [
  {
    id: 1,
    title: "The 'Price Inquiry' Recovery",
    buyer: "Hi, how much is the black bag?",
    badResponse: "It's ₦45,000 plus delivery.",
    badResult: "Buyer reads and ghosts. No perceived value.",
    goodResponse: "Hi Sarah! That's the Onyx Leather Tote. It's ₦45,000. Are you looking for an everyday work bag or something for travel? It fits a 15-inch laptop perfectly.",
    goodResult: "Buyer replies with their needs. You built a connection and highlighted value before price."
  },
  {
    id: 2,
    title: "Handling 'I will get back to you'",
    buyer: "Okay, I will get back to you.",
    badResponse: "Okay, looking forward to hearing from you. Thanks.",
    badResult: "You lost control of the sale. They forget.",
    goodResponse: "Of course! Let me hold this specific design for you until tomorrow since it's almost out of stock. Should I check back with you around 2pm?",
    goodResult: "Micro-commitment secured. Urgency applied without being pushy."
  }
];

export default function InteractiveChatDemo() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [showGood, setShowGood] = useState(false);

  const demo = Demos[activeDemo];

  return (
    <div className="cf-card p-6 md:p-10 bg-white border border-zinc-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
      <div className="text-center mb-8">
         <h3 className="text-2xl font-black text-zinc-900 mb-2">Interactive Script Demo</h3>
         <p className="text-zinc-500 text-sm font-medium">See the difference a structured reply makes.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Demos.map((d, index) => (
          <button
            key={d.id}
            onClick={() => { setActiveDemo(index); setShowGood(false); }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${activeDemo === index ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
          >
            {d.title}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Bad Chat */}
        <div className={`transition-opacity duration-500 p-6 bg-zinc-50 rounded-3xl border ${showGood ? 'opacity-40 grayscale border-zinc-200' : 'border-red-100 opacity-100'}`}>
           <div className="flex items-center gap-2 mb-6">
             <XCircle className="w-5 h-5 text-red-500" />
             <span className="font-bold text-red-500 text-sm">The Leak (Loss)</span>
           </div>
           
           <div className="space-y-4">
             {/* Buyer Message */}
             <div className="flex flex-col items-start gap-1">
               <span className="text-[10px] font-bold text-zinc-400 uppercase ml-2 tracking-widest">Buyer</span>
               <div className="bg-white border border-zinc-200 text-zinc-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] text-sm font-medium">
                 {demo.buyer}
               </div>
             </div>

             {/* Seller Message (Bad) */}
             <div className="flex flex-col items-end gap-1">
               <span className="text-[10px] font-bold text-zinc-400 uppercase mr-2 tracking-widest">You (Typical)</span>
               <div className="bg-red-50 border border-red-100 text-red-900 px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%] text-sm font-medium text-right">
                 {demo.badResponse}
               </div>
             </div>
           </div>

           <div className="mt-8 p-4 bg-red-50/50 rounded-xl border border-red-100/50">
             <p className="text-xs text-red-600 font-bold flex gap-2">
               <span>Result:</span> <span>{demo.badResult}</span>
             </p>
           </div>
        </div>

        {/* Good Chat Overlay / Switch */}
        <div className="relative">
          {!showGood ? (
             <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-3xl border border-zinc-100">
               <button 
                 onClick={() => setShowGood(true)}
                 className="cf-button-primary px-6 py-3 text-sm shadow-xl flex items-center gap-2"
               >
                 <CheckCircle2 className="w-4 h-4" />
                 Apply Rescue Script
               </button>
             </div>
          ) : null}

          <div className={`p-6 bg-green-50/30 rounded-3xl border transition-all duration-500 h-full ${showGood ? 'border-[#25D366]/30 shadow-lg shadow-green-500/10' : 'border-zinc-100'}`}>
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                 <span className="font-bold text-[#128C7E] text-sm">The Fix (Win)</span>
               </div>
               {showGood && (
                 <button onClick={() => setShowGood(false)} className="text-[10px] uppercase font-bold text-zinc-400 hover:text-zinc-900 flex items-center gap-1"><RefreshCw className="w-3 h-3"/> Reset</button>
               )}
             </div>

             <div className="space-y-4">
               {/* Buyer Message */}
               <div className="flex flex-col items-start gap-1">
                 <span className="text-[10px] font-bold text-zinc-400 uppercase ml-2 tracking-widest">Buyer</span>
                 <div className="bg-white border border-zinc-200 text-zinc-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] text-sm font-medium">
                   {demo.buyer}
                 </div>
               </div>

               {/* Seller Message (Good) */}
               <AnimatePresence>
                 {showGood && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     className="flex flex-col items-end gap-1"
                   >
                     <span className="text-[10px] font-bold text-[#128C7E] uppercase mr-2 tracking-widest">You (Optimized)</span>
                     <div className="bg-[#25D366] text-white shadow-md shadow-green-500/20 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[90%] text-sm font-medium text-right leading-relaxed">
                       {demo.goodResponse}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             <AnimatePresence>
               {showGood && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="mt-8 p-4 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20"
                 >
                   <p className="text-xs text-[#128C7E] font-bold flex gap-2">
                     <span>Result:</span> <span>{demo.goodResult}</span>
                   </p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
