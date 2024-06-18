import { supabase } from '$lib/supabaseClient';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		let { data: gym_batches, error } = await supabase
			.from('gym_batches')
			.select('*')
			.order('id', { ascending: true });

		if (gym_batches) {
			return {
				gym_batches: gym_batches
			};
		}
	} catch {
		return {
			gym_batches: []
		};
	}
};
