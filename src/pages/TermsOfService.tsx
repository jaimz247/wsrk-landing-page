import React from 'react';
import { ShieldCheck, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-black mb-6 tracking-tight">Terms of Service</h1>
          <p className="text-xl text-zinc-500 font-medium max-w-2xl leading-relaxed">
            Please read these terms carefully before using our services. By accessing or using our products, you agree to be bound by these terms.
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
            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">1. Agreement to Terms</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              By accessing our website and purchasing the WhatsApp Sales Rescue Kit, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">2. Use License</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on the WhatsApp Sales Rescue Kit website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-8 text-zinc-600 space-y-2">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed mb-8">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">3. Disclaimer</h2>
            <p className="text-zinc-600 leading-relaxed mb-4">
              The materials on the WhatsApp Sales Rescue Kit website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-zinc-600 leading-relaxed mb-8">
              Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site. Results from using our templates and strategies may vary depending on your specific business, audience, and execution.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">4. Limitations</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              In no event shall the WhatsApp Sales Rescue Kit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">5. Revisions and Errata</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice. However, we do not make any commitment to update the materials.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">6. Governing Law</h2>
            <p className="text-zinc-600 leading-relaxed mb-8">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
