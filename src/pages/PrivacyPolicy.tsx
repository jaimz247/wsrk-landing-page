import React from 'react';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-black mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-zinc-500 font-medium max-w-2xl leading-relaxed">
            We are committed to protecting your personal data and respecting your privacy. This policy explains how we handle your information.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-lg text-sm font-bold text-zinc-600">
            Last Updated: April 2026
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 -mt-12">
        <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-zinc-100">
          <div className="prose prose-zinc max-w-none">
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">1. Introduction</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              Welcome to WhatsApp Sales Rescue ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">2. The Data We Collect About You</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-8 text-zinc-600 space-y-2">
              <li><strong className="text-zinc-900">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong className="text-zinc-900">Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong className="text-zinc-900">Financial Data:</strong> includes payment card details (processed securely by our payment providers; we do not store full card details).</li>
              <li><strong className="text-zinc-900">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
              <li><strong className="text-zinc-900">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, and other technology on the devices you use to access this website.</li>
            </ul>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">3. How We Use Your Personal Data</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-8 text-zinc-600 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., delivering the WhatsApp Sales Rescue Kit).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">4. Data Security</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">5. Your Legal Rights</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-zinc-600 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">6. Contact Us</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:support@chatsalesrescue.com" className="text-[#25D366] font-bold hover:underline">support@chatsalesrescue.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
