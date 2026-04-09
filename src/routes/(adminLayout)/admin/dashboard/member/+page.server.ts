import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: members } = await locals.supabase
		.from('members')
		.select('*')
		.order('end_date', { ascending: true });
	return { members: members ?? [] };
};
