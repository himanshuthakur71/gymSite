import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { data } = await locals.supabase
		.from('employees')
		.select('*')
		.eq('id', params.employee_id)
		.single();
	return { employee: data ?? null };
};

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		const fd = await request.formData();
		const permissions = {
			members: fd.get('perm_members') === 'on',
			plans: fd.get('perm_plans') === 'on',
			batch: fd.get('perm_batch') === 'on',
			gallery: fd.get('perm_gallery') === 'on',
			reports: fd.get('perm_reports') === 'on'
		};

		const fields: Record<string, any> = {
			first_name: fd.get('first_name'),
			last_name: fd.get('last_name'),
			email: (fd.get('email') as string)?.trim().toLowerCase(),
			phone: fd.get('phone'),
			role: fd.get('role'),
			salary: fd.get('salary'),
			joining_date: fd.get('joining_date'),
			status: fd.get('status'),
			notes: fd.get('notes'),
			permissions
		};

		// Only update password if a new one was provided
		const newPassword = fd.get('password') as string;
		if (newPassword && newPassword.length >= 6) {
			fields.password_hash = await bcrypt.hash(newPassword, 10);
		} else if (newPassword && newPassword.length > 0) {
			return fail(400, { error: 'New password must be at least 6 characters' });
		}

		const { error } = await locals.supabase
			.from('employees')
			.update(fields)
			.eq('id', params.employee_id);

		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/dashboard/employee');
	},

	delete: async ({ locals, params }) => {
		const { error } = await locals.supabase
			.from('employees')
			.delete()
			.eq('id', params.employee_id);
		if (error) return fail(500, { error: error.message });
		redirect(303, '/admin/dashboard/employee');
	}
};
