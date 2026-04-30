import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight, XCircle, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function WorkflowDiagram() {
  return (
    <div className="py-12 px-4 md:px-12 w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="cf-heading text-3xl mb-4 text-zinc-900">How You Are Losing Money vs How We Fix It</h3>
        <p className="text-zinc-500 font-medium max-w-xl mx-auto">See exactly where the leak happens in your sales process, and how the Profit-Lock system plugs it.</p>
      </div>

      <div className="relative">
        {/* Connecting Lines Desktop */}
        <div className="hidden md:block absolute top-[100px] left-10 right-10 h-0.5 bg-gradient-to-r from-zinc-200 via-zinc-200 to-zinc-200 -z-10" />

        <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
          
          {/* Step 1: The Lead */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center mb-6 relative">
              <MessageSquare className="w-6 h-6 text-zinc-600" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">1</div>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-zinc-900 mb-2">New Inquiry</h4>
              <p className="text-xs text-zinc-500 bg-zinc-50 px-3 py-2 rounded-lg border border-zinc-100">"Is this available?" or "How much?"</p>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center h-16 absolute left-[22%] top-0">
             <ArrowRight className="w-5 h-5 text-zinc-300" />
          </div>

          {/* Step 2: The OLD Way (Leak) */}
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 shadow-sm flex items-center justify-center mb-6 relative group">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-center w-full">
              <h4 className="font-bold text-zinc-900 mb-2 line-through opacity-70">The Old Way</h4>
              <p className="text-xs text-red-600 bg-red-50/50 px-3 py-2 rounded-lg border border-red-100">You reply with just the price. They ghost. End of chat.</p>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center items-center h-16 absolute left-[47%] top-0">
             <div className="px-3 py-1 bg-zinc-900 text-[10px] text-white font-bold rounded-full uppercase tracking-widest whitespace-nowrap z-10 shadow-lg">Intervention</div>
             <div className="w-32 h-0.5 bg-zinc-900 absolute -z-10" />
          </div>

          {/* Step 3: The NEW Way (System) */}
          <div className="flex flex-col items-center mt-8 md:mt-0">
             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-[0_10px_30px_rgba(37,211,102,0.3)] flex items-center justify-center mb-4 relative z-10">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h4 className="font-black text-[#128C7E] mb-2 text-lg">Sales Rescue System</h4>
              <p className="text-xs text-zinc-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100/50 shadow-sm font-medium">You use a Trust-Building Script. The conversation continues.</p>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center items-center h-16 absolute left-[75%] top-0">
             <ArrowRight className="w-5 h-5 text-[#25D366]" />
             <div className="w-[150%] h-0.5 bg-gradient-to-r from-[#25D366] to-transparent absolute right-1/2 -z-10 bg-[length:10px_10px] bg-repeat-x" style={{ backgroundImage: 'linear-gradient(to right, #25D366 50%, transparent 50%)' }} />
          </div>

          {/* Step 4: The Result */}
          <div className="flex flex-col items-center mt-8 md:mt-0">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 shadow-xl flex items-center justify-center mb-6 relative">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-center">
              <h4 className="font-black text-zinc-900 mb-2">Sale Closed</h4>
              <p className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200 font-bold">Alert drops. Customer feels understood & secure.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
