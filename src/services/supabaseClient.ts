import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default credentials provided by user
export const DEFAULT_SUPABASE_CONFIG = {
  projectId: 'ryustfqpmbucgkvuvoid',
  url: 'https://ryustfqpmbucgkvuvoid.supabase.co',
  anonKey: 'sb_publishable_7U3wWWRWzztNwCsObD5b9A_3VgsOEea',
  bucketName: 'documents',
};

// Retrieve configured or persisted Supabase details
export function getSupabaseConfig() {
  const saved = localStorage.getItem('abhinaya_supabase_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    } catch {
      // fallback to defaults
    }
  }

  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

  return {
    projectId: DEFAULT_SUPABASE_CONFIG.projectId,
    url: envUrl || DEFAULT_SUPABASE_CONFIG.url,
    anonKey: envKey || DEFAULT_SUPABASE_CONFIG.anonKey,
    bucketName: DEFAULT_SUPABASE_CONFIG.bucketName,
  };
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  const config = getSupabaseConfig();
  if (!supabaseInstance) {
    supabaseInstance = createClient(config.url, config.anonKey);
  }
  return supabaseInstance;
}

export function resetSupabaseClient() {
  supabaseInstance = null;
}

export interface CustomerOrderRecord {
  id?: string;
  created_at?: string;
  name: string;
  phone_number: string;
  service_required: string;
  number_of_copies: string | number;
  paper_size: string;
  color_mode: string;
  required_date: string;
  additional_requirements?: string;
  file_name?: string;
  file_size?: string;
  file_url?: string;
  storage_path?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

/**
 * Upload a customer document (PDF, photo, docx) to Supabase Storage
 * Returns public URL and storage path
 */
export async function uploadDocumentToSupabase(
  file: File,
  customerName: string,
  phoneNumber: string
): Promise<{ success: boolean; fileUrl?: string; storagePath?: string; error?: string }> {
  try {
    const supabase = getSupabaseClient();
    const config = getSupabaseConfig();

    // Sanitize file name and create a unique path
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '').slice(-10) || 'customer';
    const filePath = `${cleanPhone}/${timestamp}_${cleanFileName}`;

    // Target bucket: try primary bucket, fallback to 'uploads' or 'customer-documents'
    const bucketList = [config.bucketName, 'documents', 'customer-documents', 'uploads'];
    let uploadResult: any = null;
    let selectedBucket = config.bucketName;
    let lastError: any = null;

    for (const bName of bucketList) {
      const { data, error } = await supabase.storage
        .from(bName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!error && data) {
        uploadResult = data;
        selectedBucket = bName;
        break;
      } else {
        lastError = error;
      }
    }

    if (!uploadResult) {
      // If bucket does not exist or storage has RLS restrictions
      console.warn('Supabase storage upload attempt error:', lastError);
      return {
        success: false,
        error: lastError?.message || 'Storage bucket upload failed. Ensure a public bucket named "documents" exists in your Supabase project.',
      };
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(selectedBucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      fileUrl: publicData.publicUrl,
      storagePath: filePath,
    };
  } catch (err: any) {
    console.error('Unexpected Supabase upload error:', err);
    return {
      success: false,
      error: err.message || 'Error uploading file to Supabase',
    };
  }
}

/**
 * Save order details to Supabase database table `print_orders`
 * Also stores in local storage as reliable backup
 */
export async function saveOrderToSupabase(
  order: CustomerOrderRecord
): Promise<{ success: boolean; data?: any; error?: string }> {
  // 1. Always backup to local storage first
  try {
    const existingRaw = localStorage.getItem('abhinaya_saved_orders');
    const existing: CustomerOrderRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    const withLocalMeta: CustomerOrderRecord = {
      ...order,
      id: order.id || `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      created_at: order.created_at || new Date().toISOString(),
      status: order.status || 'pending',
    };
    existing.unshift(withLocalMeta);
    localStorage.setItem('abhinaya_saved_orders', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.error('Local backup failed', e);
  }

  // 2. Insert into Supabase table `print_orders`
  try {
    const supabase = getSupabaseClient();
    const payload = {
      name: order.name,
      phone_number: order.phone_number,
      service_required: order.service_required,
      number_of_copies: String(order.number_of_copies),
      paper_size: order.paper_size,
      color_mode: order.color_mode,
      required_date: order.required_date,
      additional_requirements: order.additional_requirements || null,
      file_name: order.file_name || null,
      file_size: order.file_size || null,
      file_url: order.file_url || null,
      storage_path: order.storage_path || null,
      status: order.status || 'pending',
    };

    const { data, error } = await supabase
      .from('print_orders')
      .insert([payload])
      .select();

    if (error) {
      console.warn('Supabase DB table insert error (Table print_orders might not exist yet):', error.message);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    console.error('Error saving order to Supabase:', err);
    return {
      success: false,
      error: err.message || 'Failed to save to database',
    };
  }
}

/**
 * Test Supabase connection
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  storageAvailable: boolean;
  message: string;
}> {
  try {
    const supabase = getSupabaseClient();
    
    // Check storage bucket access
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
    
    // Try pinging or querying print_orders table
    const { error: dbError } = await supabase
      .from('print_orders')
      .select('id')
      .limit(1);

    if (storageError && dbError) {
      return {
        connected: false,
        storageAvailable: false,
        message: `Could not connect: ${storageError.message || dbError?.message}`,
      };
    }

    return {
      connected: true,
      storageAvailable: !storageError,
      message: 'Successfully connected to Supabase project!',
    };
  } catch (err: any) {
    return {
      connected: false,
      storageAvailable: false,
      message: err.message || 'Connection test failed',
    };
  }
}

/**
 * Fetch all orders for the Owner Dashboard (from Supabase + local cache)
 */
export async function fetchAllOrders(): Promise<CustomerOrderRecord[]> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('print_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data as CustomerOrderRecord[];
    }
  } catch (e) {
    console.warn('Failed fetching from Supabase table, using local cache:', e);
  }

  // Fallback to local storage
  const local = localStorage.getItem('abhinaya_saved_orders');
  return local ? JSON.parse(local) : [];
}

/**
 * Update order status (pending, in_progress, completed)
 */
export async function updateOrderStatus(orderId: string, status: 'pending' | 'in_progress' | 'completed' | 'cancelled') {
  try {
    const supabase = getSupabaseClient();
    await supabase.from('print_orders').update({ status }).eq('id', orderId);
  } catch (e) {
    console.error('Could not update status on Supabase', e);
  }

  // Also update local
  try {
    const local = localStorage.getItem('abhinaya_saved_orders');
    if (local) {
      const orders: CustomerOrderRecord[] = JSON.parse(local);
      const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem('abhinaya_saved_orders', JSON.stringify(updated));
    }
  } catch (e) {
    console.error(e);
  }
}
