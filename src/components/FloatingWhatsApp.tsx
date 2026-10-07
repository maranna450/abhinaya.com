import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { BusinessConfig } from '../data/businessData';

interface FloatingWhatsAppProps {
  business: BusinessConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ business }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${business.name}, I would like to inquire about printing services at your shop in Chorunuru.`
    );
    window.open(`https://wa.me/${business.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-2.5">
      {/* Speech bubble / Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-slate-200/90 animate-bounce duration-1000 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">Need urgent prints? Chat on WhatsApp</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Primary Floating Action Button */}
      <button
        type="button"
        onClick={openWhatsApp}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with Abhinaya.com on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 text-white" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border-2 border-white"></span>
        </span>
      </button>
    </div>
  );
};
