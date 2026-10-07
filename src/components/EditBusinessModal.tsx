import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  X, 
  Tag, 
  Store, 
  Database, 
  Inbox, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  Copy, 
  Check, 
  MessageSquare, 
  FileText 
} from 'lucide-react';
import { BusinessConfig, PriceItem, INITIAL_BUSINESS_CONFIG, INITIAL_PRICES } from '../data/businessData';
import { 
  getSupabaseConfig, 
  testSupabaseConnection, 
  fetchAllOrders, 
  updateOrderStatus, 
  CustomerOrderRecord 
} from '../services/supabaseClient';

interface EditBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  prices: PriceItem[];
  onSaveConfig: (newConfig: BusinessConfig) => void;
  onSavePrices: (newPrices: PriceItem[]) => void;
}

export const EditBusinessModal: React.FC<EditBusinessModalProps> = ({
  isOpen,
  onClose,
  config,
  prices,
  onSaveConfig,
  onSavePrices,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'rates' | 'orders' | 'supabase'>('info');
  const [formData, setFormData] = useState<BusinessConfig>(config);
  const [priceData, setPriceData] = useState<PriceItem[]>(prices);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Supabase connection state
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [testStatus, setTestStatus] = useState<{ loading: boolean; connected?: boolean; message?: string }>({ loading: false });
  const [copiedSql, setCopiedSql] = useState(false);

  // Orders state
  const [orders, setOrders] = useState<CustomerOrderRecord[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Sync with props whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(config);
      setPriceData(prices);
      setSaveSuccess(false);
      loadOrders();
    }
  }, [isOpen, config, prices]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    const data = await fetchAllOrders();
    setOrders(data);
    setLoadingOrders(false);
  };

  const handleTestConnection = async () => {
    setTestStatus({ loading: true });
    const result = await testSupabaseConnection();
    setTestStatus({
      loading: false,
      connected: result.connected,
      message: result.message,
    });
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onSavePrices(priceData);
    setSaveSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleReset = () => {
    if (activeTab === 'info') {
      setFormData(INITIAL_BUSINESS_CONFIG);
    } else if (activeTab === 'rates') {
      setPriceData(INITIAL_PRICES);
    }
  };

  const handleStatusChange = async (orderId: string | undefined, newStatus: 'pending' | 'in_progress' | 'completed' | 'cancelled') => {
    if (!orderId) return;
    await updateOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const sqlSchemaCode = `-- Supabase Table: print_orders
CREATE TABLE IF NOT EXISTS public.print_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  phone_number text NOT NULL,
  service_required text NOT NULL,
  number_of_copies text DEFAULT '1',
  paper_size text DEFAULT 'A4',
  color_mode text DEFAULT 'Black & White',
  required_date text,
  additional_requirements text,
  file_name text,
  file_size text,
  file_url text,
  storage_path text,
  status text DEFAULT 'pending'
);

-- Enable Row Level Security (allow public insert and select)
ALTER TABLE public.print_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to print_orders" 
ON public.print_orders FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public read of print_orders" 
ON public.print_orders FOR SELECT TO anon USING (true);`;

  const copySqlCode = () => {
    navigator.clipboard.writeText(sqlSchemaCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto flex flex-col justify-between">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Owner Control Panel
                </h3>
                <p className="text-xs text-slate-500">
                  Password verified · {formData.name}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 mt-4 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'info'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Shop Info</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rates')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'rates'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Pricing &amp; Rates</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Orders &amp; Files ({orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('supabase')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'supabase'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Supabase Cloud</span>
            </button>
          </div>

          {/* Form / Tab Body */}
          <div className="py-4">
            
            {/* Tab 1: Shop & Contact Info */}
            {activeTab === 'info' && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Display Phone
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                          phoneRaw: e.target.value.replace(/[^0-9+]/g, ''),
                        })
                      }
                      className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      WhatsApp (Digits: 919480123456)
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappRaw}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappRaw: e.target.value.replace(/[^0-9]/g, ''),
                          whatsapp: e.target.value,
                        })
                      }
                      className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Address Line 2 (Landmarks)
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Weekday Hours
                    </label>
                    <input
                      type="text"
                      value={formData.openingHoursWeekdays}
                      onChange={(e) => setFormData({ ...formData, openingHoursWeekdays: e.target.value })}
                      className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Sunday Hours
                    </label>
                    <input
                      type="text"
                      value={formData.openingHoursSunday}
                      onChange={(e) => setFormData({ ...formData, openingHoursSunday: e.target.value })}
                      className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-700 outline-none"
                    />
                  </div>
                </div>

                {saveSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center font-medium">
                    ✓ Settings saved successfully!
                  </div>
                )}
              </form>
            )}

            {/* Tab 2: Rates & Prices */}
            {activeTab === 'rates' && (
              <form onSubmit={handleSubmit} className="space-y-3 animate-in fade-in duration-150">
                <p className="text-xs text-slate-500 mb-2">
                  Update base prices shown on cards and calculated in the live cost estimator.
                </p>
                {priceData.map((item, index) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900">{item.service}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.unit}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Display Rate</label>
                        <input
                          type="text"
                          value={item.rate}
                          onChange={(e) => {
                            const updated = [...priceData];
                            updated[index] = { ...item, rate: e.target.value };
                            setPriceData(updated);
                          }}
                          className="w-full text-xs font-semibold p-1.5 bg-white border border-slate-200 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Numeric Base (₹)</label>
                        <input
                          type="number"
                          value={item.numericRate}
                          onChange={(e) => {
                            const updated = [...priceData];
                            updated[index] = { ...item, numericRate: parseFloat(e.target.value) || 1 };
                            setPriceData(updated);
                          }}
                          className="w-full text-xs font-semibold p-1.5 bg-white border border-slate-200 rounded-md font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            )}

            {/* Tab 3: Customer Orders & Files */}
            {activeTab === 'orders' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <p className="text-xs text-slate-600">
                    Incoming customer print requests &amp; uploaded documents.
                  </p>
                  <button
                    type="button"
                    onClick={loadOrders}
                    disabled={loadingOrders}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-medium">No customer orders recorded yet.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      When customers submit files through the quote form, they will appear here and in Supabase.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {orders.map((ord, idx) => (
                      <div
                        key={ord.id || idx}
                        className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-900 text-sm">{ord.name}</span>
                            <span className="text-slate-400 font-mono text-[11px] ml-2">📞 {ord.phone_number}</span>
                          </div>
                          
                          {/* Status badge / selector */}
                          <select
                            value={ord.status || 'pending'}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border outline-none ${
                              ord.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : ord.status === 'in_progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="text-slate-600 grid grid-cols-2 gap-1 text-[11px]">
                          <div><span className="text-slate-400">Service:</span> {ord.service_required}</div>
                          <div><span className="text-slate-400">Format:</span> {ord.paper_size} ({ord.color_mode})</div>
                          <div><span className="text-slate-400">Copies:</span> {ord.number_of_copies}</div>
                          <div><span className="text-slate-400">Date:</span> {ord.required_date}</div>
                        </div>

                        {ord.additional_requirements && (
                          <p className="text-[11px] text-slate-500 bg-white p-1.5 rounded border border-slate-200">
                            <strong>Note:</strong> {ord.additional_requirements}
                          </p>
                        )}

                        {/* File Link in Supabase Storage */}
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          {ord.file_url ? (
                            <a
                              href={ord.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-blue-700 font-bold hover:underline text-[11px]"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View / Download File ({ord.file_name || 'Document'})</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : ord.file_name ? (
                            <span className="text-slate-500 text-[11px] flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              <span>{ord.file_name}</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">No file attached</span>
                          )}

                          <a
                            href={`https://wa.me/${ord.phone_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${ord.name}, this is Abhinaya.com regarding your print order.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-[11px] font-bold"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp Customer</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Supabase Connection Details & Storage Setup */}
            {activeTab === 'supabase' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-xs font-bold text-emerald-950 font-heading">
                      Connected Supabase Project
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Your website is linked to your Supabase project for customer document storage and order persistence.
                  </p>

                  <div className="mt-3 pt-3 border-t border-emerald-200/60 space-y-1 font-mono text-[11px] text-slate-700">
                    <div>
                      <span className="text-slate-500 font-sans">Project ID: </span>
                      <strong>{supabaseConfig.projectId}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-sans">Project URL: </span>
                      <span className="text-blue-700 break-all">{supabaseConfig.url}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-sans">API Key: </span>
                      <span className="text-slate-500">sb_publishable_***OEea (Active)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-sans">Storage Bucket: </span>
                      <strong>documents</strong>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={testStatus.loading}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      {testStatus.loading ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Test Supabase Connection</span>
                        </>
                      )}
                    </button>

                    {testStatus.message && (
                      <span className={`text-xs font-medium ${testStatus.connected ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {testStatus.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* SQL Table Creation Helper */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Supabase SQL Schema (print_orders table)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Run this in your Supabase SQL Editor if you haven't created the table yet.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={copySqlCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      {copiedSql ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy SQL</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-[10px] font-mono bg-slate-950 text-slate-300 p-3 rounded-xl overflow-x-auto max-h-36">
                    {sqlSchemaCode}
                  </pre>
                </div>

                {/* Storage Bucket Setup Instructions */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                  <p className="font-bold">📁 Supabase Storage Setup:</p>
                  <p className="text-[11px] text-blue-800">
                    1. Go to your Supabase Dashboard &gt; <strong>Storage</strong> &gt; <strong>Create Bucket</strong>.
                  </p>
                  <p className="text-[11px] text-blue-800">
                    2. Name the bucket <strong>documents</strong> and check <strong>Public bucket</strong> so file links can be shared on WhatsApp.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Close
            </button>
            {(activeTab === 'info' || activeTab === 'rates') && (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
