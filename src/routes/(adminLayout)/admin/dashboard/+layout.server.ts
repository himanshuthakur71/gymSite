import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const today = new Date();
	const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
	const todayStr = today.toISOString().split('T')[0];
	const in7 = new Date(today);
	in7.setDate(today.getDate() + 7);
	const in7Str = in7.toISOString().split('T')[0];

	function getTodayDate() {
		return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
	}

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
		locals.supabase.from('members').select('*').eq('end_date', getTodayDate()),
		locals.supabase
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0).toISOString())
			.lte('created_at', todayEnd.toISOString()),
		locals.supabase
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()).toISOString())
			.lte('created_at', todayEnd.toISOString()),
		locals.supabase
			.from('members')
			.select('*')
			.gte('created_at', new Date(today.getFullYear(), today.getMonth(), 1).toISOString())
			.lte('created_at', todayEnd.toISOString()),
		locals.supabase.from('members').select('*').lt('end_date', todayStr).eq('status', 'active'),
		locals.supabase.from('members').select('*').gte('end_date', todayStr).lte('end_date', in7Str),
		locals.supabase.from('members').select('*').gt('due_amount', 0),
		locals.supabase.from('members').select('id', { count: 'exact', head: true })
	]);

	return {
		session: locals.session,
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
