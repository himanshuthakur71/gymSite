import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const db = getDb(locals);
	const { data } = await db.from('gym_batches').select('*').eq('id', params.batch_id).single();
	return { gym_batch: data ?? null };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const { error } = await db
			.from('gym_batches')
			.update({
				batch_name: fd.get('batch_name'),
				batch_limit: Number(fd.get('batch_limit')),
				batch_open_time: fd.get('batch_open_time'),
				batch_close_time: fd.get('batch_close_time')
			})
			.eq('id', params.batch_id);
		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/dashboard/batch');
	}
};
