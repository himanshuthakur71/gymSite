import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const db = getDb(locals);
	const { data } = await db.from('gym_plans').select('*').order('plan_id', { ascending: true });
	return { gym_plans: data ?? [] };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const id = fd.get('id') as string;
		const { error } = await db.from('gym_plans').delete().eq('plan_id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
