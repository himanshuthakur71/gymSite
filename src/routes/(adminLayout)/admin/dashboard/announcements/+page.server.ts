import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data } = await locals.supabase
		.from('announcements')
		.select('*')
		.order('created_at', { ascending: false });
	return { announcements: data ?? [] };
};
