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
  User,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  CreditCard,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import CheckoutModal from './components/CheckoutModal';

import { Link } from 'react-router-dom';
import CookieConsent from './components/CookieConsent';
import { useGeolocationPricing } from './hooks/useGeolocationPricing';
import InteractiveChatDemo from './components/InteractiveChatDemo';
import LostRevenueCalculator from './components/LostRevenueCalculator';
import WorkflowDiagram from './components/WorkflowDiagram';
import ConversionInsights from './components/ConversionInsights';
import LeadCaptureWidget from './components/LeadCaptureWidget';
import LeadCaptureInline from './components/LeadCaptureInline';

import HeroAnimation from './components/HeroAnimation';
import ComparisonTable from './components/ComparisonTable';

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
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 !transition-all !duration-500 active:scale-95 text-center tracking-tight relative overflow-hidden";
  const variants = {
    primary: "cf-button-primary",
    secondary: "cf-button-secondary",
    outline: "border border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:bg-white shadow-[0_4px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[20px] font-bold"
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
  <section id={id} className={`cf-section overflow-hidden ${className}`}>
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-6xl mx-auto relative ${containerClassName}`}
    >
      {children}
    </motion.div>
  </section>
);

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`cf-badge mb-8 ${className}`}>
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { pricing, changeCountry, allPricing } = useGeolocationPricing();

  const handleCheckoutClick = () => {
    // Track InitiateCheckout before redirecting
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        currency: pricing.currency,
        value: pricing.amount
      });
    }

    // TEMPORARY: Redirect to Selar for initial Nigeria-only launch
    window.location.href = "https://selar.com/44447077s5";
    
    // To revert back to the direct checkout modal later, comment out the line above
    // and uncomment the line below:
    // setIsCheckoutOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100 selection:text-green-900 antialiased">
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-24 sm:bottom-8 right-6 z-[70] w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top Urgency Banner */}
      <div className="bg-zinc-900 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-[60]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
          </span>
          <span>Get lifetime access for {pricing.currencySymbol}{pricing.amount.toLocaleString()} before the price increases to {pricing.currencySymbol}{pricing.originalAmount.toLocaleString()}.</span>
        </div>
        <CountdownTimer />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-100 py-3 translate-y-0' : 'bg-transparent py-8 translate-y-10 sm:translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm sm:text-lg tracking-tight">WhatsApp Sales Rescue Kit</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Profit-Lock™</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">What's Inside</a>
            <a href="#pricing" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">Pricing</a>
            <a href="https://app.chatsalesrescue.com/access" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors hidden sm:block">Member Login</a>
            <Button onClick={handleCheckoutClick} variant="secondary" className="px-5 py-2.5 text-sm md:px-7 md:py-3.5 md:text-base">
              Get Access
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
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
            <h1 className="cf-heading text-5xl md:text-7xl lg:text-[5.5rem] mb-8">
              Turn 'I'll Get Back To You' Into <span className="text-[#25D366]">'Payment Sent'</span><br />
              <span className="cf-text-gradient-accent text-3xl md:text-5xl lg:text-5xl mt-4 block">Plug Your Sales Leaks and Close 4x More Deals on WhatsApp</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-4 leading-relaxed font-medium">
              The exact copy-paste scripts and follow-up sequence proven to convert inquiries into paid customers in under 5 minutes.
            </p>

            <HeroAnimation />
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center w-full max-w-xl">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <Button onClick={handleCheckoutClick} className="w-full sm:flex-1 group text-lg py-5 relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      Get Instant Access — {pricing.currencySymbol}{pricing.amount.toLocaleString()}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                  </Button>
                </div>
                
                <div className="mt-3 text-red-500 font-bold text-sm bg-red-50 px-4 py-1.5 rounded-full flex items-center gap-2 border border-red-100 shadow-sm animate-pulse">
                  <Clock className="w-4 h-4" /> Price increases to {pricing.currencySymbol}{(pricing.amount * 2).toLocaleString()} soon
                </div>
                
                {/* Checkout Reassurance Block */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 text-zinc-500 text-xs font-bold bg-zinc-50 px-6 py-3 rounded-2xl border border-zinc-100 justify-center flex-wrap">
                  <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#25D366]" /> Secure checkout via Selar</div>
                  <div className="hidden sm:block text-zinc-300">•</div>
                  <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-yellow-500" /> Instant access after payment</div>
                  <div className="hidden sm:block text-zinc-300">•</div>
                  <div className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-blue-500" /> Works on mobile</div>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-[#1877F2] hover:text-white text-zinc-500 flex items-center justify-center transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Stop losing buyers on WhatsApp. Check out the WhatsApp Sales Rescue Kit!')}`, '_blank')}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-[#1DA1F2] hover:text-white text-zinc-500 flex items-center justify-center transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('WhatsApp Sales Rescue Kit')}`, '_blank')}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-[#0A66C2] hover:text-white text-zinc-500 flex items-center justify-center transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-2">
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

      {/* Problem & Workflow Section */}
      <Section className="bg-white relative border-b border-zinc-100 pb-20">
        <WorkflowDiagram />
      </Section>

      {/* Lead Capture Section */}
      <Section className="bg-zinc-50 border-b border-zinc-100 py-16">
        <LeadCaptureInline />
      </Section>

      {/* Comparison Table */}
      <Section className="bg-zinc-50 border-b border-zinc-100 pb-20">
        <ComparisonTable />
      </Section>

      {/* Interactive Chat Demo Section */}
      <Section className="bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-4xl mx-auto">
          <InteractiveChatDemo />
        </div>
      </Section>

      {/* Social Proof / Testimonials */}
      <Section className="bg-white border-b border-zinc-100">
        <div className="text-center mb-16">
          <Badge>Real Results</Badge>
          <h2 className="cf-heading text-4xl md:text-5xl mb-6">What Sellers Are Saying</h2>
          <p className="text-xl text-zinc-600 font-bold">Real results from business owners using the Profit-Lock™ Method.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              name: "Sarah A.", 
              role: "IG Physical Product Vendor", 
              quote: "I used to dread the 'how much' question because people always disappeared. The Price Protection scripts changed everything. I am closing 3x more sales weekly now.",
              rating: 5
            },
            { 
              name: "David O.", 
              role: "Business Coach & Consultant", 
              quote: "The Script Bank is a lifesaver. I just tap, copy, and send. It saves me hours of typing and I sound much more professional. Highly recommended!",
              rating: 5
            },
            { 
              name: "Michelle C.", 
              role: "Digital Info Marketer", 
              quote: "The Lead Tracker is so simple but so effective. I stopped losing hot leads in my messy chats. The portal format is way better than the PDFs I've bought before.",
              rating: 5
            }
          ].map((t, i) => (
            <div key={i} className="cf-card p-10 relative">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-zinc-700 font-medium leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center font-black text-zinc-500 shadow-inner">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-black text-zinc-900">{t.name}</p>
                  <p className="text-[10px] font-bold text-[#128C7E] uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Calculator Section */}
      <Section className="bg-zinc-900 border-b border-zinc-800 p-0">
         <LostRevenueCalculator />
      </Section>

      {/* What You Get Section (Offer Visualization) */}
      <Section className="bg-zinc-50 relative" id="features">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <Badge>What's Inside?</Badge>
            <h2 className="cf-heading text-4xl md:text-5xl mb-6">
              Everything You Need to <br />
              <span className="cf-text-gradient-accent">Turn Chats Into Alerts</span>
            </h2>
            <p className="text-lg text-zinc-600 font-medium max-w-2xl mx-auto">
              Skip the guesswork. Here is exactly what you get inside the Rescue Kit portal as soon as you pay.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="cf-card p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <Search className="w-6 h-6 text-[#128C7E]" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-900 mb-1">WhatsApp Sales Leak Audit</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Find exactly where your current process is losing money so you can plug the holes fast.</p>
              </div>
            </div>
            
            <div className="cf-card p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <Copy className="w-6 h-6 text-[#128C7E]" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-900 mb-1">Copy & Paste Sales Scripts</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Never wonder what to say again. Over 100 tested messages you can copy with one tap.</p>
              </div>
            </div>
            
            <div className="cf-card p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#128C7E]" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-900 mb-1">Price Objection Handling Replies</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Scripts specifically designed to justify your price and keep them interested when they complain it's too high.</p>
              </div>
            </div>
            
            <div className="cf-card p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#128C7E]" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-900 mb-1">Follow-Up Message Templates</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Non-pushy, professional follow-up messages that revive dead chats without sounding desperate.</p>
              </div>
            </div>
            
            <div className="cf-card p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-[#128C7E]" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-900 mb-1">Closing & Payment Scripts</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Push hesitant buyers over the line to secure the alert gracefully.</p>
              </div>
            </div>
            
            <div className="cf-card p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg text-zinc-900 mb-1">Guided Setup Portal</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">A clean, mobile-friendly interface so you can find what you need in seconds while chatting.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold border border-yellow-200">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              Plus Bonus Templates Included
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button onClick={handleCheckoutClick} className="w-full sm:w-auto px-10 py-5 text-lg">
                Unlock the Scripts Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {/* Checkout Reassurance Block */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-zinc-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#25D366]" /> Secure checkout via Selar</div>
                <div className="hidden sm:block text-zinc-300">•</div>
                <div className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-blue-500" /> No technical skills needed</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Portal Format Advantage */}
      <Section className="bg-zinc-50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge>The Format Advantage</Badge>
            <h2 className="cf-heading text-4xl md:text-5xl mb-8">
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
          <div className="grid grid-cols-1 gap-6">
            <div className="cf-card p-8">
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
            <div className="cf-card p-8 ring-2 ring-[#25D366] ring-offset-4 ring-offset-zinc-50 border-none shadow-[0_20px_40px_rgba(37,211,102,0.1)]">
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
            <h2 className="cf-heading text-4xl md:text-5xl lg:text-6xl mb-8">
              The Script Bank <br />
              <span className="cf-text-gradient-accent">Find. Tap. Copy.</span>
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

      {/* Conversion Insights */}
      <Section className="bg-white border-b border-zinc-100">
        <ConversionInsights />
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

      {/* How It Works & Visual Mockups */}
      <Section className="bg-white relative overflow-hidden text-center mx-auto border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <Badge>The Simple Process</Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-6">How It Works</h2>
          <p className="text-lg text-zinc-600 font-medium mb-12">Implementation is fast, guided, and built for busy sellers.</p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
            <div className="relative group p-6 border border-zinc-200 rounded-3xl bg-zinc-50">
              <div className="text-5xl font-black text-green-200 mb-2">1</div>
              <h3 className="text-xl font-black mb-2 text-zinc-900">Get Instant Access After Payment</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">Checkout securely via Selar and instantly receive your magic link to login.</p>
            </div>
            <div className="relative group p-6 border border-zinc-200 rounded-3xl bg-zinc-50">
              <div className="text-5xl font-black text-green-200 mb-2">2</div>
              <h3 className="text-xl font-black mb-2 text-zinc-900">Copy Proven Scripts Into Your Chats</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">Search for the exact script you need, tap to copy, and paste it into WhatsApp.</p>
            </div>
            <div className="relative group p-6 border border-zinc-200 rounded-3xl bg-zinc-50">
              <div className="text-5xl font-black text-green-200 mb-2">3</div>
              <h3 className="text-xl font-black mb-2 text-zinc-900">Start Closing More Enquiries</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">Watch as you confidently handle objections and secure payments without coming across as pushy.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center bg-zinc-900 text-left rounded-[40px] p-8 md:p-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-6 text-white leading-tight">
                See How It Looks <br/><span className="text-[#25D366]">Inside Your Chats</span>
              </h3>
              <p className="text-zinc-400 mb-8 max-w-sm">
                No more guessing. The scripts are formatted exactly as you would type them—just copy, paste, and let them read naturally.
              </p>
              <Button onClick={handleCheckoutClick} className="w-full sm:w-auto px-8 py-4">
                Get the Scripts Now
              </Button>
            </div>
            
            {/* Visual Chat Mockup */}
            <div className="bg-zinc-800 rounded-3xl p-4 shadow-xl border border-zinc-700">
              <div className="space-y-4 text-sm font-medium">
                {/* Received Message */}
                <div className="flex flex-col items-start gap-1">
                  <div className="bg-white text-zinc-800 p-3 rounded-2xl rounded-tl-sm shadow-sm inline-block max-w-[85%]">
                    How much for the package in your story?
                  </div>
                </div>
                {/* Sent Message (Using Script) */}
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-[#DCFFD1] text-zinc-900 p-3 rounded-2xl rounded-tr-sm shadow-sm inline-block max-w-[85%] border border-[#25D366]/20">
                    Hi! Thanks for reaching out. Before I give you the price, can I ask a quick question to make sure it's exactly what you need?
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 mr-1">
                    <Check className="w-3 h-3 text-[#25D366]" /><Check className="w-3 h-3 text-[#25D366] -ml-2" /> Read
                  </div>
                </div>
                {/* Received Message */}
                <div className="flex flex-col items-start gap-1">
                  <div className="bg-white text-zinc-800 p-3 rounded-2xl rounded-tl-sm shadow-sm inline-block max-w-[85%]">
                    Sure go ahead
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Who This Is For */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <Badge>Qualification</Badge>
            <h2 className="cf-heading text-4xl md:text-5xl mb-6 text-zinc-900">Is the Rescue Kit <br />Right for You?</h2>
            <p className="text-xl text-zinc-600 font-bold">This was built for a specific type of seller.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { title: "Product Vendors", desc: "If you sell physical goods and get 'how much' inquiries all day.", icon: <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> },
              { title: "Service Providers", desc: "If you handle bookings and client inquiries via WhatsApp.", icon: <Briefcase className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> },
              { title: "Digital Sellers", desc: "If you sell courses, ebooks, or access and need to close leads.", icon: <MonitorPlay className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> },
              { title: "Solo Operators", desc: "If you handle your own sales and need a faster, better system.", icon: <User className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" /> }
            ].map((item, i) => (
              <div key={i} className="cf-card p-8 group">
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

      {/* Product Stack / Pricing */}
      <Section id="pricing" className="bg-zinc-900 text-white rounded-[40px] mx-6 my-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-white border-white/20">Pricing</Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Are you ready to turn your chats into alerts?</h2>
            <p className="text-lg text-zinc-400 font-medium">Get instant access to everything in the portal today.</p>
          </div>

          <div className="cf-card border-none ring-[4px] ring-black shadow-2xl p-8 md:p-12 text-zinc-900 mx-1 md:mx-0">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-5">
                  <h3 className="font-black text-2xl mb-6">Here's what you get:</h3>
                  {[
                    "Private Access Portal (Lifetime)",
                    "WhatsApp Sales Leak Audit",
                    "Over 100+ Searchable Scripts",
                    "Price Objection & Ghosting Frameworks",
                    "Lead & Order Tracking Tool",
                    "Bonus: 60-Minute Guided Setup"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#128C7E]" />
                      </div>
                      <span className="font-bold text-zinc-700 text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center text-center bg-zinc-50 p-8 rounded-3xl border border-zinc-200 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#25D366] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md whitespace-nowrap">
                    Limited-Time Launch Pricing
                  </div>
                  
                  <div className="mt-4 mb-2">
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-1">Today's Price</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-5xl md:text-6xl font-black text-zinc-900">{pricing.currencySymbol}{pricing.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                     <p className="text-zinc-400 text-sm font-bold">
                       Regular Price: <span className="line-through">{pricing.currencySymbol}{pricing.originalAmount.toLocaleString()}</span>
                     </p>
                     <p className="text-zinc-900 font-black text-xs uppercase tracking-widest mt-2 px-3 py-1 bg-yellow-200 inline-block rounded-md">One-time payment. No subscription.</p>
                  </div>
                  
                  <Button onClick={handleCheckoutClick} className="w-full text-lg py-5 mb-4 hover:scale-[1.02]">
                    Get Instant Access
                  </Button>
                  <p className="text-zinc-500 text-xs font-bold text-center">
                    Instant access delivered securely to your email.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure checkout</div>
                    <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Safe Payment via Selar</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </Section>

      {/* What Happens After You Buy */}
      <Section className="bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge>Post-Purchase Flow</Badge>
            <h2 className="cf-heading text-4xl md:text-5xl mb-6">
              What Happens <br />
              <span className="cf-text-gradient-accent">After You Buy?</span>
            </h2>
            <p className="text-xl text-zinc-600 font-medium max-w-2xl mx-auto">
              We use a secure, passwordless magic link system. Getting access takes less than 60 seconds.
            </p>
          </div>

          {/* Animated Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="cf-card p-6 text-center">
              <div className="text-3xl font-black text-[#128C7E] mb-1">
                <AnimatedCounter value={100} suffix="+" />
              </div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Copy-Ready Scripts</div>
            </div>
            <div className="cf-card p-6 text-center">
              <div className="text-3xl font-black text-[#128C7E] mb-1">
                <AnimatedCounter value={60} prefix="< " suffix="s" />
              </div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Access Speed</div>
            </div>
            <div className="cf-card p-6 text-center">
              <div className="text-3xl font-black text-[#128C7E] mb-1">
                <AnimatedCounter value={24} suffix="/7" />
              </div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Lifetime Access</div>
            </div>
            <div className="cf-card p-6 text-center">
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
          <div className="cf-card p-8 md:p-10 relative bg-[#25D366]/5">
            <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-[#25D366] opacity-20 font-serif">"</div>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-16 h-16 rounded-full bg-zinc-200 shrink-0 overflow-hidden border-2 border-white shadow-md">
                <img src="https://picsum.photos/seed/sarah/100/100" alt="Customer" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <p className="text-lg md:text-xl font-medium text-zinc-800 leading-relaxed mb-4">
                  "I bought it, checked my email, clicked the magic link, and I was in. No passwords to create, no confusing logins to remember. The fastest and most seamless access I've ever experienced for a digital product."
                </p>
                <div>
                  <p className="font-black text-zinc-900">Sarah O.</p>
                  <p className="text-[10px] font-bold text-[#128C7E] uppercase tracking-widest">E-commerce Store Owner</p>
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
            <h2 className="cf-heading text-4xl md:text-5xl mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="cf-card p-10 relative">
            {[
              { q: "Will this work for my business?", a: "Yes. Whether you sell physical products (clothes, devices, skincare) or services (consulting, graphic design), any business that relies on chatting to close deals will benefit immensely from these proven scripts." },
              { q: "Do I need any special experience or technical skills?", a: "Not at all. The portal is extremely easy to use. If you know how to copy text and paste it into WhatsApp, you have all the skills you need." },
              { q: "How do I access the portal after payment?", a: "After you checkout securely via Selar, you'll immediately receive an email with your Magic Link. Click it, and you're inside the portal. No passwords required." },
              { q: "Is this a long, boring course I have to watch?", a: "No! This is an action-oriented implementation toolkit. It consists of ready-to-use text scripts, quick setup trackers, and practical templates. It's built for you to use in minutes, not weeks." },
              { q: "What if I have issues accessing it?", a: "You can reach out to our dedicated support via WhatsApp (+234 816 218 6221) or email anytime. We're here to help." }
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
            <Button onClick={handleCheckoutClick} className="w-full sm:w-auto px-16 py-6 text-2xl relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center">
                Get the Rescue Kit Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            </Button>
            
            <div className="mt-2 text-red-500 font-bold text-sm bg-red-50 px-4 py-1.5 rounded-full flex items-center justify-center gap-2 border border-red-100 shadow-sm animate-pulse w-full sm:w-auto">
              <Clock className="w-4 h-4" /> Limited Time: Secure current price
            </div>
            
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
      <footer className="bg-white py-16 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <span className="font-black text-xl tracking-tight text-zinc-800">chatsalesrescue.com</span>
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
              <Lock className="w-4 h-4 text-[#25D366]" /> Secure checkout powered by Selar
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 mb-10 text-zinc-600 font-medium">
             <div className="flex items-center justify-center gap-2 bg-zinc-50 sm:bg-transparent py-4 sm:py-0 rounded-xl sm:rounded-none border border-zinc-100 sm:border-none">
                <MessageSquare className="w-5 h-5 sm:w-4 sm:h-4 text-[#25D366]" />
                <span className="text-sm sm:text-base">Support via WhatsApp:</span> <a href="https://wa.me/2348162186221" className="text-zinc-900 font-bold hover:text-[#128C7E] transition-colors pl-1 py-1">+234 816 218 6221</a>
             </div>
             <div className="hidden sm:block text-zinc-300">•</div>
             <div className="flex items-center justify-center gap-2 bg-zinc-50 sm:bg-transparent py-4 sm:py-0 rounded-xl sm:rounded-none border border-zinc-100 sm:border-none">
                <span className="font-bold text-lg sm:text-base">@</span>
                <span className="text-sm sm:text-base">Email:</span> <a href="mailto:support@chatsalesrescue.com" className="text-zinc-900 font-bold hover:text-[#128C7E] transition-colors pl-1 py-1">support@chatsalesrescue.com</a>
             </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-8 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-10 w-full">
            <a href="https://app.chatsalesrescue.com/access" className="py-4 px-6 sm:py-2 sm:px-0 hover:text-zinc-900 transition-colors text-center bg-zinc-50 sm:bg-transparent rounded-xl sm:rounded-none border border-zinc-100 sm:border-none block">Member Login</a>
            <Link to="/terms-of-service" className="py-4 px-6 sm:py-2 sm:px-0 hover:text-zinc-900 transition-colors text-center bg-zinc-50 sm:bg-transparent rounded-xl sm:rounded-none border border-zinc-100 sm:border-none block">Delivery & Refund Policy</Link>
            <Link to="/privacy-policy" className="py-4 px-6 sm:py-2 sm:px-0 hover:text-zinc-900 transition-colors text-center bg-zinc-50 sm:bg-transparent rounded-xl sm:rounded-none border border-zinc-100 sm:border-none block">Privacy Policy</Link>
          </div>
          <p className="text-zinc-400 font-bold text-xs pb-16 sm:pb-0">
            © {new Date().getFullYear()} Profit-Lock™ Method. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40 sm:hidden">
        <div className="bg-white/95 backdrop-blur-xl p-4 rounded-[28px] border border-zinc-200 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)] flex flex-col items-center">
          <div className="w-full flex items-center justify-center gap-1.5 mb-3 text-red-500 text-[10px] font-bold uppercase tracking-widest bg-red-50 rounded-full py-1">
             <Clock className="w-3 h-3" /> price increases soon
          </div>
          <Button onClick={handleCheckoutClick} className="w-full py-4 text-base shadow-lg shadow-[#25D366]/20">
            Get Instant Access — {pricing.currencySymbol}{pricing.amount.toLocaleString()}
          </Button>
          <div className="flex items-center gap-1.5 mt-3 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
             <Lock className="w-3 h-3 text-[#25D366]" /> Secure checkout via Selar
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        pricing={pricing}
        changeCountry={changeCountry}
        allPricing={allPricing}
      />
      <CookieConsent />
      <LeadCaptureWidget />
    </div>
  );
}
