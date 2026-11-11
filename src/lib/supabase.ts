import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get credentials from environment variables or browser localStorage override
export function getSupabaseCredentials() {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';

  if (envUrl && envKey) {
    return { url: envUrl, key: envKey, source: 'env' as const };
  }

  if (typeof window !== 'undefined') {
    const localUrl = window.localStorage.getItem('rca_supabase_url')?.trim() || '';
    const localKey = window.localStorage.getItem('rca_supabase_anon_key')?.trim() || '';
    if (localUrl && localKey) {
      return { url: localUrl, key: localKey, source: 'local' as const };
    }
  }

  return { url: '', key: '', source: 'none' as const };
}

let cachedClient: SupabaseClient | null = null;
let cachedClientUrl = '';
let cachedClientKey = '';

export function getSupabaseClient(): SupabaseClient | null {
  const { url, key } = getSupabaseCredentials();
  if (!url || !key) return null;

  if (cachedClient && cachedClientUrl === url && cachedClientKey === key) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    cachedClientUrl = url;
    cachedClientKey = key;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export const isSupabaseConfigured = () => Boolean(getSupabaseCredentials().url && getSupabaseCredentials().key);

// Default client getter / instance
export const supabase = typeof window !== 'undefined' ? getSupabaseClient() : (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) : null);

export function saveLocalSupabaseCredentials(url: string, key: string) {
  if (typeof window === 'undefined') return;
  const cleanUrl = url.trim();
  const cleanKey = key.trim();
  if (cleanUrl && cleanKey) {
    window.localStorage.setItem('rca_supabase_url', cleanUrl);
    window.localStorage.setItem('rca_supabase_anon_key', cleanKey);
  } else {
    window.localStorage.removeItem('rca_supabase_url');
    window.localStorage.removeItem('rca_supabase_anon_key');
  }
  cachedClient = null;
  cachedClientUrl = '';
  cachedClientKey = '';
  // Trigger update event across app
  window.dispatchEvent(new Event('rca_storage_updated'));
}
