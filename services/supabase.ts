import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnvVar = (name: string): string => {
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name] as string;
  }
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[name]) {
    // @ts-ignore
    return import.meta.env[name] as string;
  }
  return '';
};

const DEFAULT_URL = 'https://gzcaxaeeqtahcadmmkxo.supabase.co';
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6Y2F4YWVlcXRhaGNhZG1ta3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MDMyNjUsImV4cCI6MjA5NTI3OTI2NX0.OnN6Kw0YR1bqwSC3J_qvSiK2W0Qn8-3UGWsZJKskPio';

// Robust validation helpers
const isJWT = (s: string) => s && s.startsWith('ey') && s.split('.').length === 3;
const isSupabaseUrl = (s: string) => s && (s.includes('.supabase.co') || s.startsWith('http'));

// Logic to identify the URL and JWT Key regardless of which environment variable they are in
let envUrl = '';
let envKey = '';

const candidates = [
  getEnvVar('VITE_SUPABASE_URL'),
  getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  getEnvVar('VITE_SUPABASE_ANON_KEY'),
  getEnvVar('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
].map(v => v.trim()).filter(Boolean);

// Find the URL
envUrl = candidates.find(isSupabaseUrl) || '';
// Find the JWT Key
envKey = candidates.find(isJWT) || '';

// Final fallbacks if missing or invalid
if (!envUrl) {
  console.warn("Supabase Config: Valid URL not found in environment, using default.");
  envUrl = DEFAULT_URL;
}

if (!envKey) {
  console.warn("Supabase Config: Valid JWT Key not found in environment, using default.");
  envKey = DEFAULT_KEY;
}

let supabaseUrl = envUrl;
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

// Strip /rest/v1 if it was provided
if (supabaseUrl.includes('/rest/v1')) {
    supabaseUrl = supabaseUrl.split('/rest/v1')[0];
}

const supabaseAnonKey = envKey;
console.log("Supabase initialization:");
console.log("- URL:", supabaseUrl);
console.log("- Key Length:", supabaseAnonKey?.length);
console.log("- Key Preview:", supabaseAnonKey ? (supabaseAnonKey.substring(0, 5) + "..." + supabaseAnonKey.substring(supabaseAnonKey.length - 5)) : "N/A");

let client: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the Settings menu (Environment Variables).'
      );
    }
    
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
};
