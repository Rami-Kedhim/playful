
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://projecturl.supabase.co'; // Replace with actual URL or environment variable
const supabaseAnonKey = 'public-anon-key'; // Replace with actual anon key or env var

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
