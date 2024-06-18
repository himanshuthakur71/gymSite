import { supabase } from '$lib/supabaseClient';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const getAllBatches = async () => {
		try {
			let { data: gym_batches, error } = await supabase
				.from('gym_batches')
				.select('*')
				.order('id', { ascending: true });

			if (gym_batches) {
				return gym_batches;
			}
		} catch {
			return [];
		}
	};

	const getAllPlans = async () => {
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
		gym_batches: await getAllBatches(),
		gym_plans: await getAllPlans()
	};
};
