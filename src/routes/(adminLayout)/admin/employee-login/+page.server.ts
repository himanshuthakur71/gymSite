import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Already authenticated — send to dashboard
	if (locals.user || locals.employee) {
		redirect(303, '/admin/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const fd = await request.formData();
		const email = (fd.get('email') as string)?.trim().toLowerCase();
		const password = fd.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required' });
		}

		const { data: employee, error } = await supabaseAdmin
			.from('employees')
			.select('*')
			.eq('email', email)
			.eq('status', 'active')
			.single();

		if (error || !employee || !employee.password_hash) {
			return fail(400, { error: 'Invalid email or password' });
		}

		const valid = await bcrypt.compare(password, employee.password_hash);
		if (!valid) {
			return fail(400, { error: 'Invalid email or password' });
		}

		cookies.set('emp_sid', String(employee.id), {
			path: '/',
			httpOnly: true,
			secure: false, // set true in production with HTTPS
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		redirect(303, '/admin/dashboard');
	}
};
