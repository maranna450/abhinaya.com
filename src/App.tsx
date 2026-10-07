/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhatsAppCtaSection } from './components/WhatsAppCtaSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { ContactAndMapSection } from './components/ContactAndMapSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { EditBusinessModal } from './components/EditBusinessModal';
import { OwnerPasswordModal } from './components/OwnerPasswordModal';
import { 
  INITIAL_BUSINESS_CONFIG, 
  INITIAL_PRICES, 
  BusinessConfig, 
  PriceItem 
} from './data/businessData';

export default function App() {
  const [business, setBusiness] = useState<BusinessConfig>(() => {
    const saved = localStorage.getItem('abhinaya_business_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_BUSINESS_CONFIG;
  });

  const [prices, setPrices] = useState<PriceItem[]>(() => {
    const saved = localStorage.getItem('abhinaya_prices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PRICES;
  });

  const [preselectedService, setPreselectedService] = useState<string>('Xerox & Photocopy');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  const handleUpdatePrices = (newPrices: PriceItem[]) => {
    setPrices(newPrices);
    localStorage.setItem('abhinaya_prices', JSON.stringify(newPrices));
  };

  const handleUpdateBusiness = (newConfig: BusinessConfig) => {
    setBusiness(newConfig);
    localStorage.setItem('abhinaya_business_config', JSON.stringify(newConfig));
  };

  const handleScrollToQuote = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    const el = document.getElementById('quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Banner Notice for Local Community */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col xs:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-center xs:text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>
              Welcome to <strong className="text-white font-medium">{business.name}</strong> · Chorunuru, Kudligi, Sandur, Karnataka
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-400">
              Hours: {business.openingHoursWeekdays}
            </span>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 rounded-md border border-slate-700 transition-all font-medium text-[11px] sm:text-xs cursor-pointer shadow-xs active:scale-[0.98]"
              title="Owner settings protected by password"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Shop Settings</span>
            </button>
          </div>
        </div>
      </div>


      {/* Sticky Navigation Bar */}
      <Navbar 
        business={business} 
        onOpenQuote={() => handleScrollToQuote()} 
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          business={business} 
          onOpenQuote={() => handleScrollToQuote()} 
        />

        {/* Services Section */}
        <ServicesSection 
          business={business} 
          onSelectServiceForQuote={(serviceTitle) => handleScrollToQuote(serviceTitle)} 
        />

        {/* Transparent & Editable Pricing + Cost Calculator */}
        <PricingSection 
          prices={prices} 
          business={business} 
          onOpenQuote={() => handleScrollToQuote()}
          onUpdatePrices={handleUpdatePrices}
          onOpenOwnerSettings={() => setIsPasswordModalOpen(true)}
        />

        {/* Why Choose Us */}
        <WhyChooseSection 
          business={business} 
        />

        {/* 3-Step How It Works */}
        <HowItWorksSection 
          business={business} 
          onOpenQuote={() => handleScrollToQuote()} 
        />

        {/* WhatsApp Direct Ordering CTA */}
        <WhatsAppCtaSection 
          business={business} 
        />

        {/* Interactive Quote & Document Enquiry Form */}
        <QuoteFormSection 
          business={business} 
          preselectedService={preselectedService} 
        />

        {/* Contact Information & Google Maps Location */}
        <ContactAndMapSection 
          business={business} 
        />
      </main>

      {/* Dark Footer */}
      <Footer 
        business={business} 
        onOpenQuote={() => handleScrollToQuote()} 
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp 
        business={business} 
      />

      {/* Owner Password Verification Modal */}
      <OwnerPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsSettingsModalOpen(true);
        }}
      />

      {/* Shop Owner Settings & Rate Editing Modal */}
      <EditBusinessModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        config={business}
        prices={prices}
        onSaveConfig={handleUpdateBusiness}
        onSavePrices={handleUpdatePrices}
      />
    </div>
  );
}
