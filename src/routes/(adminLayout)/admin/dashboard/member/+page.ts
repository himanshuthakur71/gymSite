import { supabase } from '$lib/supabaseClient';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		let { data: members, error } = await supabase
			.from('members')
			.select('*')
			.order('end_date', { ascending: true });

		if (members) {
			return {
				members: members
			};
		}
	} catch {
		return {
			members: []
		};
	}
};
