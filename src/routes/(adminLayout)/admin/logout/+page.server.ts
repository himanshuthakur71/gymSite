import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		// Sign out Supabase admin session
		if (locals.user) {
			await locals.supabase.auth.signOut();
		}
		// Clear employee session cookie
		cookies.delete('emp_sid', { path: '/' });

		redirect(303, '/admin/login');
	}
};
