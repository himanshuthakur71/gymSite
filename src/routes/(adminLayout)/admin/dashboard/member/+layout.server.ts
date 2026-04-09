import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const [gym_batches, gym_plans] = await Promise.all([
		locals.supabase.from('gym_batches').select('*').order('id', { ascending: true }).then(({ data }) => data ?? []),
		locals.supabase.from('gym_plans').select('*').order('plan_id', { ascending: true }).then(({ data }) => data ?? [])
	]);
	return { gym_batches, gym_plans };
};
