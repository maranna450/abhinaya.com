import React, { useState } from 'react';
import { MessageSquare, ArrowDown, MapPin, Zap, Printer, ShieldCheck, Tag, CheckCircle2 } from 'lucide-react';
import { BusinessConfig } from '../data/businessData';

interface HeroSectionProps {
  business: BusinessConfig;
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ business, onOpenQuote }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroImagePath = "/src/assets/images/hero_printing_center_1791382045285.jpg";

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${business.name}, I need urgent printing / Xerox service. Please let me know how I can send my document.`
    );
    window.open(`https://wa.me/${business.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-6 pb-16 sm:pt-10 sm:pb-20 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      {/* Subtle background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1e40af 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Status Marker */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 text-blue-800 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span>Chorunuru, Kudligi</span>
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-slate-500">Sandur, Karnataka</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open Today</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
              <span className="text-blue-700">{business.name}</span> — Your Trusted Xerox &amp; Digital Service Center
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {business.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>Order on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={scrollToServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl shadow-sm transition-all hover:border-slate-300"
              >
                <span>View Our Services</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust highlights / Micro-guarantees */}
            <div className="pt-4 border-t border-slate-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-slate-900">Fast Service</h2>
                    <p className="text-[11px] text-slate-500">Quick while you wait</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-slate-900">High-Quality</h2>
                    <p className="text-[11px] text-slate-500">1200 DPI crisp print</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-slate-900">Affordable</h2>
                    <p className="text-[11px] text-slate-500">From ₹1 per page</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-slate-900">Secure Docs</h2>
                    <p className="text-[11px] text-slate-500">100% confidential</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Decorative accent framing */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-lg -z-10" />

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <img
                  src={heroImagePath}
                  alt="Modern Xerox and digital printing center workspace at Abhinaya.com"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center transition-transform duration-500 hover:scale-105"
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    // Fallback to styled SVG container
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Scrim Overlay & Floating Card Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-blue-200">Official Xerox Station</p>
                      <p className="text-base font-bold text-white font-heading">
                        Commercial Copiers &amp; Color Laser Printers
                      </p>
                    </div>
                    <button
                      onClick={onOpenQuote}
                      type="button"
                      className="px-3 py-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white border border-white/30 transition-colors"
                    >
                      Instant Quote
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-200">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      A4, Legal, A3
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Duplex Photocopy
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Spiral &amp; Lamination
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp helper pill adjacent to hero */}
              <div className="mt-4 p-3.5 bg-blue-900 text-white rounded-xl flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-medium text-blue-100">
                    Need immediate printing? Send files to WhatsApp:
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  {business.phone}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
