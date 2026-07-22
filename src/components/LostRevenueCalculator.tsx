import React, { useState, useEffect, useRef } from 'react';
import { Calculator, ArrowRight, TrendingUp, AlertTriangle, Droplets, ShieldCheck, Flame } from 'lucide-react';
import { motion, animate } from 'motion/react';

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent = `${prefix}${Math.round(val).toLocaleString()}${suffix}`;
      }
    });

    return () => controls.stop();
  }, [value, prefix, suffix]);

  return <span ref={nodeRef}>{prefix}{value.toLocaleString()}{suffix}</span>;
};

const LeakingBucketGraphic = () => (
  <div className="bg-zinc-800/60 border border-zinc-700/60 rounded-2xl p-4 sm:p-6 mb-6">
    <div className="flex items-center justify-center gap-2 mb-4 text-[#25D366] text-xs font-bold uppercase tracking-widest">
      <Droplets className="w-4 h-4 text-[#25D366]" />
      Visualizing Your Sales Leakage
    </div>
    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
      {/* Old Leaking Way */}
      <div className="flex flex-col items-center bg-red-950/20 border border-red-500/30 rounded-xl p-4 w-full sm:w-1/2">
        <div className="text-red-400 font-extrabold text-xs sm:text-sm mb-2 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-red-500" />
          Unprotected Sales Funnel
        </div>
        <svg viewBox="0 0 200 160" className="w-32 h-28 my-1 overflow-visible">
          {/* Bucket Outline */}
          <path d="M 40 30 L 160 30 L 140 120 L 60 120 Z" fill="#27272a" stroke="#ef4444" strokeWidth="3" />
          {/* Bucket Handle */}
          <path d="M 35 30 Q 100 5 165 30" fill="none" stroke="#71717a" strokeWidth="2" />
          {/* Incoming Traffic */}
          <path d="M 100 0 L 100 28" stroke="#3b82f6" strokeWidth="4" strokeDasharray="4 2" />
          <text x="100" y="20" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">Chat Inquiries</text>
          {/* Leak Holes */}
          <circle cx="80" cy="80" r="4" fill="#ef4444" />
          <path d="M 80 84 L 75 145" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2" />
          <text x="50" y="145" fill="#f87171" fontSize="9" fontWeight="bold">"How much?" leak</text>
          
          <circle cx="120" cy="100" r="4" fill="#ef4444" />
          <path d="M 120 104 L 125 150" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2" />
          <text x="150" y="150" fill="#f87171" fontSize="9" fontWeight="bold">Ghosted after invoice</text>
        </svg>
        <span className="text-xs text-red-300 font-semibold mt-2">Up to 80% money left on table</span>
      </div>

      {/* Plugged with Rescue Kit */}
      <div className="flex flex-col items-center bg-green-950/20 border border-[#25D366]/40 rounded-xl p-4 w-full sm:w-1/2">
        <div className="text-[#25D366] font-extrabold text-xs sm:text-sm mb-2 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
          Plugged with Rescue Kit
        </div>
        <svg viewBox="0 0 200 160" className="w-32 h-28 my-1 overflow-visible">
          {/* Bucket Outline */}
          <path d="M 40 30 L 160 30 L 140 120 L 60 120 Z" fill="#14532d" stroke="#25D366" strokeWidth="3" />
          {/* Bucket Handle */}
          <path d="M 35 30 Q 100 5 165 30" fill="none" stroke="#25D366" strokeWidth="2" />
          {/* Water/Gold Level */}
          <path d="M 45 45 L 155 45 L 140 118 L 60 118 Z" fill="#25D366" opacity="0.35" />
          {/* Sealed Plugs */}
          <circle cx="80" cy="80" r="6" fill="#25D366" stroke="#ffffff" strokeWidth="1.5" />
          <text x="80" y="83" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">✓</text>
          
          <circle cx="120" cy="100" r="6" fill="#25D366" stroke="#ffffff" strokeWidth="1.5" />
          <text x="120" y="103" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">✓</text>

          {/* Outflow to Bank */}
          <path d="M 100 120 L 100 145" stroke="#25D366" strokeWidth="5" />
          <text x="100" y="155" fill="#4ade80" fontSize="10" fontWeight="extrabold" textAnchor="middle">PAID ORDERS (₦)</text>
        </svg>
        <span className="text-xs text-green-300 font-semibold mt-2">Plugs leaks & locks in sales</span>
      </div>
    </div>
  </div>
);

