import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const { data } = await supabase.auth.getSession();
	if (data?.session?.user) {
		redirect(301, '/admin/dashboard');
	}
}
