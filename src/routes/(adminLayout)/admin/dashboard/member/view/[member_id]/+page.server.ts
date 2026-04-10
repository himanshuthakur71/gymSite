import { getDb } from '$lib/server/getDb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const db = getDb(locals);
	const [m, p] = await Promise.all([
		db.from('members').select('*').eq('id', params.member_id).single(),
		db.from('gym_plans').select('*')
	]);
	return { member: m.data ?? null, gym_plans: p.data ?? [] };
};
