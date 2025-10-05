import { createClient } from '@supabase/supabase-js';

const rawUrl = ( process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const rawAnon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim();

// Diagnostics (non-sensitive): show whether values are present and the URL value
try {
  // URL is not secret; anon key length is shown without content
  console.log('[env] NEXT_PUBLIC_SUPABASE_URL:', JSON.stringify(rawUrl));
  console.log('[env] NEXT_PUBLIC_SUPABASE_ANON_KEY length:', rawAnon ? rawAnon.length : 0);
} catch {}

if (!rawUrl) {
  throw new Error('Supabase URL is missing. Set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) in .env.local');
}

if (!/^https?:\/\//i.test(rawUrl)) {
  throw new Error('Invalid Supabase URL. It must start with http:// or https://');
}

if (!rawAnon) {
  throw new Error('Supabase anon key is missing. Set NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_ANON_KEY) in .env.local');
}

export const supabase = createClient(rawUrl, rawAnon);
