import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, Search, MessageCircle, Mail, ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How do I access the WhatsApp Sales Rescue Kit after purchase?",
    answer: "Immediately after your purchase is completed, you will receive an email with your secure login credentials and a link to the member portal. You can also click 'Member Login' at the bottom of our website."
  },
  {
    question: "Is this a subscription or a one-time payment?",
    answer: "The WhatsApp Sales Rescue Kit is a one-time payment. There are no hidden fees or recurring subscriptions. You get lifetime access to the core materials and any future updates to the kit."
  },
  {
    question: "Do I need any special software to use the templates?",
    answer: "No! The templates are provided in easily accessible formats (PDF, Google Docs, and raw text). You can simply copy and paste them directly into your WhatsApp Business app or any other messaging platform."
  },
  {
    question: "What if I have trouble logging in?",
    answer: "If you're experiencing login issues, first ensure you are using the exact email address you used during checkout. If you forgot your password, use the 'Forgot Password' link on the login portal. For persistent issues, contact our support team."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee. If you implement the strategies and don't see an improvement in your conversion rates, simply reach out to our support team within 14 days of purchase for a full refund."
  }
];

export default function SupportCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100 pt-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-bold text-sm mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <LifeBuoy className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-black mb-6 tracking-tight">Support Center</h1>
          <p className="text-xl text-zinc-500 font-medium max-w-2xl leading-relaxed">
            We're here to help you close more deals. Find answers to common questions or reach out to our dedicated support team.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 -mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main FAQ Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-zinc-100">
              <h2 className="text-2xl font-black mb-8 tracking-tight">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`border border-zinc-100 rounded-2xl overflow-hidden transition-all duration-200 ${openFaq === index ? 'bg-zinc-50/50 shadow-inner' : 'bg-white hover:border-zinc-200'}`}
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-bold text-zinc-900 pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 text-zinc-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <div className="bg-zinc-900 text-white p-8 rounded-[32px] shadow-xl">
              <h3 className="text-xl font-black mb-2">Need direct help?</h3>
              <p className="text-zinc-400 text-sm mb-8">Our support team typically responds within 2-4 hours during business days.</p>
              
              <div className="space-y-4">
                <a href="mailto:support@chatsalesrescue.com" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-2xl group">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Email Us</div>
                    <div className="font-medium text-sm">support@chatsalesrescue.com</div>
                  </div>
                </a>

                <a href="#" className="flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors p-4 rounded-2xl group">
                  <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#25D366] uppercase tracking-wider mb-1">WhatsApp</div>
                    <div className="font-medium text-sm text-green-50">+1 (555) 123-4567</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-zinc-100 text-center">
              <ShieldCheck className="w-8 h-8 text-[#25D366] mx-auto mb-4" />
              <h3 className="font-bold text-zinc-900 mb-2">Secure Portal</h3>
              <p className="text-sm text-zinc-500 mb-6">Access your purchased materials securely.</p>
              <a href="https://app.chatsalesrescue.com/access" className="inline-block w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold rounded-xl transition-colors text-sm">
                Member Login
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
