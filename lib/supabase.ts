import { createClient } from '@supabase/supabase-js';

const rawUrl = ( process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const rawAnon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim();

// Diagnostics (non-sensitive): show whether values are present and the URL value


export const supabase = createClient(rawUrl, rawAnon);
