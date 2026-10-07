import React, { useState } from 'react';
import { 
  Copy, 
  Palette, 
  FileText, 
  Scan, 
  ShieldCheck, 
  BookOpen, 
  Camera, 
  Briefcase, 
  Globe, 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem, BusinessConfig } from '../data/businessData';

interface ServicesSectionProps {
  business: BusinessConfig;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  business, 
  onSelectServiceForQuote 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'printing' | 'finishing' | 'digital'>('all');

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'xerox':
        return <Copy className="w-5 h-5 text-blue-700" />;
      case 'color-printing':
        return <Palette className="w-5 h-5 text-blue-700" />;
      case 'bw-printing':
        return <FileText className="w-5 h-5 text-blue-700" />;
      case 'scanning':
        return <Scan className="w-5 h-5 text-blue-700" />;
      case 'lamination':
        return <ShieldCheck className="w-5 h-5 text-blue-700" />;
      case 'spiral-binding':
        return <BookOpen className="w-5 h-5 text-blue-700" />;
      case 'passport-photos':
        return <Camera className="w-5 h-5 text-blue-700" />;
      case 'resume-printing':
        return <Briefcase className="w-5 h-5 text-blue-700" />;
      case 'online-services':
        return <Globe className="w-5 h-5 text-blue-700" />;
      default:
        return <FileText className="w-5 h-5 text-blue-700" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const handleWhatsAppServiceInquiry = (service: ServiceItem) => {
    const text = encodeURIComponent(
      `Hello ${business.name}, I would like to order / inquire about "${service.title}". Please let me know how I can send my files.`
    );
    window.open(`https://wa.me/${business.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2 font-mono">
            Commercial &amp; Everyday Document Solutions
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Services
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            From single-page photocopies to bulk project reports, high-gloss laminations and online portal assistance — explore our complete catalog at <span className="font-semibold text-slate-900">{business.name}</span>.
          </p>

          {/* Interactive Category Filter Controls */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-slate-100 rounded-xl border border-slate-200/80 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services ({SERVICES_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('printing')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'printing'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Printing &amp; Xerox
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('finishing')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'finishing'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Finishing &amp; Binding
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('digital')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'digital'
                  ? 'bg-white text-blue-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Digital &amp; Online
            </button>
          </div>
        </div>

        {/* Visual Feature Callouts (Bento Highlights) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Spotlight Card 1: Xerox & Copiers */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-end min-h-[260px] group shadow-md">
            <img
              src="/src/assets/images/digital_xerox_station_1791382059549.jpg"
              alt="Digital Xerox and high speed photocopy machine station at Abhinaya.com"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500"
            />
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-mono font-semibold text-blue-300">
                HIGH-SPEED INDUSTRIAL COPIERS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Ultra-Crisp Black &amp; White and Color Xerox
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-md">
                Equipped with multi-tray digital production machines. Single &amp; double-sided photocopying on 75+ GSM crisp paper.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-medium">
                <span className="text-emerald-400 font-mono font-bold">Rates from ₹1 / page</span>
                <span>·</span>
                <span className="text-slate-300">Ready while you wait</span>
              </div>
            </div>
          </div>

          {/* Spotlight Card 2: Spiral Binding & Lamination */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-end min-h-[260px] group shadow-md">
            <img
              src="/src/assets/images/binding_lamination_craft_1791382071526.jpg"
              alt="Spiral binding reports, laminated certificates and documents finishing"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500"
            />
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-300">
                PROFESSIONAL FINISHING CRAFT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Spiral Binding &amp; Heavy Thermal Lamination
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-md">
                Protect original certificates, marks cards, and ID cards. Spiral bound project reports with transparent covers and sturdy backboards.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-medium">
                <span className="text-emerald-400 font-mono font-bold">Starting from ₹20</span>
                <span>·</span>
                <span className="text-slate-300">Same-day turnaround</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500/80 p-6 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Card Top: Icon & Category Indicator */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    {React.cloneElement(getServiceIcon(service.id), {
                      className: 'w-6 h-6 text-blue-700 group-hover:text-white transition-colors'
                    })}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-heading">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features list */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="w-full py-2 px-3 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppServiceInquiry(service)}
                  className="w-full py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with reassurance */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50/70 border border-blue-100 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-base font-bold text-blue-950 font-heading">
              Have a special document requirement or bulk college project?
            </h3>
            <p className="text-xs sm:text-sm text-blue-800/80 mt-0.5">
              We offer special student discounts and corporate invoice receipts for bulk orders.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectServiceForQuote("Bulk Printing / Custom Request")}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm whitespace-nowrap"
          >
            Request Bulk Quote
          </button>
        </div>

      </div>
    </section>
  );
};
