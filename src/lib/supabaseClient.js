import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://itkrfzkrbqgsscxcveae.supabase.co';
const SUPABASE_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0a3JmemtyYnFnc3NjeGN2ZWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NDk1NzksImV4cCI6MjAzNDEyNTU3OX0.SW7yIOSh2-00s_NAVjhb5jU9bWDbLpq5Ts-0yOWwZcs';

export const supabase = createClient(`${SUPABASE_URL}`, `${SUPABASE_ANON_KEY}`);
