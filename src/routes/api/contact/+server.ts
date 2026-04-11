import { json } from '@sveltejs/kit';
import { sendContactEmail } from '$lib/server/email';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { first_name, last_name, email, phone, message, subject } = body;

	if (!first_name || !email || !phone) {
		return json({ error: 'Missing required fields' }, { status: 400 });
	}

	await sendContactEmail({ first_name, last_name, email, phone, message: message || '', subject });

	return json({ success: true });
};
