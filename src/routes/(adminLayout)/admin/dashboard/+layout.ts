import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async () => {
	try {
		const { data, error } = await supabase.auth.getSession();
		if (!data?.session?.user) {
			redirect(301, '/admin/login');
		}
	} catch (err) {
		console.log(err);
	}
};
