import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data } = await locals.supabase
		.from('employees')
		.select('*')
		.order('created_at', { ascending: false });
	return { employees: data ?? [] };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const fd = await request.formData();
		const { error } = await locals.supabase
			.from('employees')
			.delete()
			.eq('id', fd.get('id'));
		if (error) return fail(500, { error: error.message });
		return { success: true };
	}
};
