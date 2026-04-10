import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const fd = await request.formData();
		const password = fd.get('password') as string;

		if (!password || password.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters' });
		}

		const password_hash = await bcrypt.hash(password, 10);

		const permissions = {
			members: fd.get('perm_members') === 'on',
			plans: fd.get('perm_plans') === 'on',
			batch: fd.get('perm_batch') === 'on',
			gallery: fd.get('perm_gallery') === 'on',
			reports: fd.get('perm_reports') === 'on'
		};

		const { error } = await locals.supabase.from('employees').insert([{
			first_name: fd.get('first_name'),
			last_name: fd.get('last_name'),
			email: (fd.get('email') as string)?.trim().toLowerCase(),
			phone: fd.get('phone'),
			role: fd.get('role'),
			salary: fd.get('salary'),
			joining_date: fd.get('joining_date'),
			status: fd.get('status'),
			notes: fd.get('notes'),
			permissions,
			password_hash
		}]);

		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/dashboard/employee');
	}
};
