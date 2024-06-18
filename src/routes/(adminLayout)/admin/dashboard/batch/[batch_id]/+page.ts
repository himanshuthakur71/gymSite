import { supabase } from '$lib/supabaseClient';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		let { data: gym_batch, error } = await supabase
			.from('gym_batches')
			.select('*')
			.eq('id', params.batch_id)
			.single();

		if (gym_batch) {
			return {
				gym_batch: gym_batch
			};
		}
	} catch {
		return {
			gym_batch: null
		};
	}
};
