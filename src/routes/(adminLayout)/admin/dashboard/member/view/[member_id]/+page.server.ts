import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const db = getDb(locals);
	const [m, p, payments, history] = await Promise.all([
		db.from('members').select('*').eq('id', params.member_id).single(),
		db.from('gym_plans').select('*'),
		db.from('member_payments').select('*').eq('member_id', params.member_id).order('payment_date', { ascending: false }),
		db.from('member_history').select('*').eq('member_id', params.member_id).order('created_at', { ascending: false })
	]);
	return {
		member: m.data ?? null,
		gym_plans: p.data ?? [],
		payments: payments.data ?? [],
		history: history.data ?? []
	};
};

export const actions: Actions = {
	addPayment: async ({ request, locals, params }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const amount = Number(fd.get('amount'));

		if (!amount || amount <= 0) return fail(400, { error: 'Amount must be greater than 0' });

		const recordedBy = locals.employee
			? `${locals.employee.first_name} ${locals.employee.last_name}`
			: 'Admin';

		const paymentDate = (fd.get('payment_date') as string) || new Date().toISOString().split('T')[0];
		const mode = (fd.get('payment_mode') as string) || 'cash';
		const note = (fd.get('note') as string) || null;

		const { error: payErr } = await db.from('member_payments').insert({
			member_id: params.member_id,
			amount,
			payment_date: paymentDate,
			payment_mode: mode,
			note,
			recorded_by: recordedBy
		});
		if (payErr) return fail(500, { error: payErr.message });

		// Update member running totals
		const { data: member } = await db
			.from('members')
			.select('fee_received, due_amount')
			.eq('id', params.member_id)
			.single();

		if (member) {
			const newReceived = Number(member.fee_received) + amount;
			const newDue = Math.max(0, Number(member.due_amount) - amount);
			await db.from('members').update({
				fee_received: newReceived,
				due_amount: newDue,
				is_paid: newDue <= 0
			}).eq('id', params.member_id);
		}

		await db.from('member_history').insert({
			member_id: params.member_id,
			event_type: 'payment_recorded',
			description: `Payment of ₹${amount} received via ${mode}`,
			meta: { amount, payment_date: paymentDate, payment_mode: mode, note },
			recorded_by: recordedBy
		});

		return { success: true };
	}
};
