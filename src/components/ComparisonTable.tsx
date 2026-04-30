import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function ComparisonTable() {
  const comparisons = [
    {
      feature: "Response Speed",
      manual: "Slow (Typing manually)",
      kit: "Instant (1-click copy-paste)"
    },
    {
      feature: "Handling Objections",
      manual: "Guesswork & freezing",
      kit: "Proven psychological scripts"
    },
    {
      feature: "Lead Follow-up",
      manual: "Relying on memory",
      kit: "Structured tracker system"
    },
    {
      feature: "Value Perception",
      manual: "Seen as 'just another vendor'",
      kit: "Viewed as a premium authority"
    },
    {
      feature: "Conversion Rate",
      manual: "Usually low (ghosting happens)",
      kit: "Optimized for maximum sales"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h3 className="cf-heading text-3xl md:text-4xl mb-4">Why Manual Chatting Fails</h3>
        <p className="text-zinc-500 font-medium max-w-xl mx-auto">The difference between winging it and using a proven conversion system.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-3 bg-zinc-50 border-b border-zinc-200 p-6 md:p-8">
          <div className="font-bold text-zinc-900 uppercase tracking-widest text-xs md:text-sm">Key Area</div>
          <div className="font-bold text-zinc-500 flex items-center gap-2 text-sm md:text-base">
            <XCircle className="w-5 h-5 hidden md:block" /> Manual / Old Way
          </div>
          <div className="font-bold text-[#128C7E] flex items-center gap-2 text-sm md:text-base">
            <CheckCircle2 className="w-5 h-5 hidden md:block text-[#25D366]" /> Sales Rescue Kit
          </div>
        </div>

        <div className="divide-y divide-zinc-100">
          {comparisons.map((row, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="grid grid-cols-3 p-6 md:p-8 hover:bg-zinc-50/50 transition-colors items-center"
            >
              <div className="font-bold text-zinc-800 text-sm md:text-base pr-4">{row.feature}</div>
              <div className="text-zinc-500 text-sm md:text-base font-medium pr-4">{row.manual}</div>
              <div className="text-[#128C7E] text-sm md:text-base font-bold bg-[#25D366]/10 px-4 py-2 rounded-xl inline-block w-fit">{row.kit}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
