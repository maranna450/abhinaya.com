import React, { useState } from 'react';
import { 
  Send, 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  MessageSquare, 
  ShieldCheck, 
  Loader2, 
  ExternalLink, 
  CloudCheck, 
  Database 
} from 'lucide-react';
import { BusinessConfig } from '../data/businessData';
import { 
  uploadDocumentToSupabase, 
  saveOrderToSupabase, 
  CustomerOrderRecord 
} from '../services/supabaseClient';

interface QuoteFormSectionProps {
  business: BusinessConfig;
  preselectedService?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ 
  business, 
  preselectedService 
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceRequired, setServiceRequired] = useState(preselectedService || 'Xerox & Photocopy');
  const [numberOfCopies, setNumberOfCopies] = useState('1');
  const [paperSize, setPaperSize] = useState('A4');
  const [colorMode, setColorMode] = useState('Black & White');
  const [requiredDate, setRequiredDate] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  // File state
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [selectedFileMeta, setSelectedFileMeta] = useState<{ name: string; size: string } | null>(null);
  
  // Upload & submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<CustomerOrderRecord | null>(null);

  // Update when preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      setServiceRequired(preselectedService);
    }
  }, [preselectedService]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
      setRawFile(file);
      setSelectedFileMeta({
        name: file.name,
        size: `${sizeInMb} MB`,
      });
    }
  };

  const handleRemoveFile = () => {
    setRawFile(null);
    setSelectedFileMeta(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneNumber.trim()) {
      return;
    }

    setIsSubmitting(true);
    let remoteFileUrl: string | undefined = undefined;
    let storagePath: string | undefined = undefined;

    // 1. Upload to Supabase Storage if file is attached
    if (rawFile) {
      setUploadStatusText('Uploading document to Supabase storage...');
      try {
        const uploadResult = await uploadDocumentToSupabase(rawFile, name, phoneNumber);
        if (uploadResult.success && uploadResult.fileUrl) {
          remoteFileUrl = uploadResult.fileUrl;
          storagePath = uploadResult.storagePath;
          setUploadedFileUrl(uploadResult.fileUrl);
        } else {
          console.warn('Supabase storage notice:', uploadResult.error);
        }
      } catch (err) {
        console.error('File upload error:', err);
      }
    }

    // 2. Save order record to Supabase database
    setUploadStatusText('Saving order to Supabase database...');
    const orderPayload: CustomerOrderRecord = {
      name,
      phone_number: phoneNumber,
      service_required: serviceRequired,
      number_of_copies: numberOfCopies,
      paper_size: paperSize,
      color_mode: colorMode,
      required_date: requiredDate || 'As soon as possible',
      additional_requirements: additionalRequirements,
      file_name: selectedFileMeta ? selectedFileMeta.name : undefined,
      file_size: selectedFileMeta ? selectedFileMeta.size : undefined,
      file_url: remoteFileUrl,
      storage_path: storagePath,
      status: 'pending',
    };

    await saveOrderToSupabase(orderPayload);

    setSubmittedData(orderPayload);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedData) return;

    let message = 
      `*New Print Order for ${business.name}*\n\n` +
      `• *Customer Name:* ${submittedData.name}\n` +
      `• *Phone:* ${submittedData.phone_number}\n` +
      `• *Service Required:* ${submittedData.service_required}\n` +
      `• *Copies / Sets:* ${submittedData.number_of_copies}\n` +
      `• *Paper Size:* ${submittedData.paper_size}\n` +
      `• *Color / B&W:* ${submittedData.color_mode}\n` +
      `• *Required Date:* ${submittedData.required_date}\n`;

    if (submittedData.file_url) {
      message += `• *Document Link (Supabase Storage):*\n${submittedData.file_url}\n`;
    } else if (submittedData.file_name) {
      message += `• *File Attached:* ${submittedData.file_name} (${submittedData.file_size})\n`;
    }

    if (submittedData.additional_requirements) {
      message += `• *Notes:* ${submittedData.additional_requirements}\n`;
    }

    message += `\nPlease check my file and confirm the printing price and pickup time.`;

    window.open(
      `https://wa.me/${business.whatsappRaw}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleResetForm = () => {
    setName('');
    setPhoneNumber('');
    setNumberOfCopies('1');
    setAdditionalRequirements('');
    setRawFile(null);
    setSelectedFileMeta(null);
    setUploadedFileUrl(null);
    setSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <section id="quote" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2">
            Supabase Cloud Storage &amp; Direct WhatsApp Booking
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Request a Quote / Send Documents
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Upload your PDF, Word file, or photo to secure cloud storage and share your order specifications directly to WhatsApp.
          </p>
        </div>

        {/* Submission Confirmation State */}
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-10 text-center shadow-md animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-emerald-950 font-heading">
              Thank you! Your request has been received.
            </h3>
            
            <p className="mt-2 text-base text-emerald-800 max-w-lg mx-auto">
              Your order data has been stored. We will contact you shortly on <span className="font-semibold text-emerald-950">{phoneNumber}</span> to confirm your order details and price.
            </p>

            {/* Supabase Storage Link Badge if uploaded */}
            {submittedData?.file_url && (
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-900 text-xs font-medium">
                <CloudCheck className="w-4 h-4 text-blue-700" />
                <span>File stored in Supabase: </span>
                <a
                  href={submittedData.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-blue-800 hover:text-blue-950 flex items-center gap-1"
                >
                  <span>View Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Quick WhatsApp Forwarding Card */}
            <div className="mt-6 p-6 bg-white rounded-2xl border border-emerald-200/90 shadow-sm max-w-lg mx-auto text-left">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Order Snapshot
                </h4>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Ready for WhatsApp
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600">
                <p><span className="font-semibold text-slate-900">Service:</span> {submittedData?.service_required}</p>
                <p><span className="font-semibold text-slate-900">Format:</span> {submittedData?.paper_size} ({submittedData?.color_mode})</p>
                <p><span className="font-semibold text-slate-900">Copies:</span> {submittedData?.number_of_copies} set(s)</p>
                {submittedData?.file_name && (
                  <p><span className="font-semibold text-slate-900">Document:</span> {submittedData.file_name} ({submittedData.file_size})</p>
                )}
                {submittedData?.file_url && (
                  <p className="text-blue-700 break-all font-mono text-[11px] bg-blue-50/70 p-2 rounded-lg border border-blue-100">
                    <span className="font-semibold block text-slate-800 font-sans">Storage URL:</span>
                    {submittedData.file_url}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order &amp; File Link to WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Submit Another
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Quote Form Card */
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative">
            
            {/* Loading Overlay when uploading to Supabase */}
            {isSubmitting && (
              <div className="absolute inset-0 z-30 bg-white/90 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="w-10 h-10 text-blue-700 animate-spin mb-3" />
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Uploading &amp; Connecting to Supabase
                </h4>
                <p className="text-xs text-slate-600 mt-1">{uploadStatusText}</p>
                <p className="text-[11px] text-slate-400 mt-2 font-mono">
                  Project: ryustfqpmbucgkvuvoid
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label htmlFor="quote-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Row 2: Service Required & Copies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="quote-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="quote-service"
                    value={serviceRequired}
                    onChange={(e) => setServiceRequired(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all text-slate-800"
                  >
                    <option value="Xerox & Photocopy">Xerox &amp; Photocopy</option>
                    <option value="Color Printing">Color Printing</option>
                    <option value="Black & White Printing">Black &amp; White Printing</option>
                    <option value="Document Scanning">Document Scanning</option>
                    <option value="Lamination">Lamination</option>
                    <option value="Spiral Binding">Spiral Binding</option>
                    <option value="Passport & ID Photos">Passport &amp; ID Photos</option>
                    <option value="Resume & Document Printing">Resume &amp; Document Printing</option>
                    <option value="Online / Digital Services">Online / Digital Services</option>
                    <option value="Bulk Project / Custom Requirement">Bulk Project / Custom</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-copies" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Number of Copies / Sets
                  </label>
                  <input
                    id="quote-copies"
                    type="number"
                    min="1"
                    value={numberOfCopies}
                    onChange={(e) => setNumberOfCopies(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Paper Size, Color Mode, Required Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="quote-size" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Paper Size
                  </label>
                  <select
                    id="quote-size"
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all text-slate-800"
                  >
                    <option value="A4">A4 (Standard)</option>
                    <option value="Legal">Legal (Office/Court)</option>
                    <option value="A3">A3 (Large)</option>
                    <option value="Photo 4x6">Photo Paper (4x6)</option>
                    <option value="ID Card Size">ID Card Pouch</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-color" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Color / B&amp;W
                  </label>
                  <select
                    id="quote-color"
                    value={colorMode}
                    onChange={(e) => setColorMode(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all text-slate-800"
                  >
                    <option value="Black & White">Black &amp; White</option>
                    <option value="Full Color">Full Color</option>
                    <option value="Mixed (B/W + Color Pages)">Mixed Pages</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Required Date / Time
                  </label>
                  <input
                    id="quote-date"
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Row 4: File Upload to Supabase Storage */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Upload Document File (PDF, DOCX, JPG, PNG)
                  </label>
                  <span className="text-[11px] text-blue-700 font-mono flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    Supabase Connected
                  </span>
                </div>
                
                {selectedFileMeta ? (
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{selectedFileMeta.name}</p>
                        <p className="text-xs text-slate-500">
                          {selectedFileMeta.size} · Will be saved to Supabase storage on submit
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl cursor-pointer bg-white hover:bg-blue-50/20 transition-all p-4 text-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-700">
                      Click to choose file or drag &amp; drop here
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      PDF, Word, or Photo will be uploaded to Supabase Storage
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
                <p className="text-[11px] text-slate-500 mt-1.5">
                  💡 When submitted, a direct download link will be created and formatted for WhatsApp.
                </p>
              </div>

              {/* Row 5: Additional Requirements */}
              <div>
                <label htmlFor="quote-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Additional Requirements / Specific Instructions
                </label>
                <textarea
                  id="quote-notes"
                  rows={3}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="e.g. Spiral binding with blue back cover, first page color, rest black and white, needed by 4:00 PM."
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-700 focus:border-blue-700 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 rounded-xl shadow-md shadow-blue-700/25 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit &amp; Store Document</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const quickText = encodeURIComponent(
                      `Hello ${business.name}, I want to request a quote for ${serviceRequired} (${numberOfCopies} copy/copies, ${paperSize}, ${colorMode}).`
                    );
                    window.open(`https://wa.me/${business.whatsappRaw}?text=${quickText}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Stored securely in Supabase storage and database for Abhinaya.com
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
