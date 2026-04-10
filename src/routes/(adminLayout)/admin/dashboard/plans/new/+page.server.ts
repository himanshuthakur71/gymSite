import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const { error } = await db.from('gym_plans').insert([{
			plan_name: fd.get('plan_name'),
			plan_amount: fd.get('plan_amount'),
			plan_time: fd.get('plan_time')
		}]);
		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/dashboard/plans');
	}
};
