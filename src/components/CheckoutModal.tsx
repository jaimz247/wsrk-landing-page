import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldCheck, Mail, User, ArrowRight, CheckCircle2, Loader2, CreditCard, AlertCircle, Tag } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Coupon & Referral State
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const basePrice = 7900;
  const finalPrice = Math.max(0, basePrice - discount);
  const basePaypalPrice = 5.00; // Approximate USD equivalent
  const finalPaypalPrice = Math.max(0, basePaypalPrice * (finalPrice / basePrice));

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setName('');
      setEmail('');
      setIsProcessing(false);
      setError(null);
      setCouponCode('');
      setDiscount(0);
      setCouponMessage(null);
    }
  }, [isOpen]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponMessage(null);
    
    // Simulate API validation delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const code = couponCode.trim().toUpperCase();
    if (code === 'WSRK20') {
      setDiscount(basePrice * 0.2);
      setCouponMessage({ type: 'success', text: '20% discount applied!' });
    } else if (code.startsWith('REF-') && code.length > 4) {
      setDiscount(1000); // ₦1,000 off for referrals
      setCouponMessage({ type: 'success', text: 'Referral discount applied (₦1,000 off)!' });
    } else {
      setDiscount(0);
      setCouponMessage({ type: 'error', text: 'Invalid or expired coupon code.' });
    }
    setIsApplyingCoupon(false);
  };

  const sendReceipt = async (transactionRef: string) => {
    try {
      // In a real application, you would send this to your backend or a webhook (e.g., Zapier/Make)
      console.log(`[Mock] Sending receipt to ${email} for transaction ${transactionRef}`);
      console.log(`[Mock] Receipt details: Name: ${name}, Amount: ₦${finalPrice}, Date: ${new Date().toLocaleString()}`);
      // Example implementation:
      // await fetch('https://your-api.com/send-receipt', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, name, amount: finalPrice, ref: transactionRef, date: new Date().toISOString() })
      // });
    } catch (e) {
      console.error("Failed to send receipt", e);
    }
  };

  const handleSuccess = (transactionRef: string) => {
    setStep(3);
    sendReceipt(transactionRef);
    setTimeout(() => {
      window.location.href = 'https://app.chatsalesrescue.com/access';
    }, 3000);
  };

  // Paystack Config
  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: finalPrice * 100, // Paystack amount is in kobo/cents
    currency: 'NGN',
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder',
  };
  const initializePaystack = usePaystackPayment(paystackConfig);

  const handlePaystack = () => {
    setIsProcessing(true);
    setError(null);
    try {
      initializePaystack({
        onSuccess: (reference: any) => {
          setIsProcessing(false);
          handleSuccess(reference.reference || paystackConfig.reference);
        },
        onClose: () => {
          setIsProcessing(false);
          setError("You closed the payment window before completing the transaction. Your card was not charged. Please try again when you're ready.");
        }
      });
    } catch (err) {
      setIsProcessing(false);
      setError("Failed to initialize Paystack. Please check your internet connection or try another payment method.");
    }
  };

  // Flutterwave Config
  const flutterwaveConfig = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-placeholder',
    tx_ref: Date.now().toString(),
    amount: finalPrice,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      name: name,
      phone_number: '',
    },
    customizations: {
      title: 'WhatsApp Sales Rescue Kit',
      description: 'Lifetime Access to the Private Portal',
      logo: 'https://app.chatsalesrescue.com/logo.png',
    },
  };
  const handleFlutterwavePayment = useFlutterwave(flutterwaveConfig);

  const handleFlutterwave = () => {
    setIsProcessing(true);
    setError(null);
    try {
      handleFlutterwavePayment({
        callback: (response) => {
          closePaymentModal();
          if (response.status === 'successful') {
            handleSuccess(response.transaction_id?.toString() || flutterwaveConfig.tx_ref);
          } else {
            setError(`Payment failed: ${response.status}. Please ensure you have sufficient funds and your card is active, then try again.`);
          }
          setIsProcessing(false);
        },
        onClose: () => {
          setIsProcessing(false);
          setError("The Flutterwave payment window was closed. No charges were made. Please select a payment method to try again.");
        },
      });
    } catch (err) {
      setIsProcessing(false);
      setError("Failed to initialize Flutterwave. Please check your internet connection or try another payment method.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-zinc-50 p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-zinc-900 leading-tight">Secure Checkout</h3>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">256-bit Encryption</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Stepper Progress */}
            <div className="flex items-center justify-between mb-8 relative px-2">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-100 -z-10 rounded-full"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#25D366] -z-10 rounded-full transition-all duration-500 ease-out" 
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
              ></div>
              
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${step >= s ? 'bg-[#25D366] text-white shadow-lg shadow-green-500/30' : 'bg-white border-2 border-zinc-200 text-zinc-400'}`}>
                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${step >= s ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Success'}
                  </span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-8 text-center">
                  <h4 className="text-2xl font-black text-zinc-900 mb-2">Where should we send your access link?</h4>
                  <p className="text-zinc-500 font-medium">Enter your details below to continue.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-zinc-400" />
                      </div>
                      <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent font-medium transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-900 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-zinc-400" />
                      </div>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent font-medium transition-all"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 font-medium mt-2 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      Your magic access link will be sent here.
                    </p>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (name && email.includes('@')) setStep(2);
                    }}
                    disabled={!name || !email.includes('@')}
                    className="relative w-full mt-4 py-4 bg-zinc-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Continue to Payment
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {name && email.includes('@') && (
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    )}
                    {name && email.includes('@') && (
                      <span className="absolute inset-0 rounded-xl ring-2 ring-zinc-900 ring-offset-2 animate-pulse" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6 text-center">
                  <h4 className="text-2xl font-black text-zinc-900 mb-2">Select Payment Method</h4>
                  <p className="text-zinc-500 font-medium">Choose how you'd like to pay ₦{finalPrice.toLocaleString()} securely.</p>
                </div>

                {/* Coupon / Referral Code Section */}
                <div className="mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                  <label className="block text-xs font-bold text-zinc-900 mb-2 uppercase tracking-wider">Referral or Coupon Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="w-4 h-4 text-zinc-400" />
                      </div>
                      <input 
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. REF-1234 or WSRK20"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent font-medium text-sm transition-all uppercase"
                      />
                    </div>
                    <button 
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                      className="px-4 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                    >
                      {isApplyingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                    </button>
                  </div>
                  <AnimatePresence>
                    {couponMessage && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className={`text-xs font-bold ${couponMessage.type === 'success' ? 'text-[#25D366]' : 'text-red-500'}`}
                      >
                        {couponMessage.text}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start gap-3 text-sm font-medium"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <button 
                    onClick={handlePaystack}
                    disabled={isProcessing}
                    className="w-full p-4 border-2 border-zinc-200 rounded-xl flex items-center justify-between hover:border-[#0ba4db] hover:bg-[#0ba4db]/5 transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-zinc-100 rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png" alt="Paystack" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-zinc-900">Pay with Paystack</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-[#0ba4db] transition-colors" />
                  </button>

                  <button 
                    onClick={handleFlutterwave}
                    disabled={isProcessing}
                    className="w-full p-4 border-2 border-zinc-200 rounded-xl flex items-center justify-between hover:border-[#F5A623] hover:bg-[#F5A623]/5 transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-zinc-100 rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Flutterwave_Logo.png" alt="Flutterwave" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-zinc-900">Pay with Flutterwave</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-[#F5A623] transition-colors" />
                  </button>

                  <div className="pt-4 border-t border-zinc-100 relative z-0">
                    <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", currency: "USD" }}>
                      <PayPalButtons 
                        style={{ layout: "vertical", shape: "rect", color: "gold" }}
                        onError={(err) => {
                          setError("PayPal encountered an issue processing your request. This might be due to a temporary network issue or a restriction on your PayPal account. Please try another payment method.");
                          setIsProcessing(false);
                        }}
                        onCancel={() => {
                          setError("PayPal checkout was cancelled before completion. Please try again or select a different payment method.");
                          setIsProcessing(false);
                        }}
                        createOrder={(data, actions) => {
                          setError(null);
                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: finalPaypalPrice.toFixed(2),
                                },
                                description: "WhatsApp Sales Rescue Kit"
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          if (actions.order) {
                            const details = await actions.order.capture();
                            if (details.status === "COMPLETED") {
                              handleSuccess(details.id);
                            }
                          }
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>

                  <button 
                    onClick={() => setStep(1)}
                    disabled={isProcessing}
                    className="w-full py-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    Back to Details
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#25D366]" />
                </div>
                <h4 className="text-2xl font-black text-zinc-900 mb-4">Payment Successful!</h4>
                <p className="text-zinc-500 font-medium mb-4">
                  Your email has been whitelisted and your receipt has been sent.
                </p>
                <p className="text-zinc-400 text-sm mb-8">
                  Redirecting you to your portal...
                </p>
                <div className="flex justify-center">
                  <Loader2 className="w-8 h-8 text-[#25D366] animate-spin" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
