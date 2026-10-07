import React, { useState } from 'react';
import { Menu, X, Phone, MessageSquare, ArrowRight, Printer } from 'lucide-react';
import { BusinessConfig } from '../data/businessData';

interface NavbarProps {
  business: BusinessConfig;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ business, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${business.name}, I would like to inquire about printing services at your Chorunuru shop.`
    );
    window.open(`https://wa.me/${business.whatsappRaw}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="group flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-90"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-700/20 group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
                  Abhinaya<span className="text-blue-700">.com</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 -mt-1 hidden xs:block">
                  Xerox & Digital Services
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Text with subtle hover effects) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="hover:text-blue-700 transition-colors py-1"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#services');
              }}
              className="hover:text-blue-700 transition-colors py-1"
            >
              Services
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#pricing');
              }}
              className="hover:text-blue-700 transition-colors py-1"
            >
              Pricing
            </a>
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#calculator');
              }}
              className="hover:text-blue-700 transition-colors py-1"
            >
              Estimate Cost
            </a>
            <a
              href="#why-us"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#why-us');
              }}
              className="hover:text-blue-700 transition-colors py-1"
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="hover:text-blue-700 transition-colors py-1"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={openWhatsApp}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200/80 transition-colors whitespace-nowrap"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={onOpenQuote}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm shadow-blue-700/25 transition-all hover:shadow-md whitespace-nowrap active:scale-[0.98]"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </button>
            <a
              href={`tel:${business.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-blue-900 bg-blue-50 rounded-lg border border-blue-200"
            >
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>Call Now</span>
            </a>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('#home')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('#services')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('#pricing')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick('#calculator')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Price Calculator
            </button>
            <button
              onClick={() => handleNavClick('#why-us')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('#how-it-works')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Contact & Location
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm"
            >
              Request a Custom Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
