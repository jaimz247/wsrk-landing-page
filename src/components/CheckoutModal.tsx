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
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
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

  // Mock backend for coupons and referrals
  const getCouponUsage = (code: string) => {
    const usage = localStorage.getItem(`coupon_usage_${code}`);
    return usage ? parseInt(usage, 10) : 0;
  };

  const incrementCouponUsage = (code: string) => {
    const usage = getCouponUsage(code);
    localStorage.setItem(`coupon_usage_${code}`, (usage + 1).toString());
  };

  const recordReferral = (referralCode: string, newCustomerEmail: string, amount: number) => {
    const referrals = JSON.parse(localStorage.getItem('referrals') || '[]');
    referrals.push({ code: referralCode, customer: newCustomerEmail, amount, date: new Date().toISOString() });
    localStorage.setItem('referrals', JSON.stringify(referrals));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponMessage(null);
    
    // Simulate API validation delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const code = couponCode.trim().toUpperCase();
    const usage = getCouponUsage(code);

    if (code === 'RESCUE20') {
      if (usage >= 100) {
        setDiscount(0);
        setCouponMessage({ type: 'error', text: 'This coupon has reached its usage limit.' });
      } else {
        setDiscount(basePrice * 0.2);
        setCouponMessage({ type: 'success', text: '20% discount applied!' });
      }
    } else if (code === 'VIP50') {
      if (usage >= 50) {
        setDiscount(0);
        setCouponMessage({ type: 'error', text: 'This coupon has reached its usage limit.' });
      } else {
        setDiscount(basePrice * 0.5);
        setCouponMessage({ type: 'success', text: '50% discount applied!' });
      }
    } else if (code === 'FREEPASS') {
      if (usage >= 10) {
        setDiscount(0);
        setCouponMessage({ type: 'error', text: 'This coupon has reached its usage limit.' });
      } else {
        setDiscount(basePrice);
        setCouponMessage({ type: 'success', text: '100% discount applied! Checkout is free.' });
      }
    } else if (code.startsWith('REF-') && code.length > 4) {
      setDiscount(1000); // ₦1,000 off for referrals
      setCouponMessage({ type: 'success', text: 'Referral discount applied (₦1,000 off)!' });
    } else {
      setDiscount(0);
      setCouponMessage({ type: 'error', text: 'Invalid or expired coupon code.' });
    }
    setIsApplyingCoupon(false);
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponMessage(null);
  };

  const sendReceipt = async (transactionRef: string) => {
    // If the user paid money, the payment gateways (Paystack, Flutterwave, PayPal) 
    // will automatically send a secure webhook to the portal. We don't need to do anything here.
    if (finalPrice > 0) {
      console.log(`[Checkout] Paid transaction completed. Payment gateway will send webhook to portal.`);
      return;
    }

    // However, if the user used a 100% FREEPASS, the payment gateways are bypassed.
    // We MUST send a manual webhook to the portal to grant them access.
    try {
      const freeAccessWebhookUrl = import.meta.env.VITE_PORTAL_FREE_WEBHOOK_URL || 'https://app.chatsalesrescue.com/api/webhooks/free-access';
      const freeAccessSecret = import.meta.env.VITE_FREE_ACCESS_SECRET || 'FREEPASS';
      
      console.log(`[Checkout] Free access granted. Sending manual webhook to portal...`);
      
      const payload = {
        email: email
      };

      const response = await fetch(freeAccessWebhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-free-access-secret': freeAccessSecret
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error("Failed to whitelist free user on the portal. Status:", response.status);
      } else {
        console.log("Successfully whitelisted free user on the portal.");
      }
    } catch (e) {
      console.error("Network error while communicating with portal for free access", e);
    }
  };

  const handleSuccess = (transactionRef: string) => {
    setStep(4);
    sendReceipt(transactionRef);
    
    if (couponCode.trim()) {
      const code = couponCode.trim().toUpperCase();
      if (['RESCUE20', 'VIP50', 'FREEPASS'].includes(code)) {
        incrementCouponUsage(code);
      } else if (code.startsWith('REF-')) {
        recordReferral(code, email, finalPrice);
      }
    }

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
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 px-2">
                <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                  Step {step} of 4
                </h4>
                <span className="text-xs font-bold text-[#25D366]">
                  {step === 1 ? 'Details' : step === 2 ? 'Summary' : step === 3 ? 'Payment' : 'Success'}
                </span>
              </div>
              <div className="flex items-center justify-between relative px-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-zinc-100 -z-10 rounded-full"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#25D366] -z-10 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: step === 1 ? '0%' : step === 2 ? '33.33%' : step === 3 ? '66.66%' : '100%' }}
                ></div>
                
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${step >= s ? 'bg-[#25D366] text-white shadow-lg shadow-green-500/30' : 'bg-white border-2 border-zinc-200 text-zinc-400'}`}>
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                  </div>
                ))}
              </div>
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
                  <h4 className="text-2xl font-black text-zinc-900 mb-2">Order Summary</h4>
                  <p className="text-zinc-500 font-medium">Review your order and apply any discounts.</p>
                </div>

                <div className="bg-zinc-50 rounded-xl p-5 mb-6 border border-zinc-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-zinc-600 font-medium">WhatsApp Sales Rescue Kit</span>
                    <span className="font-bold text-zinc-900">₦{basePrice.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center mb-3 text-[#25D366]">
                      <span className="font-medium">Discount Applied</span>
                      <span className="font-bold">-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="h-px bg-zinc-200 w-full my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-zinc-900">Total</span>
                    <span className="text-2xl font-black text-zinc-900">₦{finalPrice.toLocaleString()}</span>
                  </div>
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
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          if (couponMessage) setCouponMessage(null);
                        }}
                        disabled={discount > 0}
                        placeholder="e.g. REF-1234 or WSRK20"
                        className={`w-full pl-9 pr-10 py-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-medium text-sm transition-all uppercase ${
                          couponMessage?.type === 'success' ? 'border-[#25D366] focus:ring-[#25D366]' : 
                          couponMessage?.type === 'error' ? 'border-red-500 focus:ring-red-500' : 
                          'border-zinc-200 focus:ring-[#25D366]'
                        } disabled:bg-zinc-100 disabled:text-zinc-500`}
                      />
                      {couponMessage && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          {couponMessage.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {discount > 0 ? (
                      <button 
                        onClick={removeCoupon}
                        className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center min-w-[80px]"
                      >
                        Remove
                      </button>
                    ) : (
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="px-4 py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                      >
                        {isApplyingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {couponMessage && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className={`text-xs font-bold flex items-center gap-1.5 ${couponMessage.type === 'success' ? 'text-[#25D366]' : 'text-red-500'}`}
                      >
                        {couponMessage.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                        {couponMessage.text}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => setStep(3)}
                    className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
                  >
                    Confirm & Proceed to Payment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full py-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    Back to Details
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6 text-center">
                  <h4 className="text-2xl font-black text-zinc-900 mb-2">Select Payment Method</h4>
                  <p className="text-zinc-500 font-medium">Choose how you'd like to pay ₦{finalPrice.toLocaleString()} securely.</p>
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
                  {finalPrice === 0 ? (
                    <button 
                      onClick={() => handleSuccess(`FREE-${Date.now()}`)}
                      className="w-full p-4 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
                    >
                      <span>Claim Free Access</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}

                  <button 
                    onClick={() => setStep(2)}
                    disabled={isProcessing}
                    className="w-full py-3 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    Back to Order Summary
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
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
