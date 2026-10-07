import React from 'react';
import { 
  Printer, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Clock, 
  Heart 
} from 'lucide-react';
import { BusinessConfig } from '../data/businessData';

interface FooterProps {
  business: BusinessConfig;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ business, onOpenQuote }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${business.whatsappRaw}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                Abhinaya<span className="text-blue-500">.com</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted local Xerox, Printing &amp; Digital Service Center in Chorunuru. Providing lightning-fast copying, photo printing, and government application services.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {/* WhatsApp Social */}
              <button
                type="button"
                onClick={openWhatsApp}
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              {/* Instagram Social */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-pink-600 hover:text-white text-slate-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Facebook Social */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-400 border border-slate-800 flex items-center justify-center transition-colors"
                title="Facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#pricing')}
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#why-us')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Get a Quote &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors"
                >
                  Xerox &amp; Photocopy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors"
                >
                  Color &amp; B/W Printing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors"
                >
                  Document Scanning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors"
                >
                  Thermal Lamination
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors"
                >
                  Spiral Binding
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors"
                >
                  Passport &amp; ID Photos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Hours (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Contact &amp; Location
            </h4>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p className="text-white font-medium">
                {business.addressLine1}
              </p>
              <p className="text-blue-400">
                {business.addressLine2}
              </p>
              <p>
                {business.locality}, {business.state}, {business.country}
              </p>
              
              <div className="pt-2 border-t border-slate-900 space-y-1">
                <p className="text-slate-300 font-mono">📞 {business.phone}</p>
                <p className="text-emerald-400 font-mono">💬 {business.whatsapp}</p>
              </div>

              <div className="pt-1 text-[11px] text-slate-500">
                <p>{business.openingHoursWeekdays}</p>
                <p>{business.openingHoursSunday}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {business.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Serving Chorunuru, Kudligi, Sandur and surrounding Karnataka communities</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
