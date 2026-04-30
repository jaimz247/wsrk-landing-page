import React, { useState, useEffect, useRef } from 'react';
import { Calculator, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
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

export default function LostRevenueCalculator() {
  const [inquiries, setInquiries] = useState(50);
  const [conversionRate, setConversionRate] = useState(5);
  const [aov, setAov] = useState(50000); // 50,000 Naira
  const [showResults, setShowResults] = useState(false);

  // New system conversion rate (conservative +15%)
  const newConversionRate = Math.min(conversionRate + 15, 100);

  const currentRevenue = Math.round((inquiries * (conversionRate / 100)) * aov);
  const newRevenue = Math.round((inquiries * (newConversionRate / 100)) * aov);
  const lostRevenue = newRevenue - currentRevenue;

  return (
    <div className="cf-card p-8 md:p-12 relative overflow-hidden bg-zinc-900 text-white border border-zinc-800">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366] opacity-10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 opacity-10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="relative z-10 text-center mb-10">
        <h3 className="cf-heading text-3xl md:text-4xl text-white mb-4">
          How Much Are You <span className="cf-text-gradient-accent">Losing?</span>
        </h3>
        <p className="text-zinc-400 font-medium">Calculate the undeniable cost of 'I will get back to you' and ghosting.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8 relative z-10">
          {/* Slider 1 */}
          <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50">
            <label className="flex justify-between text-sm font-bold text-zinc-300 mb-4">
              <span>Weekly WhatsApp Inquiries</span>
              <span className="text-white text-xl bg-zinc-700 px-3 py-1 rounded-lg">{inquiries}</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={inquiries} 
              onChange={(e) => { setInquiries(Number(e.target.value)); setShowResults(false); }}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer range-slider mt-2"
            />
          </div>

          {/* Slider 2 */}
          <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50">
            <label className="flex justify-between text-sm font-bold text-zinc-300 mb-4">
              <span>Current Conversion Rate</span>
              <span className="text-white text-xl bg-zinc-700 px-3 py-1 rounded-lg">{conversionRate}%</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={conversionRate} 
              onChange={(e) => { setConversionRate(Number(e.target.value)); setShowResults(false); }}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer range-slider mt-2"
            />
          </div>

          {/* Input 3 */}
          <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50">
            <label className="flex justify-between text-sm font-bold text-zinc-300 mb-4">
              <span>Average Order Value (₦)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₦</span>
              <input 
                type="number"
                value={aov}
                onChange={(e) => { setAov(Number(e.target.value)); setShowResults(false); }}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-10 py-4 text-white font-bold focus:outline-none focus:border-[#25D366] transition-colors"
                placeholder="e.g. 50000"
              />
            </div>
          </div>

          {!showResults && (
            <button 
              onClick={() => setShowResults(true)}
              className="w-full py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-lg rounded-xl transition-colors shadow-[0_0_30px_rgba(37,211,102,0.2)] flex items-center justify-center gap-2 group"
            >
              Reveal My Lost Revenue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        <div className="relative z-10">
          {showResults ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="h-full bg-zinc-800/40 backdrop-blur-md border border-zinc-700/50 p-8 rounded-3xl flex flex-col justify-center relative shadow-2xl"
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center shadow-lg border border-red-500/50 backdrop-blur-md">
                <AlertTriangle className="w-5 h-5" />
              </div>
              
              <div className="mb-8 pl-4 border-l-2 border-zinc-700">
                <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest mb-1">Current Revenue / Wk</p>
                <p className="text-3xl font-black text-white">
                  <AnimatedNumber value={currentRevenue} prefix="₦" />
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 p-6 bg-gradient-to-r from-[#25D366]/20 to-transparent rounded-2xl border-l-4 border-[#25D366]"
              >
                <p className="text-sm text-[#25D366] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Potential Revenue
                </p>
                <p className="text-4xl md:text-5xl font-black text-white">
                  <AnimatedNumber value={newRevenue} prefix="₦" />
                </p>
                <p className="text-sm text-zinc-400 mt-2 font-medium">With optimized Profit-Lock scripts (+15% higher conversion)</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-8 border-t border-zinc-700/50"
              >
                <p className="text-sm text-red-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Money Left on the Table
                </p>
                <p className="text-5xl md:text-6xl font-black text-red-500 mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <AnimatedNumber value={lostRevenue} prefix="₦" />
                </p>
                <p className="text-sm text-zinc-400 font-medium bg-red-500/10 px-3 py-1.5 rounded-lg inline-block text-red-400">Every single week.</p>
              </motion.div>
            </motion.div>
          ) : (
            <div className="h-full bg-zinc-800/20 border border-zinc-800 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-inner border border-zinc-700/50">
                <Calculator className="w-10 h-10 text-zinc-600" />
              </div>
              <h4 className="text-xl font-bold text-zinc-300 mb-2">Let's do the math</h4>
              <p className="text-zinc-500 font-medium max-w-sm">Adjust the numbers on the left and click reveal to see exactly how much money is slipping through your chats.</p>
            </div>
          )}
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

