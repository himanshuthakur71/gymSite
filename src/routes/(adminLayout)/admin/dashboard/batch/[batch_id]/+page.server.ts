import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data: gym_batch } = await locals.supabase
		.from('gym_batches')
		.select('*')
		.eq('id', params.batch_id)
		.single();
	return { gym_batch: gym_batch ?? null };
};
