import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-zinc-900 text-white p-6 rounded-2xl shadow-2xl border border-zinc-800 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative">
            <button 
              onClick={handleReject}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors sm:hidden"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex-1 pr-6 sm:pr-0">
              <h3 className="text-lg font-bold mb-2">We value your privacy</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button 
                onClick={handleReject}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Reject All
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors shadow-lg shadow-green-500/20"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
