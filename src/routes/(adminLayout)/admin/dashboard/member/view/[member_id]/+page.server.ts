import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const [m, p] = await Promise.all([
		locals.supabase.from('members').select('*').eq('id', params.member_id).single(),
		locals.supabase.from('gym_plans').select('*')
	]);
	return { member: m.data ?? null, gym_plans: p.data ?? [] };
};
