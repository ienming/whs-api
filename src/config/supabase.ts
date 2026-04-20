import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Cannot initialize Supabase client: SUPABASE_URL and SUPABASE_KEY must be set in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);