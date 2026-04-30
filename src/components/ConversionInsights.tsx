import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Users, ArrowUpRight } from 'lucide-react';

export default function ConversionInsights() {
  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20">
      <div className="text-center mb-16">
        <h2 className="cf-heading text-4xl md:text-5xl mb-6">
          The Hidden Cost of <span className="cf-text-gradient-accent">Slow Replies & Weak Scripts</span>
        </h2>
        <p className="text-xl text-zinc-600 font-medium">Why you need to fix your chat sales process immediately.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="cf-card p-10 flex flex-col bg-zinc-900 border-none text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 text-white/5">
            <Clock className="w-48 h-48" />
          </div>
          <div className="z-10 flex flex-col h-full">
            <h3 className="text-6xl font-black mb-4">78<span className="text-[#25D366]">%</span></h3>
            <p className="text-xl font-bold mb-4 line-clamp-2">of sales go to the first to reply.</p>
            <p className="text-zinc-400 font-medium mt-auto">If you are manually typing out every response, you are too slow. The Script Bank gives you instant copy-paste answers.</p>
          </div>
        </div>

        <div className="cf-card p-10 flex flex-col bg-zinc-50 border-zinc-200 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-8 -mt-8 text-black/5">
            <Users className="w-48 h-48" />
          </div>
          <div className="z-10 flex flex-col h-full">
            <h3 className="text-6xl font-black mb-4 text-zinc-900">4<span className="text-[#25D366]">x</span></h3>
            <p className="text-xl font-bold mb-4 text-zinc-900">conversion lift on average.</p>
            <p className="text-zinc-600 font-medium mt-auto">When sellers stop leading with price and start using the Trust-Building framework, sales multiply without extra leads.</p>
          </div>
        </div>

        <div className="cf-card p-10 flex flex-col bg-white border-zinc-200 relative overflow-hidden ring-1 ring-inset ring-zinc-100">
           <div className="absolute top-0 right-0 -mr-8 -mt-8 text-black/5">
            <TrendingUp className="w-48 h-48" />
          </div>
          <div className="z-10 flex flex-col h-full">
            <h3 className="text-6xl font-black mb-4 text-zinc-900">60<span className="text-[#25D366]">%</span></h3>
            <p className="text-xl font-bold mb-4 text-zinc-900">of leads vanish if you don't follow up.</p>
            <p className="text-zinc-600 font-medium mt-auto">Our Lead Tracker system guarantees you follow up within the golden 24-48 hour window perfectly, reviving dead chats.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
