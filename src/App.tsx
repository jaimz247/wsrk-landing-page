/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Copy, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Lock, 
  Search, 
  BarChart3, 
  Clock, 
  ChevronDown,
  X,
  Star,
  Layers,
  MousePointerClick,
  Check,
  AlertCircle,
  Layout,
  ShoppingBag,
  Briefcase,
  MonitorPlay,
  User
} from 'lucide-react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import CheckoutModal from './components/CheckoutModal';

// --- Components ---

const Button = ({ 
  children, 
  className = "", 
  variant = "primary", 
  href,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  [key: string]: any;
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 text-center tracking-tight";
  const variants = {
    primary: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-xl shadow-green-500/20 hover:shadow-green-500/40",
    secondary: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10 hover:shadow-zinc-900/20",
    outline: "border-2 border-zinc-200 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50"
  };

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "", containerClassName = "" }: { children: React.ReactNode; className?: string; id?: string; containerClassName?: string }) => (
  <section id={id} className={`py-20 md:py-32 px-6 ${className}`}>
    <div className={`max-w-6xl mx-auto ${containerClassName}`}>
      {children}
    </div>
  </section>
);

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-block px-4 py-1.5 rounded-full bg-green-50 text-[#128C7E] text-[11px] font-bold uppercase tracking-[0.1em] mb-6 border border-green-100/50 ${className}`}>
    {children}
  </span>
);

