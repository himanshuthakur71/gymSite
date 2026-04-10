import { supabaseAdmin } from './supabaseAdmin';

/**
 * Returns the right Supabase client for the current session:
 * - Admin (Supabase Auth): use locals.supabase (respects RLS with user JWT)
 * - Employee (cookie session): use supabaseAdmin (bypasses RLS server-side)
 */
export function getDb(locals: App.Locals) {
	return locals.user ? locals.supabase : supabaseAdmin;
}
