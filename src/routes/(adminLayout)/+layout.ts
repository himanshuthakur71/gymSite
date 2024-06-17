import { supabase } from '$lib/supabaseClient';

import type { LayoutLoad } from './admin/$types';

export const load: LayoutLoad = async () => {
	const getSession = async () => {
		const { data, error } = await supabase.auth.getSession();
		if (data?.session?.user) {
			return data;
		} else {
			return false;
		}
	};
	return {
		session: await getSession()
	};
};
