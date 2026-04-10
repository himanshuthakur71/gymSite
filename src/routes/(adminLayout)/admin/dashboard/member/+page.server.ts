import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const db = getDb(locals);
	const [membersRes, batchesRes, plansRes] = await Promise.all([
		db.from('members').select('*').order('end_date', { ascending: true }),
		db.from('gym_batches').select('*').order('id', { ascending: true }),
		db.from('gym_plans').select('*').order('plan_id', { ascending: true })
	]);
	return {
		members: membersRes.data ?? [],
		gym_batches: batchesRes.data ?? [],
		gym_plans: plansRes.data ?? []
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const id = fd.get('id') as string;
		const { error } = await db.from('members').delete().eq('id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
