import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const { error } = await db.from('gym_batches').insert([{
			batch_name: fd.get('batch_name'),
			batch_limit: Number(fd.get('batch_limit')),
			batch_open_time: fd.get('batch_open_time'),
			batch_close_time: fd.get('batch_close_time')
		}]);
		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/dashboard/batch');
	}
};