export default function LostRevenueCalculator() {
  const [inquiries, setInquiries] = useState(50);
  const [conversionRate, setConversionRate] = useState(5);
  const [aov, setAov] = useState(50000); // 50,000 Naira

  // New system conversion rate (conservative +15%)
  const newConversionRate = Math.min(conversionRate + 15, 100);

  const currentRevenue = Math.round((inquiries * (conversionRate / 100)) * aov);
  const newRevenue = Math.round((inquiries * (newConversionRate / 100)) * aov);
  const lostRevenueWeekly = newRevenue - currentRevenue;
  const lostRevenueMonthly = lostRevenueWeekly * 4;
  const lostRevenueYearly = lostRevenueWeekly * 52;

  return (
    <div className="cf-card p-6 md:p-12 relative overflow-hidden bg-zinc-900 text-white border border-zinc-800 rounded-3xl">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366] opacity-10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 opacity-10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="relative z-10 text-center mb-8">
        <h3 className="cf-heading text-3xl md:text-4xl text-white mb-3">
          How Much Money Are You <span className="cf-text-gradient-accent">Losing Right Now?</span>
        </h3>
        <p className="text-zinc-400 font-medium text-sm md:text-base max-w-xl mx-auto">
          Calculate the undeniable cost of 'I will get back to you', price shock, and buyer ghosting.
        </p>
      </div>

      <LeakingBucketGraphic />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6 relative z-10">
          {/* Slider 1 */}
          <div className="bg-zinc-800/50 p-5 sm:p-6 rounded-2xl border border-zinc-700/50">
            <label className="flex justify-between items-center text-sm font-bold text-zinc-300 mb-3">
              <span>Weekly WhatsApp Inquiries</span>
              <span className="text-white text-lg font-black bg-zinc-700 px-3 py-1 rounded-lg">{inquiries}</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={inquiries} 
              onChange={(e) => setInquiries(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer range-slider mt-2"
            />
          </div>

          {/* Slider 2 */}
          <div className="bg-zinc-800/50 p-5 sm:p-6 rounded-2xl border border-zinc-700/50">
            <label className="flex justify-between items-center text-sm font-bold text-zinc-300 mb-3">
              <span>Current Conversion Rate</span>
              <span className="text-white text-lg font-black bg-zinc-700 px-3 py-1 rounded-lg">{conversionRate}%</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={conversionRate} 
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer range-slider mt-2"
            />
          </div>

          {/* Input 3 */}
          <div className="bg-zinc-800/50 p-5 sm:p-6 rounded-2xl border border-zinc-700/50">
            <label className="flex justify-between items-center text-sm font-bold text-zinc-300 mb-3">
              <span>Average Order Value (₦)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₦</span>
              <input 
                type="number"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-10 py-3.5 text-white font-bold focus:outline-none focus:border-[#25D366] transition-colors text-base"
                placeholder="e.g. 50000"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full bg-zinc-800/40 backdrop-blur-md border border-zinc-700/60 p-6 sm:p-8 rounded-3xl flex flex-col justify-center relative shadow-2xl"
          >
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center shadow-lg border border-red-500/50 backdrop-blur-md">
              <AlertTriangle className="w-5 h-5" />
            </div>
            
            <div className="mb-6 pl-4 border-l-2 border-zinc-700">
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">Current Estimated Revenue / Wk</p>
              <p className="text-2xl sm:text-3xl font-black text-white">
                <AnimatedNumber value={currentRevenue} prefix="₦" />
              </p>
            </div>

            <div className="mb-6 p-5 bg-gradient-to-r from-[#25D366]/20 to-transparent rounded-2xl border-l-4 border-[#25D366]">
              <p className="text-xs text-[#25D366] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Potential Revenue / Wk
              </p>
              <p className="text-3xl sm:text-4xl font-black text-white">
                <AnimatedNumber value={newRevenue} prefix="₦" />
              </p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">With Rescue Kit scripts & follow-up system (+15% higher conversion)</p>
            </div>

            <div className="pt-6 border-t border-zinc-700/50">
              <p className="text-xs text-red-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Money Left on the Table
              </p>
              <p className="text-4xl sm:text-5xl font-black text-red-500 mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <AnimatedNumber value={lostRevenueWeekly} prefix="₦" />
                <span className="text-sm text-zinc-400 font-bold ml-2">/ week</span>
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl text-center">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Monthly Loss</p>
                  <p className="text-base font-black text-red-400">₦{lostRevenueMonthly.toLocaleString()}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl text-center">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Annual Loss</p>
                  <p className="text-base font-black text-red-400">₦{lostRevenueYearly.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        /* Custom styles for range slider to make it green */
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%; 
          background: #25D366;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(37, 211, 102, 0.5);
        }
        .range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #25D366;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(37, 211, 102, 0.5);
        }
      `}</style>
    </div>
  );
}


