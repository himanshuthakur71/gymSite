import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [batchesRes, membersRes] = await Promise.all([
		locals.supabase.from('gym_batches').select('*').order('id', { ascending: true }),
		locals.supabase.from('members').select('gym_time')
	]);

	const gym_batches = batchesRes.data ?? [];
	const members = membersRes.data ?? [];

	// Count members per batch name
	const batchCounts: Record<string, number> = {};
	for (const m of members) {
		if (m.gym_time) {
			batchCounts[m.gym_time] = (batchCounts[m.gym_time] ?? 0) + 1;
		}
	}

	return { gym_batches, batchCounts };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const fd = await request.formData();
		const id = fd.get('id') as string;
		const { error } = await locals.supabase.from('gym_batches').delete().eq('id', id);
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
