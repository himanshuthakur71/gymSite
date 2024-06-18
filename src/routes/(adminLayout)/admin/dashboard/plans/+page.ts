import { supabase } from '$lib/supabaseClient';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		let { data: gym_plans, error } = await supabase
			.from('gym_plans')
			.select('*')
			.order('plan_id', { ascending: true });

		if (gym_plans) {
			return {
				gym_plans: gym_plans
			};
		}
	} catch {
		return {
			gym_plans: []
		};
	}
};
