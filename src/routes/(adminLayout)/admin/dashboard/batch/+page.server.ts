import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: gym_batches } = await locals.supabase
		.from('gym_batches')
		.select('*')
		.order('id', { ascending: true });
	return { gym_batches: gym_batches ?? [] };
};
