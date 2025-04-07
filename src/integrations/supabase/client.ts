
import { createClient } from '@supabase/supabase-js';

// These should be environment variables in production
const supabaseUrl = 'https://haffqtqpbnaviefewfmn.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmZxdHFwYm5hdmllZmV3Zm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMDczNzYsImV4cCI6MjA1MzY4MzM3Nn0.dRqYY5XRNhAoZ1KZAjIz-_eaA9GcR9M3NI5BzQMIMew';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

export default supabase;
