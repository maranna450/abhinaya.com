import React from 'react';
import { MessageSquare, FileUp, CheckCircle, Clock, Shield } from 'lucide-react';
import { BusinessConfig } from '../data/businessData';

interface WhatsAppCtaSectionProps {
  business: BusinessConfig;
}

export const WhatsAppCtaSection: React.FC<WhatsAppCtaSectionProps> = ({ business }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${business.name}, I need to print a document. I am attaching my requirements and file details.`
    );
    window.open(`https://wa.me/${business.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FAST DIRECT WHATSAPP DESK</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading max-w-2xl mx-auto">
          Need Something Printed?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Send your document and requirements to <span className="font-semibold text-white">{business.name}</span> on WhatsApp. We'll confirm the details, price and completion time.
        </p>

        {/* WhatsApp Order Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={openWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-2xl shadow-xl shadow-emerald-950/40 transition-all hover:scale-105 active:scale-100"
          >
            <MessageSquare className="w-5 h-5 text-white" />
            <span>📱 Order on WhatsApp</span>
          </button>
        </div>

        {/* Reassurance pills / badges */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Instant Price Confirmation</span>
          </div>
          <span className="hidden sm:inline text-white/30">·</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Ready for Pickup in Minutes</span>
          </div>
          <span className="hidden sm:inline text-white/30">·</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Confidential &amp; Secure Document Handling</span>
          </div>
        </div>

      </div>
    </section>
  );
};
