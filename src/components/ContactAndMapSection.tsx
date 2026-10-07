import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  Navigation, 
  ExternalLink, 
  Building2, 
  Hospital, 
  Check, 
  Copy 
} from 'lucide-react';
import { BusinessConfig } from '../data/businessData';

interface ContactAndMapSectionProps {
  business: BusinessConfig;
}

export const ContactAndMapSection: React.FC<ContactAndMapSectionProps> = ({ business }) => {
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Chorunuru, Kudligi, Sandur, Karnataka, India'
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(business.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${business.name}, I need directions or service info for your shop in Chorunuru.`
    );
    window.open(`https://wa.me/${business.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2">
            Visit Our Shop or Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Contact &amp; Find Us
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Conveniently located in Chorunuru near the Government Hospital and Veterinary Hospital. Stop by in person or reach out through call and WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Details & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Address Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                    PHYSICAL LOCATION
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mt-0.5">
                    {business.name}
                  </h3>
                  
                  <div className="mt-3 text-sm text-slate-600 space-y-1 leading-relaxed">
                    <p className="font-medium text-slate-900">{business.addressLine1}</p>
                    <p className="text-blue-800 font-medium flex items-center gap-1.5 text-xs bg-blue-50 p-1.5 rounded-lg border border-blue-100 my-1.5">
                      <Hospital className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>{business.addressLine2}</span>
                    </p>
                    <p>{business.locality}, {business.state}, {business.country}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                    >
                      <span>Open Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details List */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              
              {/* Phone */}
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Call Us</p>
                  <a
                    href={`tel:${business.phoneRaw}`}
                    className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors font-mono"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">WhatsApp Orders</p>
                  <a
                    href={`https://wa.me/${business.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors font-mono"
                  >
                    {business.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Email Address</p>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm font-medium text-slate-900 hover:text-blue-700 transition-colors"
                  >
                    {business.email}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3.5 pt-1">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Opening Hours</p>
                  <p className="text-xs font-semibold text-slate-900 mt-0.5">
                    {business.openingHoursWeekdays}
                  </p>
                  <p className="text-xs text-slate-600">
                    {business.openingHoursSunday}
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={`tel:${business.phoneRaw}`}
                className="inline-flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all text-center"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-sm transition-all text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-700" />
                <span>Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Component */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-full">
              
              {/* Map Header Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">
                      Google Maps Location
                    </h3>
                    <p className="text-xs text-slate-500">
                      Chorunuru, Kudligi, Sandur, Karnataka
                    </p>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Live Directions</span>
                </a>
              </div>

              {/* Map Container: Interactive OpenStreetMap / Google Maps hybrid presentation */}
              <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-100">
                
                {/* Embedded Map iframe centered on Chorunuru, Kudligi, Sandur */}
                <iframe
                  title="Abhinaya.com Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.3500%2C14.8800%2C76.4200%2C14.9300&amp;layer=mapnik&amp;marker=14.9016%2C76.3869"
                  className="w-full h-full border-0"
                />

                {/* Custom Overlay Pin Card for Abhinaya.com */}
                <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/90 shadow-xl text-left pointer-events-auto">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 font-heading">
                        {business.name}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                        Chorunuru, Koravar Verappa House
                      </p>
                      <p className="text-[10px] text-blue-700 font-semibold mt-1">
                        📍 Near Govt Hospital &amp; Vet Hospital
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Open for Customers
                    </span>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-semibold hover:underline flex items-center gap-0.5"
                    >
                      Navigate &rarr;
                    </a>
                  </div>
                </div>

                {/* Bottom Landmark Badges for customer orientation */}
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-2">
                  <span className="text-blue-300 font-bold">Landmarks:</span>
                  <span className="text-slate-200">Govt Hospital · Veterinary Hospital · Chorunuru Road</span>
                </div>

              </div>

              {/* Map Footer Info */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>
                  Exact GPS: <span className="font-mono font-semibold text-slate-800">14.9016° N, 76.3869° E</span> (Sandur / Kudligi taluk)
                </span>
                <span className="text-slate-500">
                  Easy parking &amp; accessible counter entrance
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
