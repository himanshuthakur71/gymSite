import { supabase } from '$lib/supabaseClient';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		let { data: gym_plan, error } = await supabase
			.from('gym_plans')
			.select('*')
			.eq('plan_id', params.plan_id)
			.single();

		if (gym_plan) {
			return {
				gym_plan: gym_plan
			};
		}
	} catch {
		return {
			gym_plans: null
		};
	}
};
