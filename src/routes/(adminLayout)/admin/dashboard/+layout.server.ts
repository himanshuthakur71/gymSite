import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const today = new Date();
	const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

	function getTodayDate() {
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	const [todayExpricesmembers, todayMembers, weekMembers, monthMembers] = await Promise.all([
		locals.supabase.from('members').select('*').eq('end_date', getTodayDate()).then(({ data }) => data ?? []),

		locals.supabase
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0).toISOString())
			.lte('created_at', todayEnd.toISOString())
			.then(({ data }) => data ?? []),

		locals.supabase
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()).toISOString())
			.lte('created_at', todayEnd.toISOString())
			.then(({ data }) => data ?? []),

		locals.supabase
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), 1).toISOString())
			.lte('created_at', todayEnd.toISOString())
			.then(({ data }) => data ?? [])
	]);

	return { todayExpricesmembers, todayMembers, weekMembers, monthMembers };
};
