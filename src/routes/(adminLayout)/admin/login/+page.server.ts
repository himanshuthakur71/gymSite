import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Already logged in — go to dashboard
	if (locals.user) redirect(303, '/admin/dashboard');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) return fail(400, { error: error.message });
		if (!data.session) return fail(400, { error: 'Login failed' });

		redirect(303, '/admin/dashboard');
	}
};
