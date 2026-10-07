import React from 'react';
import { 
  Zap, 
  Award, 
  Tag, 
  HeartHandshake, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { TRUST_POINTS, BusinessConfig } from '../data/businessData';

interface WhyChooseSectionProps {
  business: BusinessConfig;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ business }) => {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2">
            Local Reliability &amp; Quality Craftsmanship
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Why Choose {business.name}?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Conveniently situated in Chorunuru near the Government Hospital and Veterinary Hospital in Kudligi. We are committed to fast, courteous, and dependable document services.
          </p>
        </div>

        {/* 5 Core Value Pillars (Asymmetrical Bento Presentation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Fast Service */}
          <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between hover:border-blue-400 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-800 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Fast Service
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get your documents printed quickly with minimal waiting time. Need emergency photocopy or hall ticket printing? We prioritize urgent customer needs on the spot.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="font-mono text-blue-700 text-sm font-bold">&lt; 5 Minutes</span>
              <span className="text-slate-500 font-normal">Typical counter turnaround</span>
            </div>
          </div>

          {/* Card 2: Quality Results */}
          <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between hover:border-blue-400 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-800 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Quality Results
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Clear text, sharp images, high-contrast black tones, and professional finishing. We only utilize genuine toners and bright 75–85 GSM smooth paper stocks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="font-mono text-blue-700 text-sm font-bold">1200 DPI</span>
              <span className="text-slate-500 font-normal">High-resolution laser clarity</span>
            </div>
          </div>

          {/* Card 3: Affordable Pricing */}
          <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between hover:border-blue-400 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Affordable Pricing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Competitive and student-friendly prices starting at just ₹1/page. Special wholesale packages available for school projects, government tenders, and bulk office copying.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="font-mono text-emerald-700 text-sm font-bold">From ₹1/page</span>
              <span className="text-slate-500 font-normal">Transparent price card</span>
            </div>
          </div>

          {/* Card 4: Friendly Service */}
          <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between hover:border-blue-400 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100/70 text-indigo-800 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Friendly Service
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Need help formatting your CV, setting margins, converting photos for online job forms, or downloading certificates? We provide patient, friendly guidance with every request.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="font-mono text-indigo-700 text-sm font-bold">100% Assisted</span>
              <span className="text-slate-500 font-normal">In-person technical help</span>
            </div>
          </div>

          {/* Card 5: Convenient Ordering (Col span on desktop) */}
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-7 border border-blue-800 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                Convenient Ordering via WhatsApp
              </h3>
              <p className="text-sm text-slate-200 max-w-xl leading-relaxed">
                Save valuable time! Send your PDF, Word document, or image files through WhatsApp before visiting our shop in Chorunuru. We will prepare, print, and keep your documents ready for instant pickup.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-blue-200">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Files deleted post-print for privacy
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Zero queue pickup
                </span>
              </div>

              <a
                href={`https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(`Hello ${business.name}, I want to send a file to print before I arrive.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Send Document Now</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
