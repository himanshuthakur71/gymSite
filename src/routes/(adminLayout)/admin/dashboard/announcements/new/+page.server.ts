import { fail, redirect } from '@sveltejs/kit';
import { sendAnnouncement } from '$lib/server/email';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [activeRes, allRes] = await Promise.all([
		locals.supabase.from('members').select('id', { count: 'exact', head: true }).eq('status', 'active'),
		locals.supabase.from('members').select('id', { count: 'exact', head: true })
	]);
	return {
		activeCount: activeRes.count ?? 0,
		totalCount: allRes.count ?? 0
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const fd = await request.formData();
		const title = fd.get('title') as string;
		const message = fd.get('message') as string;
		const sendTo = fd.get('send_to') as string; // 'all' | 'active'

		// save announcement
		const { error: insertError } = await locals.supabase
			.from('announcements')
			.insert([{ title, message }]);
		if (insertError) return fail(500, { error: insertError.message });

		// get member emails
		let query = locals.supabase.from('members').select('email');
		if (sendTo === 'active') query = query.eq('status', 'active');
		const { data: members } = await query;
		const emails = (members ?? []).map((m: any) => m.email).filter(Boolean);

		if (emails.length) {
			sendAnnouncement(emails, title, message).catch(console.error);
		}

		redirect(303, '/admin/dashboard/announcements');
	}
};
