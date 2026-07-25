import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/getDb';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const db = getDb(locals);
	const [m, b, p] = await Promise.all([
		db.from('members').select('*').eq('id', params.member_id).single(),
		db.from('gym_batches').select('*').order('id', { ascending: true }),
		db.from('gym_plans').select('*').order('plan_id', { ascending: true })
	]);
	return { member: m.data ?? null, gym_batches: b.data ?? [], gym_plans: p.data ?? [] };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const db = getDb(locals);
		const fd = await request.formData();

		// Fetch current member to compare old vs new values
		const { data: old } = await db.from('members').select('*').eq('id', params.member_id).single();

		const newFeePm = Number(fd.get('fee_pm') ?? 0);
		const newJoiningDate = fd.get('joining_date') as string;
		const newEndDate = fd.get('end_date') as string;
		const newStatus = fd.get('status') as string;

		const isRenewal = !!old && old.joining_date !== newJoiningDate;

		// Preserve existing payment totals unless renewing
		const feeReceived = isRenewal ? 0 : Number(old?.fee_received ?? 0);
		const dueAmount = Math.max(0, newFeePm - feeReceived);

		const fields: Record<string, any> = {
			first_name: fd.get('first_name'),
			last_name: fd.get('last_name'),
			phone_number: fd.get('phone_number'),
			email: fd.get('email'),
			gender: fd.get('gender'),
			joining_date: newJoiningDate,
			end_date: newEndDate,
			aadhar_number: fd.get('aadhar_number'),
			age: fd.get('age'),
			gym_time: fd.get('gym_time'),
			fee_pm: newFeePm,
			fee_received: feeReceived,
			father_name: fd.get('father_name'),
			mother_name: fd.get('mother_name'),
			address: fd.get('address'),
			status: newStatus,
			is_paid: dueAmount <= 0,
			due_amount: dueAmount
		};

		const { error } = await db.from('members').update(fields).eq('id', params.member_id);
		if (error) return fail(500, { error: error.message });

		const recordedBy = locals.employee
			? `${locals.employee.first_name} ${locals.employee.last_name}`
			: 'Admin';

		const historyRows: any[] = [];

		if (isRenewal) {
			historyRows.push({
				member_id: params.member_id,
				event_type: 'renewed',
				description: `Renewed — ₹${newFeePm} from ${newJoiningDate} to ${newEndDate}`,
				meta: {
					old_joining_date: old?.joining_date,
					new_joining_date: newJoiningDate,
					old_end_date: old?.end_date,
					new_end_date: newEndDate,
					fee_pm: newFeePm
				},
				recorded_by: recordedBy
			});
		}

		if (old && old.status !== newStatus) {
			if (newStatus === 'in-active') {
				historyRows.push({
					member_id: params.member_id,
					event_type: 'left',
					description: 'Status changed to In-Active',
					meta: { old_status: old.status },
					recorded_by: recordedBy
				});
			} else if (newStatus === 'active' && old.status === 'in-active') {
				historyRows.push({
					member_id: params.member_id,
					event_type: 'rejoined',
					description: 'Status changed back to Active',
					meta: { old_status: old.status },
					recorded_by: recordedBy
				});
			}
		}

		if (old && String(old.fee_pm) !== String(newFeePm) && !isRenewal) {
			historyRows.push({
				member_id: params.member_id,
				event_type: 'plan_changed',
				description: `Plan fee changed from ₹${old.fee_pm} to ₹${newFeePm}`,
				meta: { old_fee_pm: old.fee_pm, new_fee_pm: newFeePm },
				recorded_by: recordedBy
			});
		}

		if (historyRows.length > 0) {
			await db.from('member_history').insert(historyRows);
		}

		// After renewal, go to view page and open payment modal
		if (isRenewal) {
			redirect(303, `/admin/dashboard/member/view/${params.member_id}?openPayment=1`);
		}
		redirect(303, '/admin/dashboard/member');
	},

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
