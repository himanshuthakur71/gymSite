import { supabase } from '$lib/supabaseClient';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './admin/$types';

export const load: LayoutLoad = async () => {
	const getSession = async () => {
		const { data, error } = await supabase.auth.getSession();
		if (data) {
			return data;
		} else {
			return false;
		}
	};
	return {
		session: await getSession()
	};
};
