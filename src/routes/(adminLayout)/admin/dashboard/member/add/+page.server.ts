import { fail, redirect } from '@sveltejs/kit';
import { sendWelcomeEmail } from '$lib/server/email';
import { getDb } from '$lib/server/getDb';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const db = getDb(locals);
	const [b, p] = await Promise.all([
		db.from('gym_batches').select('*').order('id', { ascending: true }),
		db.from('gym_plans').select('*').order('plan_id', { ascending: true })
	]);
	return { gym_batches: b.data ?? [], gym_plans: p.data ?? [] };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const db = getDb(locals);
		const fd = await request.formData();
		const feePm = Number(fd.get('fee_pm') ?? 0);
		const joiningDate = fd.get('joining_date') as string;
		const planName = fd.get('plan_name') as string;

		const fields = {
			first_name: fd.get('first_name'),
			last_name: fd.get('last_name'),
			phone_number: fd.get('phone_number'),
			email: fd.get('email'),
			gender: fd.get('gender'),
			joining_date: joiningDate,
			end_date: fd.get('end_date'),
			aadhar_number: fd.get('aadhar_number'),
			age: fd.get('age'),
			gym_time: fd.get('gym_time'),
			fee_pm: feePm,
			fee_received: 0,
			father_name: fd.get('father_name'),
			mother_name: fd.get('mother_name'),
			address: fd.get('address'),
			status: fd.get('status'),
			is_paid: false,
			due_amount: feePm
		};

		const { data, error } = await db.from('members').insert([fields]).select().single();
		if (error) return fail(500, { error: error.message, fields });

		const recordedBy = locals.employee
			? `${locals.employee.first_name} ${locals.employee.last_name}`
			: 'Admin';

		await db.from('member_history').insert({
			member_id: data.id,
			event_type: 'joined',
			description: `Joined with ${planName || 'a plan'} — ₹${feePm}`,
			meta: { plan: planName, fee_pm: feePm, joining_date: joiningDate, end_date: fd.get('end_date') },
			recorded_by: recordedBy
		});

		if (data?.email) {
			sendWelcomeEmail(data, planName).catch(console.error);
		}

		// Redirect to view page and auto-open payment modal
		redirect(303, `/admin/dashboard/member/view/${data.id}?openPayment=1`);
	}
};
