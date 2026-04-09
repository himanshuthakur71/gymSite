import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: gym_plan } = await locals.supabase
		.from('gym_plans')
		.select('*')
		.eq('plan_id', params.plan_id)
		.single();
	return { gym_plan: gym_plan ?? null };
};
