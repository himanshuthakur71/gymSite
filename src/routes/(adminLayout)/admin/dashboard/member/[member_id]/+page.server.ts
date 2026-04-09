import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: member } = await locals.supabase
		.from('members')
		.select('*')
		.eq('id', params.member_id)
		.single();
	return { member: member ?? null };
};
