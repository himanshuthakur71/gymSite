import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: gym_plans } = await locals.supabase
		.from('gym_plans')
		.select('*')
		.order('plan_id', { ascending: true });
	return { gym_plans: gym_plans ?? [] };
};
