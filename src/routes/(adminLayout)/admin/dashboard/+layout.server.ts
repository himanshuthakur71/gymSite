import { redirect } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import type { LayoutServerLoad } from './$types';

// Modules that require a specific permission key (employees only)
const MODULE_PERMS: Record<string, string> = {
	'/admin/dashboard/member': 'members',
	'/admin/dashboard/plans': 'plans',
	'/admin/dashboard/batch': 'batch',
	'/admin/dashboard/gallery': 'gallery'
};

// Routes restricted to admin only (employees never access these)
const ADMIN_ONLY = [
	'/admin/dashboard/employee',
	'/admin/dashboard/announcements',
	'/admin/dashboard/notifications'
];

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const { employee, user } = locals;
	const isAdmin = !!user;
	const path = url.pathname;

	// Enforce permissions for employee sessions
	if (!isAdmin && employee) {
		const perms: Record<string, boolean> = employee.permissions ?? {};

		// Block admin-only routes
		if (ADMIN_ONLY.some((r) => path.startsWith(r))) {
			redirect(303, '/admin/dashboard');
		}

		// Block module routes without permission
		for (const [route, perm] of Object.entries(MODULE_PERMS)) {
			if (path.startsWith(route) && !perms[perm]) {
				redirect(303, '/admin/dashboard');
			}
		}
	}

	const today = new Date();
	const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
	const todayStr = today.toISOString().split('T')[0];
	const in7 = new Date(today);
	in7.setDate(today.getDate() + 7);
	const in7Str = in7.toISOString().split('T')[0];

	function getTodayDate() {
		return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
	}

	// Employees have no Supabase auth session — use service-role client to bypass RLS
	const db = isAdmin ? locals.supabase : supabaseAdmin;

	const [
		todayExpRes,
		todayNewRes,
		weekNewRes,
		monthNewRes,
		expiredRes,
		expiringSoonRes,
		paymentDueRes,
		totalMembersRes
	] = await Promise.all([
		db.from('members').select('*').eq('end_date', getTodayDate()),
		db
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0).toISOString())
			.lte('created_at', todayEnd.toISOString()),
		db
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()).toISOString())
			.lte('created_at', todayEnd.toISOString()),
		db
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), 1).toISOString())
			.lte('created_at', todayEnd.toISOString()),
		db.from('members').select('*').lt('end_date', todayStr).eq('status', 'active'),
		db.from('members').select('*').gte('end_date', todayStr).lte('end_date', in7Str),
		db.from('members').select('*').gt('due_amount', 0),
		db.from('members').select('id', { count: 'exact', head: true })
	]);

	return {
		session: locals.session,
		isAdmin,
		employee: employee ?? null,
		todayExpricesmembers: todayExpRes.data ?? [],
		todayMembers: todayNewRes.data ?? [],
		weekMembers: weekNewRes.data ?? [],
		monthMembers: monthNewRes.data ?? [],
		expiredMembers: expiredRes.data ?? [],
		expiringSoonMembers: expiringSoonRes.data ?? [],
		paymentDueMembers: paymentDueRes.data ?? [],
		totalMembersCount: totalMembersRes.count ?? 0
	};
};
