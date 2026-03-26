import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[40px] shadow-sm border border-zinc-100">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-bold text-sm mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tight">WSRK</span>
        </div>

        <h1 className="text-4xl font-black mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-zinc-500 font-medium mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-10 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and purchasing the WhatsApp Sales Rescue Kit, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on the WhatsApp Sales Rescue Kit website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p className="mt-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Disclaimer</h2>
            <p>
              The materials on the WhatsApp Sales Rescue Kit website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mt-4">
              Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Limitations</h2>
            <p>
              In no event shall the WhatsApp Sales Rescue Kit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Revisions and Errata</h2>
            <p>
              The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