const FAQItem = ({ question, answer }: { question: string; answer: string; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button 
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold text-zinc-900 group-hover:text-[#128C7E] transition-colors pr-8">{question}</span>
        <div className={`w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-zinc-900 border-zinc-900' : ''}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-zinc-400'}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-zinc-600 leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 14 days in milliseconds
    const cycleDuration = 14 * 24 * 60 * 60 * 1000;
    // An arbitrary fixed epoch in the past to ensure consistent cycles for all users
    const epoch = new Date('2024-01-01T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeSinceEpoch = now - epoch;
      const timeIntoCurrentCycle = timeSinceEpoch % cycleDuration;
      const distance = cycleDuration - timeIntoCurrentCycle;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 font-mono bg-white/20 px-2.5 py-1 rounded-md text-white text-xs tracking-wider">
      <div className="flex flex-col items-center leading-none"><span className="font-bold text-sm">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-[8px] uppercase opacity-70">days</span></div>
      <span className="font-bold self-start mt-0.5">:</span>
      <div className="flex flex-col items-center leading-none"><span className="font-bold text-sm">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[8px] uppercase opacity-70">hrs</span></div>
      <span className="font-bold self-start mt-0.5">:</span>
      <div className="flex flex-col items-center leading-none"><span className="font-bold text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[8px] uppercase opacity-70">min</span></div>
      <span className="font-bold self-start mt-0.5">:</span>
      <div className="flex flex-col items-center leading-none"><span className="font-bold text-sm">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[8px] uppercase opacity-70">sec</span></div>
    </div>
  );
};

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !inView) return;
    
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent = `${prefix}${Math.round(val)}${suffix}`;
      }
    });
    
    return () => controls.stop();
  }, [value, prefix, suffix, inView]);

  return <span ref={nodeRef}>0</span>;
};

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100 selection:text-green-900 antialiased">
      
      {/* Top Urgency Banner */}
      <div className="bg-zinc-900 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-[60]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          <span>Get lifetime access for ₦7,900 before the price increases to ₦15,000.</span>
        </div>
        <CountdownTimer />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-3 translate-y-0' : 'bg-transparent py-8 translate-y-10 sm:translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg tracking-tight">WSRK</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Profit-Lock™</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">What's Inside</a>
            <a href="#pricing" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">Pricing</a>
            <a href="https://app.chatsalesrescue.com/access" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">Member Login</a>
            <Button onClick={() => setIsCheckoutOpen(true)} variant="secondary" className="px-5 py-2.5 text-sm md:px-7 md:py-3.5 md:text-base">
              Get Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-32 pb-20 md:pt-52 md:pb-40 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-green-50 rounded-full blur-[120px] opacity-40 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-30 -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge>Powered by the Profit-Lock™ Method</Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-900 mb-8 leading-[0.95]">
              Stop Losing Buyers <br />
              <span className="text-[#128C7E]">on WhatsApp</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Get the private access portal with a WhatsApp Sales Leak Audit, copy-ready scripts, guided setup, and practical tools to help you protect your prices, follow up better, and turn more WhatsApp chats into sales.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center w-full max-w-xl">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <Button onClick={() => setIsCheckoutOpen(true)} className="w-full sm:flex-1 group text-lg">
                    Get Instant Access
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto px-10">
                    See What’s Inside
                  </Button>
                </div>
                <p className="text-zinc-500 text-xs font-bold text-center mt-3">
                  Instant access delivered securely to your email.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {[
                  "Start with a WhatsApp Sales Leak Audit",
                  "100+ copy-ready scripts for real sales conversations",
                  "Interactive setup, follow-up tools, and tracker"
                ].map((bullet, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-bold text-zinc-500">
                    <Check className="w-4 h-4 text-[#25D366]" />
                    {bullet}
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em] mt-4">
                Built for vendors, service providers, and online sellers
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Bar */}
        <div className="mt-24 pt-12 border-t border-zinc-100">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span className="font-black text-xl tracking-tighter">WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <span className="font-black text-xl tracking-tighter">MobileFirst</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-black text-xl tracking-tighter">SecurePay</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-black text-xl tracking-tighter">FastTrack</span>
            </div>
          </div>
          <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-8">
            Trusted by 1,000+ sellers across WhatsApp, Instagram & Facebook
          </p>
        </div>
      </Section>

      {/* Problem Section */}
      <Section className="bg-zinc-50 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <Badge>The Problem</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
              People Are Messaging You — <br />
              <span className="text-red-500">But Too Many Never Pay</span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p>If you sell on WhatsApp, you already know how frustrating this can be.</p>
              <div className="space-y-1 font-bold text-zinc-900">
                <p>People message you. They ask questions.</p>
                <p>They ask for the price. You respond.</p>
                <p className="text-red-500">Then silence.</p>
              </div>
              <p>
                Sometimes they seem serious. Sometimes they say they’ll get back to you. Sometimes they even ask for payment details. Then they disappear.
              </p>
              <p>
                And after a while, it starts to feel like you need more leads, more ads, more followers, more views, or more traffic.
              </p>
              <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                <p className="font-bold text-zinc-900 mb-2">But often, that is not the real problem.</p>
                <p>The real problem is that too many of your current WhatsApp conversations are not converting into paid orders.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-zinc-200 border border-zinc-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                This means:
              </h3>
              <ul className="space-y-5">
                {[
                  "Hot leads are cooling off",
                  "Price inquiries are dying too early",
                  "Follow-up is inconsistent",
                  "Chats are messy",
                  "Serious buyers are slipping away"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                    <span className="text-zinc-800 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-8 border-t border-zinc-100">
                <p className="text-zinc-500 font-medium italic text-center">
                  "You do not always have a lead problem. Sometimes, you have a WhatsApp sales process problem."
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Find the Leaks Section */}
      <Section className="bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto text-center">
          <Badge>The Diagnostic Approach</Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            Start by Finding the Leaks <br />
            <span className="text-[#128C7E]">in Your WhatsApp Sales Process</span>
          </h2>
          <p className="text-xl text-zinc-600 mb-12 leading-relaxed font-medium">
            Many sellers are losing money in hidden points of the conversation. The included Sales Leak Audit helps reveal exactly where your chats are breaking down, so the portal can help you fix those exact leaks.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hidden Leaks</h3>
              <p className="text-zinc-500 font-medium">Discover where buyers are silently dropping off before they ever see your price.</p>
            </div>
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Audit</h3>
              <p className="text-zinc-500 font-medium">Take the diagnostic assessment to pinpoint your specific follow-up and closing weaknesses.</p>
            </div>
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Check className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Fix</h3>
              <p className="text-zinc-500 font-medium">Use the portal's targeted scripts and tools to plug the leaks and recover lost revenue.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pain Expansion */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge>Relatability</Badge>
            <h2 className="text-4xl font-black mb-6">If This Sounds Familiar, <br />This Was Built for You</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {[
              "People ask for price and disappear",
              "You are not always sure what to say next",
              "You follow up too late — or not at all",
              "Your replies are inconsistent depending on the day",
              "Buyers push your price down too easily",
              "Your chats are not well organized",
              "Serious leads get buried in too many conversations",
              "You have interest, but not enough actual payment",
              "You know you could be closing more sales if your process was tighter"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </div>
                <span className="text-zinc-700 font-bold leading-tight">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-xl font-bold text-zinc-900 mb-8">
              If any of these sound familiar, you do not need more random hustle first. <br />
              <span className="text-[#128C7E]">You need a better system for how you sell inside WhatsApp.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* Root Cause */}
      <Section className="bg-zinc-900 text-white rounded-[40px] mx-6 my-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="bg-white/10 text-white border-white/20">The Root Cause</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Why Most Sellers Keep <br />
              Losing Sales on WhatsApp
            </h2>
            <p className="text-xl text-zinc-400 mb-8 font-medium">
              Usually, it is not because the product is bad. <br />
              It is because the sales process inside the chat is weak.
            </p>
            <div className="space-y-6 text-zinc-300">
              <p>Most WhatsApp sales do not fail because the buyer never had interest. They fail because something in the conversation weakens momentum.</p>
              <p className="font-bold text-white">In other words, the problem is not always what you are selling. The problem is often how the sale is being handled inside the conversation.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              "No qualification before giving the price",
              "Weak trust-building in the first 3 messages",
              "Poor payment confirmation flow",
              "No structured follow-up system",
              "No lead temperature tracking",
              "Weak chat organization and lost messages"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="font-bold text-zinc-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Positioning & Before/After */}
      <Section className="bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge>The Transformation</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              This Is Not Just a Toolkit. <br />
              <span className="text-[#128C7E]">It’s a WhatsApp Conversion System.</span>
            </h2>
            <p className="text-xl text-zinc-600 font-medium max-w-2xl mx-auto">
              Diagnose leaks → Install fixes → Use scripts → Track results. See the difference a structured approach makes in your daily chats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { before: "Weak first reply", after: "Stronger, qualifying first reply" },
              { before: "Price-only responses", after: "Value-led price presentation" },
              { before: "No follow-up strategy", after: "Structured, non-pushy follow-up" },
              { before: "Messy, confusing close", after: "Cleaner, confident payment process" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col gap-6">
                <div className="flex items-start gap-4 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Before</p>
                    <p className="text-zinc-600 font-medium">{item.before}</p>
                  </div>
                </div>
                <div className="h-px bg-zinc-100 w-full" />
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#128C7E] uppercase tracking-wider mb-1">After</p>
                    <p className="text-zinc-900 font-bold">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Product Intro - Bento Grid */}
      <Section id="features">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge>The Solution</Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Inside the <br />
            <span className="text-[#128C7E]">Rescue Kit Portal</span>
          </h2>
          <p className="text-xl text-zinc-600 font-bold">
            Everything is organized for immediate action. No clutter. No overwhelm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Feature 1 */}
          <div className="md:col-span-2 p-10 rounded-[40px] bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#25D366] transition-colors">
                <Copy className="w-8 h-8 text-[#128C7E] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-black mb-4">100+ Copy-Ready Scripts</h3>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium max-w-md">
                The heart of the system. Searchable, categorized scripts for first replies, price protection, objection handling, and ghosting recovery.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700" />
          </div>

          {/* Small Feature 1 */}
          <div className="p-10 rounded-[40px] bg-zinc-900 text-white shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#25D366] transition-colors">
              <Layout className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black mb-4">Guided Setup</h3>
            <p className="text-zinc-400 leading-relaxed font-medium">
              Step-by-step optimization to turn your WhatsApp profile into a conversion machine.
            </p>
          </div>

          {/* Small Feature 2 */}
          <div className="p-10 rounded-[40px] bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-50 transition-colors">
              <BarChart3 className="w-8 h-8 text-zinc-400 group-hover:text-[#128C7E] transition-colors" />
            </div>
            <h3 className="text-2xl font-black mb-4">Lead Tracker</h3>
            <p className="text-zinc-500 leading-relaxed font-medium">
              A lightweight, interactive tool to ensure you never forget to follow up with a serious buyer.
            </p>
          </div>

          {/* Large Feature 2 */}
          <div className="md:col-span-2 p-10 rounded-[40px] bg-green-50 border border-green-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8">
                <Clock className="w-8 h-8 text-[#128C7E]" />
              </div>
              <h3 className="text-3xl font-black mb-4 text-[#128C7E]">60-Minute Action Plan</h3>
              <p className="text-zinc-600 text-lg leading-relaxed font-medium max-w-md">
                Don't spend weeks learning. Follow our guided flow and get your new sales system live in under one hour.
              </p>
            </div>
            <div className="absolute right-0 top-0 p-8 opacity-10">
              <Zap className="w-32 h-32 text-[#128C7E]" />
            </div>
          </div>
        </div>
      </Section>

      {/* Built for WhatsApp */}
      <Section className="bg-white border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge>Native Workflow</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Built for How People <br />
              <span className="text-[#128C7E]">Actually Sell on WhatsApp</span>
            </h2>
            <p className="text-xl text-zinc-600 font-medium max-w-2xl mx-auto">
              This system aligns perfectly with WhatsApp's native features and the reality of how buyers behave in chat.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-[#128C7E]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile-First Action</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">Designed to be used on your phone. One-tap script copying means you can reply to leads instantly without switching devices.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-[#128C7E]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quick Replies & Labels</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">Learn how to organize your chats with labels and install the scripts directly into your WhatsApp Business quick replies.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#128C7E]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real Trust Realities</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">Includes guidance on using voice notes effectively and handling the real objections and ghosting behavior you face daily.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison Section - Us vs Them */}
      <Section className="bg-zinc-50">
        <div className="text-center mb-20">
          <Badge>The Comparison</Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Why This Is Different</h2>
          <p className="text-xl text-zinc-600 font-bold">We built this for the busy seller who needs results, not more reading.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-10 rounded-[40px] bg-white border border-zinc-200 opacity-60">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-zinc-400">
              <X className="w-6 h-6 text-red-500" />
              Typical Digital Products
            </h3>
            <ul className="space-y-6">
              {[
                "Static PDFs that sit in your downloads",
                "Hard to navigate on a small phone screen",
                "Easy to forget and never actually implement",
                "Static text you have to type out manually",
                "No interactive tracking or practical tools"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-zinc-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-10 rounded-[40px] bg-white border-2 border-[#25D366] shadow-2xl shadow-green-500/10 relative">
            <div className="absolute -top-4 right-10 bg-[#25D366] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Recommended
            </div>
            <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-[#128C7E]">
              <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
              The Rescue Kit Portal
            </h3>
            <ul className="space-y-6">
              {[
                "Start with a diagnostic Sales Leak Audit",
                "Guided 7-Day Rescue Sprint for fast results",
                "One-tap copyable scripts for immediate use",
                "Interactive setup and visual progress tracking",
                "Mobile-first action flow for easier implementation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-zinc-900 font-bold">
                  <Check className="w-5 h-5 text-[#25D366] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Portal Format Advantage */}
      <Section className="bg-zinc-50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge>The Format Advantage</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              This Is Not Just <br />
              Another PDF Bundle
            </h2>
            <p className="text-xl text-zinc-600 font-bold mb-8">
              It is a guided, mobile-first portal built to help you use the system immediately.
            </p>
            <div className="space-y-6 text-zinc-600 leading-relaxed">
              <p>Most digital products are delivered in a way that creates friction from the start. You download a file. Unzip it. Open multiple PDFs. Search through pages. Copy text manually.</p>
              <p className="font-bold text-zinc-900">Instead of giving you a folder of static files, the WhatsApp Sales Rescue Kit gives you a private portal where everything is already organized for action.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-black mb-6 text-zinc-400 uppercase tracking-widest">Typical PDF Bundle</h3>
              <ul className="space-y-4">
                {["Scripts are buried in documents", "Setup feels slow & navigation is clumsy", "Mobile use is frustrating", "Implementation gets delayed"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-400 line-through font-medium">
                    <X className="w-4 h-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-white border-2 border-[#25D366] shadow-xl shadow-green-500/5">
              <h3 className="text-lg font-black mb-6 text-[#128C7E] uppercase tracking-widest">Rescue Kit Portal</h3>
              <ul className="space-y-4">
                {["Scripts are searchable & copy-ready", "Setup is guided & progress is visible", "Works beautifully on mobile", "Taking action feels much easier"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-900 font-bold">
                    <Check className="w-4 h-4 text-[#25D366] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Script Bank Spotlight */}
      <Section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] opacity-30 -z-10" />
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-zinc-900 p-8 rounded-[40px] shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-green-500/20 rotate-12">
                <Copy className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-zinc-500" />
                    <span className="text-zinc-500 font-bold text-sm">Search scripts...</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Ghosting Recovery</p>
                    <p className="text-zinc-100 font-bold leading-relaxed mb-6">"Hi [Name], I noticed you went quiet after I sent the price. Just checking if the budget was the main concern or if you had other questions?"</p>
                    <button className="w-full py-3 bg-[#25D366] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2">
                      <Copy className="w-4 h-4" />
                      Copy Script
                    </button>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 opacity-40">
                    <div className="h-2 w-24 bg-zinc-700 rounded-full mb-4" />
                    <div className="h-10 w-full bg-zinc-800 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Badge>The Heart of the System</Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              The Script Bank <br />
              <span className="text-[#128C7E]">Find. Tap. Copy.</span>
            </h2>
            <p className="text-xl text-zinc-600 font-bold mb-8 leading-relaxed">
              Find the right script fast, tap once to copy it, and use it immediately in your chats.
            </p>
            <div className="space-y-4 text-zinc-600">
              <p>One of the biggest reasons sellers lose momentum on WhatsApp is simple: They do not always know what to say.</p>
              <p>Inside the Script Bank, you get a well-organized library of copy-ready scripts for the moments that matter most:</p>
            </div>
            <div className="grid grid-cols-2 gap-y-4 mt-10">
              {[
                "First Replies",
                "Trust-Building",
                "Price Presentation",
                "Objection Handling",
                "Ghosting Recovery",
                "Payment Prompts",
                "Order Confirmation",
                "Repeat Sales"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span className="font-bold text-zinc-800 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="text-center mb-20">
          <Badge>Social Proof</Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6">What Sellers Are Saying</h2>
          <p className="text-xl text-zinc-600 font-bold">Real results from business owners using the Profit-Lock™ Method.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              name: "Sarah J.", 
              role: "Boutique Owner", 
              quote: "I used to dread the 'how much' question because people always disappeared. The Price Protection scripts changed everything. I'm closing 3x more sales now.",
              rating: 5
            },
            { 
              name: "David K.", 
              role: "Service Provider", 
              quote: "The Script Bank is a lifesaver. I just tap, copy, and send. It saves me so much time and I sound much more professional. Highly recommended!",
              rating: 5
            },
            { 
              name: "Michelle T.", 
              role: "Digital Seller", 
              quote: "The Lead Tracker is so simple but so effective. I stopped losing hot leads in my messy chats. The portal format is way better than the PDFs I've bought before.",
              rating: 5
            }
          ].map((t, i) => (
            <div key={i} className="p-10 rounded-[40px] bg-white border border-zinc-100 shadow-sm relative">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-zinc-700 font-medium leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center font-black text-zinc-400">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-black text-zinc-900">{t.name}</p>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Guarantee Section */}
      <Section className="bg-green-50">
        <div className="max-w-5xl mx-auto bg-white rounded-[60px] p-12 md:p-20 shadow-2xl shadow-green-500/5 border border-green-100 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#25D366]" />
          <div className="relative z-10">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10">
              <ShieldCheck className="w-12 h-12 text-[#128C7E]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              The 30-Day <br />
              <span className="text-[#128C7E]">Profit-Lock™ Guarantee</span>
            </h2>
            <p className="text-xl text-zinc-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              We are so confident in the WhatsApp Sales Rescue Kit that we offer a full 30-day implementation guarantee. If you follow the 60-minute setup and use the scripts, and don't see an improvement in your chat conversions, we'll give you your money back. No questions asked.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 rounded-full border border-green-100">
              <CheckCircle2 className="w-5 h-5 text-[#128C7E]" />
              <span className="text-[#128C7E] font-black text-sm uppercase tracking-widest">100% Risk-Free Access</span>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-zinc-900 text-white rounded-[60px] mx-6 my-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-white/10 text-white border-white/20">The Process</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">From Ghosted to Closed <br />in 4 Simple Steps</h2>
            <p className="text-xl text-zinc-400 font-medium">Implementation is fast, guided, and built for busy sellers.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Take the Audit", desc: "Start with the Sales Leak Audit to find exactly where you're losing money." },
              { step: "02", title: "Set Up Your System", desc: "Follow the guided flow to optimize your WhatsApp profile and quick replies." },
              { step: "03", title: "Use the Scripts", desc: "Deploy the Script Bank and start the 7-Day Rescue Sprint." },
              { step: "04", title: "Track & Recover", desc: "Use the tracker to follow up, recover lost leads, and close more sales." }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-7xl font-black text-white/5 mb-4 group-hover:text-[#25D366]/10 transition-colors duration-500">{item.step}</div>
                <div className="absolute top-8 left-0">
                  <h3 className="text-xl font-black mb-3 text-white">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Who This Is For */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <Badge>Qualification</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900">Is the Rescue Kit <br />Right for You?</h2>
            <p className="text-xl text-zinc-600 font-bold">This was built for a specific type of seller.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Product Vendors", desc: "If you sell physical goods and get 'how much' inquiries all day.", icon: <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> },
              { title: "Service Providers", desc: "If you handle bookings and client inquiries via WhatsApp.", icon: <Briefcase className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> },
              { title: "Digital Sellers", desc: "If you sell courses, ebooks, or access and need to close leads.", icon: <MonitorPlay className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> },
              { title: "Solo Operators", desc: "If you handle your own sales and need a faster, better system.", icon: <User className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black mb-2 text-zinc-900">{item.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Product Stack */}
      <Section id="pricing" className="bg-zinc-900 text-white rounded-[60px] mx-6 my-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-white/10 text-white border-white/20">The Full Stack</Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6">What You Get With Your Access</h2>
            <p className="text-xl text-zinc-400 font-medium">Everything is delivered inside one clean, mobile-first portal.</p>
          </div>

          <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl">
            <div className="p-10 md:p-16 text-zinc-900">
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  {[
                    "Private Access Portal (Lifetime)",
                    "Sales Leak Audit",
                    "100+ Searchable Script Bank",
                    "Before vs After Chat Examples",
                    "Qualification Flow",
                    "Payment Confirmation Protocol",
                    "Quick Replies Install Worksheet",
                    "7-Day Rescue Sprint",
                    "Lead & Order Tracking Tool",
                    "Status Selling Mini-Module"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#128C7E]" />
                      </div>
                      <span className="font-bold text-zinc-800">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center text-center md:text-left">
                  <div className="bg-zinc-50 p-10 rounded-3xl border border-zinc-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 bg-red-50 border-b border-red-100 text-red-600 py-2 text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Price increases to ₦15,000 soon
                    </div>
                    <div className="mb-6 mt-4">
                      <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Value: ₦97,000</p>
                      <p className="text-zinc-900 font-bold uppercase tracking-widest text-xs">One-Time Payment</p>
                    </div>
                    <div className="flex items-baseline justify-center md:justify-start gap-3 mb-8">
                      <span className="text-6xl font-black text-zinc-900">₦7,900</span>
                      <span className="text-2xl font-bold text-zinc-400 line-through decoration-red-500/50">₦97,000</span>
                    </div>
                    <Button onClick={() => setIsCheckoutOpen(true)} className="w-full text-xl py-6 mb-4">
                      Get Instant Access
                    </Button>
                    <p className="text-zinc-500 text-xs font-bold text-center mb-2">
                      Instant access delivered securely to your email.
                    </p>
                    <p className="text-red-500 text-xs font-bold text-center mb-6">
                      Limited spots available at this price. Secure yours now!
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                        <Lock className="w-3.5 h-3.5" />
                        Secure Checkout
                      </div>
                      <p className="text-[10px] text-zinc-400 text-center max-w-[200px] leading-relaxed">
                        *Optional upgrades available inside: AI-personalized scripts, setup sprints, and storefront add-ons.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xl font-bold text-zinc-400">
              "A Few Recovered Sales Can Pay for This Quickly"
            </p>
          </div>
        </div>
      </Section>

      {/* What Happens After You Buy */}
      <Section className="bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge>Post-Purchase Flow</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              What Happens <br />
              <span className="text-[#128C7E]">After You Buy?</span>
            </h2>
            <p className="text-xl text-zinc-600 font-medium max-w-2xl mx-auto">
              We use a secure, passwordless magic link system. Getting access takes less than 60 seconds.
            </p>
          </div>

          {/* Animated Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center">
              <div className="text-3xl font-black text-[#128C7E] mb-1">
                <AnimatedCounter value={100} suffix="+" />
              </div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Copy-Ready Scripts</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center">
              <div className="text-3xl font-black text-[#128C7E] mb-1">
                <AnimatedCounter value={60} prefix="< " suffix="s" />
              </div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Access Speed</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center">
              <div className="text-3xl font-black text-[#128C7E] mb-1">
                <AnimatedCounter value={24} suffix="/7" />
              </div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Lifetime Access</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm text-center">
              <div className="text-3xl font-black text-[#128C7E] mb-1">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Secure Checkout</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: <Lock className="w-6 h-6 text-[#128C7E]" />,
                title: "Secure Checkout",
                desc: "Complete your payment using our secure checkout.",
                bg: "bg-green-50",
                border: "border-zinc-100 shadow-sm"
              },
              {
                step: 2,
                icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
                title: "Check Your Inbox",
                desc: "You will immediately receive a welcome email with the link to your private portal.",
                bg: "bg-blue-50",
                border: "border-zinc-100 shadow-sm"
              },
              {
                step: 3,
                icon: <Zap className="w-6 h-6 text-white" />,
                title: "Instant Magic Access",
                desc: "Go to app.chatsalesrescue.com, enter your purchase email, and click the secure \"Magic Link\" sent to your inbox. No passwords to remember!",
                bg: "bg-[#25D366]",
                border: "border-2 border-[#25D366] shadow-xl shadow-green-500/5"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`p-8 rounded-3xl bg-white ${item.border} relative overflow-hidden`}
              >
                <div className={`absolute -right-4 -top-4 text-9xl font-black ${item.step === 3 ? 'text-green-50' : 'text-zinc-50'} opacity-50 pointer-events-none`}>{item.step}</div>
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-6 relative z-10`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Magic Link Testimonial */}
      <Section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-green-50 rounded-3xl p-8 md:p-10 relative">
            <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-[#25D366] opacity-20 font-serif">"</div>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-16 h-16 rounded-full bg-zinc-200 shrink-0 overflow-hidden border-2 border-white shadow-md">
                <img src="https://picsum.photos/seed/sarah/100/100" alt="Customer" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <p className="text-lg md:text-xl font-medium text-zinc-800 leading-relaxed mb-4">
                  "I bought it, checked my email, clicked the magic link, and I was in. No passwords to create, no confusing logins to remember. The fastest and most seamless access I've ever experienced for a digital product."
                </p>
                <div>
                  <p className="font-bold text-zinc-900">Sarah O.</p>
                  <p className="text-sm text-zinc-500">E-commerce Store Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <Badge>FAQ</Badge>
            <h2 className="text-4xl font-black mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white rounded-[32px] p-10 shadow-sm border border-zinc-100">
            {[
              { q: "How do I access the Whatsapp Rescue Kit after purchasing?", a: "Immediately after your secure payment, your email is whitelisted in our system. Just go to app.chatsalesrescue.com, enter the email you used to purchase, and we will send you a secure, one-click login link." },
              { q: "Do I need to create a password?", a: "No! We use a modern, passwordless security system. Every time you want to log in, you just enter your email and click the magic link we send you. It's faster and much more secure." },
              { q: "What if I use a different email to log in?", a: "For security reasons, the portal will only grant access to the exact email address you used during checkout." },
              { q: "Is this a course?", a: "No. This is a private-access implementation portal with practical tools, scripts, setup resources, and guided flow to help you improve your WhatsApp sales process quickly." },
              { q: "Is this only for product sellers?", a: "No. It works for both product sellers and service providers, as long as WhatsApp is part of how you sell or handle buyer inquiries." },
              { q: "Do I need WhatsApp Business?", a: "It works best with WhatsApp Business because features like quick replies, labels, and catalog tools make the system even more effective." },
              { q: "Will this work on mobile?", a: "Yes. The portal is designed mobile-first so it is easy to use on your phone." },
              { q: "Can I copy the scripts directly?", a: "Yes. The Script Bank is designed for fast use, with scripts organized clearly and built to be easy to copy and use." },
              { q: "Is this better than a PDF bundle?", a: "Yes. The portal is structured to be easier to navigate, easier to use, and easier to implement than a folder of static files." },
              { q: "What exactly do I get?", a: "You get private portal access to the Main Guide, Script Bank, Setup Checklist, 60-Minute Action Plan, Lead & Order Tracker, and all included bonuses." }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-zinc-50 text-center pb-40">
        <div className="max-w-3xl mx-auto">
          <Badge>Final Call</Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            Stop Letting Good WhatsApp <br />
            <span className="text-[#128C7E]">Conversations Die Too Early</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 font-bold mb-12 leading-relaxed">
            You do not always need more leads first. Sometimes, you simply need a better system for how you handle the conversations you are already getting.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Button onClick={() => setIsCheckoutOpen(true)} className="w-full sm:w-auto px-16 py-6 text-2xl">
              Get Instant Access
            </Button>
            <p className="text-zinc-500 font-bold text-sm -mt-2">
              Instant access delivered securely to your email.
            </p>
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">
              Access the private portal and start improving today
            </p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">WSRK</span>
          </div>
          <p className="text-zinc-400 font-bold text-sm mb-10 max-w-md mx-auto leading-relaxed">
            © 2026 Profit-Lock™ Method. All rights reserved. <br />
            Designed for high-converting WhatsApp sellers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
            <a href="https://app.chatsalesrescue.com/access" className="hover:text-zinc-900 transition-colors">Member Login</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Support Center</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40 sm:hidden">
        <div className="bg-white/80 backdrop-blur-xl p-3 rounded-2xl border border-zinc-100 shadow-2xl flex flex-col items-center">
          <Button onClick={() => setIsCheckoutOpen(true)} className="w-full py-4 shadow-none">
            Get Instant Access — ₦7,900
          </Button>
          <p className="text-zinc-500 text-[10px] font-bold text-center mt-2">
            Instant access delivered securely to your email.
          </p>
          <p className="text-red-500 text-[10px] font-bold text-center mt-1">
            Limited spots available at this price. Secure yours now!
          </p>
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
}
