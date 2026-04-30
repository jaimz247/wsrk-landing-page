import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function LeadCaptureInline() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would typically send truth to your backend/email provider
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-[32px] bg-gradient-to-br from-zinc-900 to-black p-1 md:p-2 shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366] opacity-10 blur-[80px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-zinc-500 opacity-10 blur-[80px] mix-blend-screen pointer-events-none" />
      
      <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-md p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center gap-10">
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4 ml-[-2px]" /> Free Download
          </div>
          <h3 className="cf-heading text-3xl md:text-4xl text-white mb-4">
            Get The <span className="cf-text-gradient-accent text-[#25D366]">'Price Defense'</span> Framework Free
          </h3>
          <p className="text-zinc-400 font-medium md:text-lg mb-6 leading-relaxed">
            Stop freezing when they ask "How much?". Download the exact 2-page copy-paste framework to answer price questions without triggering ghosting.
          </p>
          
          <ul className="space-y-3 mb-8 text-left inline-block">
            {["Never lose a sale to 'it's too expensive'", "Pivot naturally to value instead of cost", "Works for physical & digital products"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                <span className="font-medium text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-[380px] shrink-0">
          {!submitted ? (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit} 
              className="bg-zinc-800/80 border border-zinc-700/50 p-6 rounded-2xl shadow-xl"
            >
              <div className="mb-4">
                <label htmlFor="email" className="block text-zinc-300 font-bold text-sm mb-2">Where should we send it?</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    id="email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your best email..."
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#25D366] transition-colors"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black rounded-xl transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 group"
              >
                Send Me The Framework 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-zinc-500 text-xs text-center mt-4">100% Free. No spam ever.</p>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#25D366]/10 border border-[#25D366]/30 p-8 rounded-2xl text-center"
            >
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">Check your inbox!</h4>
              <p className="text-zinc-400 text-sm">We've just sent the framework to {email}. It should arrive in the next 2 minutes.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
