import { fail, redirect } from '@sveltejs/kit';
import { sendWelcomeEmail } from '$lib/server/email';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [b, p] = await Promise.all([
		locals.supabase.from('gym_batches').select('*').order('id', { ascending: true }),
		locals.supabase.from('gym_plans').select('*').order('plan_id', { ascending: true })
	]);
	return { gym_batches: b.data ?? [], gym_plans: p.data ?? [] };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const fd = await request.formData();
		const fields = {
			first_name: fd.get('first_name'),
			last_name: fd.get('last_name'),
			phone_number: fd.get('phone_number'),
			email: fd.get('email'),
			gender: fd.get('gender'),
			joining_date: fd.get('joining_date'),
			end_date: fd.get('end_date'),
			aadhar_number: fd.get('aadhar_number'),
			age: fd.get('age'),
			gym_time: fd.get('gym_time'),
			fee_pm: fd.get('fee_pm'),
			fee_received: fd.get('fee_received'),
			father_name: fd.get('father_name'),
			mother_name: fd.get('mother_name'),
			address: fd.get('address'),
			status: fd.get('status'),
			is_paid: fd.get('fee_pm') === fd.get('fee_received'),
			due_amount: Number(fd.get('fee_pm')) - Number(fd.get('fee_received'))
		};
		const { data, error } = await locals.supabase.from('members').insert([fields]).select().single();
		if (error) return fail(500, { error: error.message, fields });
		// send welcome email - fire and forget
		if (data?.email) {
			const plan = fd.get('plan_name') as string;
			sendWelcomeEmail(data, plan).catch(console.error);
		}
		redirect(303, '/admin/dashboard/member');
	}
};
