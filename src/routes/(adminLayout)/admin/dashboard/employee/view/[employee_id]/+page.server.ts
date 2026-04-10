import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data } = await locals.supabase
		.from('employees')
		.select('*')
		.eq('id', params.employee_id)
		.single();
	return { employee: data ?? null };
};
