import React, { useState } from 'react';
import { 
  Calculator, 
  MessageSquare, 
  ArrowRight, 
  Edit3, 
  RotateCcw, 
  Info, 
  Check, 
  FileCheck2, 
  Sparkles 
} from 'lucide-react';
import { PriceItem, BusinessConfig } from '../data/businessData';

interface PricingSectionProps {
  prices: PriceItem[];
  business: BusinessConfig;
  onOpenQuote: () => void;
  onUpdatePrices: (newPrices: PriceItem[]) => void;
  onOpenOwnerSettings?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  prices,
  business,
  onOpenQuote,
  onUpdatePrices,
  onOpenOwnerSettings,
}) => {
  // Calculator state
  const [pages, setPages] = useState<number>(10);
  const [copies, setCopies] = useState<number>(1);
  const [printType, setPrintType] = useState<'bw-xerox' | 'color' | 'bw-print'>('bw-xerox');
  const [paperSize, setPaperSize] = useState<'A4' | 'Legal' | 'A3'>('A4');
  const [isDoubleSided, setIsDoubleSided] = useState<boolean>(false);
  const [includeBinding, setIncludeBinding] = useState<boolean>(false);
  const [includeLamination, setIncludeLamination] = useState<boolean>(false);
  const [laminationCount, setLaminationCount] = useState<number>(1);

  // Edit modal state
  const [isEditingPrices, setIsEditingPrices] = useState<boolean>(false);
  const [tempPrices, setTempPrices] = useState<PriceItem[]>(prices);

  // Cost calculation
  const getBaseRate = () => {
    const item = prices.find((p) => {
      if (printType === 'bw-xerox') return p.id === 'bw-xerox';
      if (printType === 'color') return p.id === 'color-print';
      if (printType === 'bw-print') return p.id === 'bw-print';
      return false;
    });
    return item ? item.numericRate : 1;
  };

  const calculateEstimate = () => {
    let ratePerPage = getBaseRate();
    
    // Paper size multiplier
    if (paperSize === 'Legal') ratePerPage *= 1.25;
    if (paperSize === 'A3') ratePerPage *= 2.0;

    // Double-sided adjustment (usually slight discount or 1.8x single side rate per sheet)
    const sidesMultiplier = isDoubleSided ? 0.9 : 1.0; 
    const printCost = pages * copies * ratePerPage * sidesMultiplier;

    // Add finishing costs
    const bindingItem = prices.find((p) => p.id === 'spiral-binding');
    const bindingCost = includeBinding ? (bindingItem ? bindingItem.numericRate * copies : 30 * copies) : 0;

    const laminationItem = prices.find((p) => p.id === 'lamination');
    const laminationCost = includeLamination 
      ? (laminationItem ? laminationItem.numericRate * laminationCount : 20 * laminationCount) 
      : 0;

    const total = Math.round(printCost + bindingCost + laminationCost);
    return Math.max(total, 1);
  };

  const estimatedTotal = calculateEstimate();

  const handleSendEstimateWhatsApp = () => {
    const printTypeLabel = printType === 'bw-xerox' 
      ? 'B/W Xerox' 
      : printType === 'color' 
      ? 'Color Print' 
      : 'B/W Document Print';

    const message = 
      `*Order Estimate from ${business.name}*\n\n` +
      `• Service: ${printTypeLabel}\n` +
      `• Paper Size: ${paperSize}\n` +
      `• Pages: ${pages}\n` +
      `• Copies: ${copies}\n` +
      `• Sides: ${isDoubleSided ? 'Double-sided' : 'Single-sided'}\n` +
      (includeBinding ? `• Spiral Binding: Yes (${copies} book(s))\n` : '') +
      (includeLamination ? `• Lamination: Yes (${laminationCount} doc(s))\n` : '') +
      `• Estimated Total: *₹${estimatedTotal}*\n\n` +
      `Please let me know where I can send my document file!`;

    window.open(
      `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleSavePrices = () => {
    onUpdatePrices(tempPrices);
    setIsEditingPrices(false);
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              Clear &amp; Honest Rates
            </span>
            <button
              onClick={() => {
                if (onOpenOwnerSettings) {
                  onOpenOwnerSettings();
                } else {
                  setTempPrices(prices);
                  setIsEditingPrices(true);
                }
              }}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200 transition-colors ml-2 cursor-pointer"
              title="Edit rates (Owner password required)"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Prices</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Transparent Pricing
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Affordable rates for school &amp; college students, daily office paperwork, legal certificates, and government applications.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {prices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {item.service}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.unit}
                  </span>
                </div>
                
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-heading tracking-tight">
                    {item.rate}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Standard Quality
                </span>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Order This &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Disclaimer & Quote Callout */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-medium">
              Prices may vary depending on quantity, paper size, paper weight (GSM), and finishing requirements.
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenQuote}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm whitespace-nowrap active:scale-[0.98]"
          >
            Get a Quote
          </button>
        </div>

        {/* Interactive Instant Price Estimator Tool */}
        <div id="calculator" className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-xs font-mono mb-2">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Interactive Estimation Tool</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Instant Printing Cost Calculator
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">
                  Configure your job parameters below to see the estimated cost before sending to Abhinaya.com.
                </p>
              </div>

              <div className="text-right sm:border-l sm:border-white/20 sm:pl-8">
                <span className="text-xs uppercase font-mono tracking-wider text-blue-200">
                  Estimated Total
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading">
                  ₹{estimatedTotal}
                </div>
                <span className="text-[11px] text-blue-200 block">
                  ({pages} pages × {copies} copy{copies > 1 ? 's' : ''})
                </span>
              </div>
            </div>
          </div>

          {/* Calculator Controls */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: Controls */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Service Type
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPrintType('bw-xerox')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      printType === 'bw-xerox'
                        ? 'border-blue-700 bg-blue-50/60 ring-2 ring-blue-700/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-slate-900">B/W Xerox</p>
                    <p className="text-[11px] text-blue-700 font-mono font-semibold">₹1 / page</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrintType('color')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      printType === 'color'
                        ? 'border-blue-700 bg-blue-50/60 ring-2 ring-blue-700/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-slate-900">Color Print</p>
                    <p className="text-[11px] text-blue-700 font-mono font-semibold">₹10 / page</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPrintType('bw-print')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      printType === 'bw-print'
                        ? 'border-blue-700 bg-blue-50/60 ring-2 ring-blue-700/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-slate-900">B/W Printout</p>
                    <p className="text-[11px] text-blue-700 font-mono font-semibold">₹2 / page</p>
                  </button>
                </div>
              </div>

              {/* Quantity Sliders / Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Number of Pages</label>
                    <span className="font-mono text-sm font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {pages} pages
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={pages}
                    onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full accent-blue-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>1 pg</span>
                    <span>50 pgs</span>
                    <span>100 pgs</span>
                    <span>200 pgs</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Number of Copies / Sets</label>
                    <span className="font-mono text-sm font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {copies} set{copies > 1 ? 's' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={copies}
                    onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full accent-blue-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>1 set</span>
                    <span>5 sets</span>
                    <span>10 sets</span>
                    <span>20 sets</span>
                  </div>
                </div>
              </div>

              {/* Options: Paper Size & Duplex */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Paper Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['A4', 'Legal', 'A3'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPaperSize(size)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          paperSize === size
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Sides
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsDoubleSided(false)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        !isDoubleSided
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Single Sided
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDoubleSided(true)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        isDoubleSided
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Double Sided
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Finishing Checkboxes */}
              <div className="pt-2 border-t border-slate-200/80 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Add Document Finishing
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBinding}
                      onChange={(e) => setIncludeBinding(e.target.checked)}
                      className="mt-0.5 rounded text-blue-700 focus:ring-blue-700 h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Spiral Binding (+₹30/set)</span>
                      <span className="text-[11px] text-slate-500">Transparent front &amp; rigid back cover</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLamination}
                      onChange={(e) => setIncludeLamination(e.target.checked)}
                      className="mt-0.5 rounded text-blue-700 focus:ring-blue-700 h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Lamination (+₹20/sheet)</span>
                      <span className="text-[11px] text-slate-500">Glossy thermal waterproof film</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right side: Calculation Breakdown & WhatsApp dispatch */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-700" />
                  Order Summary
                </h4>

                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Job Type:</span>
                    <span className="font-semibold text-slate-900">
                      {printType === 'bw-xerox' ? 'B/W Xerox' : printType === 'color' ? 'Color Print' : 'B/W Print'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Paper Size:</span>
                    <span className="font-semibold text-slate-900">{paperSize}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Pages &amp; Sets:</span>
                    <span className="font-semibold text-slate-900">{pages} pgs × {copies} set</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span>Printing Style:</span>
                    <span className="font-semibold text-slate-900">
                      {isDoubleSided ? 'Double-sided' : 'Single-sided'}
                    </span>
                  </div>
                  {includeBinding && (
                    <div className="flex justify-between py-1 border-b border-slate-200 text-blue-800">
                      <span>Spiral Binding ({copies}x):</span>
                      <span className="font-semibold">+₹{30 * copies}</span>
                    </div>
                  )}
                  {includeLamination && (
                    <div className="flex justify-between py-1 border-b border-slate-200 text-blue-800">
                      <span>Lamination ({laminationCount}x):</span>
                      <span className="font-semibold">+₹{20 * laminationCount}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between text-emerald-900">
                    <span className="text-xs font-semibold">Total Estimated Cost:</span>
                    <span className="text-xl font-extrabold font-mono text-emerald-700">₹{estimatedTotal}</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 mt-1">
                    *Final price confirmed on WhatsApp before printing begins.
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 space-y-2">
                <button
                  type="button"
                  onClick={handleSendEstimateWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Send Estimate to WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <span>Or Request a Custom Quote Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Edit Prices Modal for the Shop Owner */}
      {isEditingPrices && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">Edit Shop Rates</h3>
                <p className="text-xs text-slate-500">Update sample prices displayed on {business.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingPrices(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="py-4 space-y-3">
              {tempPrices.map((item, index) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900">{item.service}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.unit}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-0.5">Display Rate Text</label>
                      <input
                        type="text"
                        value={item.rate}
                        onChange={(e) => {
                          const updated = [...tempPrices];
                          updated[index] = { ...item, rate: e.target.value };
                          setTempPrices(updated);
                        }}
                        className="w-full text-xs font-semibold p-1.5 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-0.5">Numeric Base (₹ for calc)</label>
                      <input
                        type="number"
                        value={item.numericRate}
                        onChange={(e) => {
                          const updated = [...tempPrices];
                          updated[index] = { ...item, numericRate: parseFloat(e.target.value) || 1 };
                          setTempPrices(updated);
                        }}
                        className="w-full text-xs font-semibold p-1.5 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditingPrices(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePrices}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
