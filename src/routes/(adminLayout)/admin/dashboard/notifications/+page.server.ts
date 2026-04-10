import { fail } from '@sveltejs/kit';
import { sendExpiryWarning, sendExpiredNotification, sendPaymentDueNotification } from '$lib/server/email';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const today = new Date();
	const todayStr = today.toISOString().split('T')[0];
	const in7 = new Date(today);
	in7.setDate(today.getDate() + 7);
	const in7Str = in7.toISOString().split('T')[0];

	const [expiredRes, expiringSoonRes, paymentDueRes] = await Promise.all([
		locals.supabase.from('members').select('*').lt('end_date', todayStr).eq('status', 'active'),
		locals.supabase.from('members').select('*').gte('end_date', todayStr).lte('end_date', in7Str),
		locals.supabase.from('members').select('*').gt('due_amount', 0)
	]);

	return {
		expired: expiredRes.data ?? [],
		expiringSoon: expiringSoonRes.data ?? [],
		paymentDue: paymentDueRes.data ?? []
	};
};

export const actions: Actions = {
	sendExpiryWarnings: async ({ locals }) => {
		const today = new Date();
		const todayStr = today.toISOString().split('T')[0];
		const in7 = new Date(today);
		in7.setDate(today.getDate() + 7);
		const { data } = await locals.supabase
			.from('members')
			.select('*')
			.gte('end_date', todayStr)
			.lte('end_date', in7.toISOString().split('T')[0]);
		let sent = 0;
		for (const m of data ?? []) {
			const days = Math.ceil((new Date(m.end_date).getTime() - today.getTime()) / 86400000);
			await sendExpiryWarning(m, days).catch(() => {});
			sent++;
		}
		return { success: true, sent };
	},
	sendExpiredNotifications: async ({ locals }) => {
		const todayStr = new Date().toISOString().split('T')[0];
		const { data } = await locals.supabase
			.from('members')
			.select('*')
			.lt('end_date', todayStr)
			.eq('status', 'active');
		let sent = 0;
		for (const m of data ?? []) {
			await sendExpiredNotification(m).catch(() => {});
			sent++;
		}
		return { success: true, sent };
	},
	sendPaymentReminders: async ({ locals }) => {
		const { data } = await locals.supabase
			.from('members')
			.select('*')
			.gt('due_amount', 0);
		let sent = 0;
		for (const m of data ?? []) {
			await sendPaymentDueNotification(m).catch(() => {});
			sent++;
		}
		return { success: true, sent };
	}
};
