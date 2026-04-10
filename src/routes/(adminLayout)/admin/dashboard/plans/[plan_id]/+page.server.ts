import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const db = getDb(locals);
	const { data } = await db.from('gym_plans').select('*').eq('plan_id', params.plan_id).single();
	return { gym_plan: data ?? null };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const { error } = await db
			.from('gym_plans')
			.update({
				plan_name: fd.get('plan_name'),
				plan_amount: fd.get('plan_amount'),
				plan_time: fd.get('plan_time')
			})
			.eq('plan_id', params.plan_id);
		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/dashboard/plans');
	}
};
