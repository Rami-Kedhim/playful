
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://haffqtqpbnaviefewfmn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmZxdHFwYm5hdmllZmV3Zm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMDczNzYsImV4cCI6MjA1MzY4MzM3Nn0.dRqYY5XRNhAoZ1KZAjIz-_eaA9GcR9M3NI5BzQMIMew';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
