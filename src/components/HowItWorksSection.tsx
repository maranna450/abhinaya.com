import React from 'react';
import { Send, Printer, ShoppingBag, ArrowRight } from 'lucide-react';
import { WORKFLOW_STEPS, BusinessConfig } from '../data/businessData';

interface HowItWorksSectionProps {
  business: BusinessConfig;
  onOpenQuote: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ 
  business, 
  onOpenQuote 
}) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Send className="w-5 h-5 text-blue-700" />;
      case 1:
        return <Printer className="w-5 h-5 text-blue-700" />;
      case 2:
        return <ShoppingBag className="w-5 h-5 text-blue-700" />;
      default:
        return <Send className="w-5 h-5 text-blue-700" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2">
            Seamless 3-Step Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            No waiting in long lines. Order your prints and photocopies in three simple steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {WORKFLOW_STEPS.map((stepItem, index) => (
            <div
              key={stepItem.step}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              {/* Top Row: Index Badge & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-slate-200 group-hover:text-blue-100 transition-colors font-mono">
                    {stepItem.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    {React.cloneElement(getStepIcon(index), {
                      className: 'w-6 h-6 text-blue-700 group-hover:text-white transition-colors'
                    })}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-heading mb-2.5">
                  {stepItem.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {stepItem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
                <span className="text-blue-700 font-semibold block mb-0.5">Note:</span>
                {stepItem.hint}
              </div>
            </div>
          ))}

        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md shadow-blue-700/20 transition-all hover:-translate-y-0.5"
          >
            <span>Start Your Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
