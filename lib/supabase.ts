import { createClient } from '@supabase/supabase-js';

const rawUrl = '';
const rawAnon = '';

// Diagnostics (non-sensitive): show whether values are present and the URL value


export const supabase = createClient(rawUrl, rawAnon);
