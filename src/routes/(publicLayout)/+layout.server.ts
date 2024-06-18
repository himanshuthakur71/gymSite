import { supabase } from '$lib/supabaseClient';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const getGymPlans = async () => {
		try {
			let { data: gym_plans, error } = await supabase
				.from('gym_plans')
				.select('*')
				.order('plan_id', { ascending: true });

			if (gym_plans) {
				return gym_plans;
			}
		} catch {
			return [];
		}
	};

	return {
		gymPlans: await getGymPlans()
	};
};
