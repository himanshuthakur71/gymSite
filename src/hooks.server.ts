import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) =>
					event.cookies.set(name, value, { ...options, path: '/' })
				);
			}
		}
	});

	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) return { session: null, user: null };

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) return { session: null, user: null };

		return { session, user };
	};

	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;
	event.locals.employee = null;

	// If no admin session, check for employee session cookie
	if (!user) {
		const empId = event.cookies.get('emp_sid');
		if (empId) {
			const { data: employee } = await supabaseAdmin
				.from('employees')
				.select('*')
				.eq('id', empId)
				.eq('status', 'active')
				.single();

			if (employee) {
				event.locals.employee = employee;
			} else {
				// Stale or invalid cookie — clear it
				event.cookies.delete('emp_sid', { path: '/' });
			}
		}
	}

	const isAuthenticated = !!user || !!event.locals.employee;

	if (event.url.pathname.startsWith('/admin/dashboard') && !isAuthenticated) {
		redirect(303, '/admin/login');
	}

	return resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version'
	});
};
