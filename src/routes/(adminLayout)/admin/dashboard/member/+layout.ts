import { supabase } from '$lib/supabaseClient';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const getAllMembers = async () => {
		try {
			let { data: members, error } = await supabase.from('members').select('*');

			if (members) {
				return members;
			}
		} catch {
			return [];
		}
	};

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
		members: await getAllMembers(),
		gym_batches: await getAllBatches(),
		gym_plans: await getAllPlans()
	};
};
