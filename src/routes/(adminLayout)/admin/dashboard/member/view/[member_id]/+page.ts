import { supabase } from '$lib/supabaseClient';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		let { data: member, error } = await supabase
			.from('members')
			.select('*')
			.eq('id', params.member_id)
			.single();

		if (member) {
			return {
				member: member
			};
		}
	} catch {
		return {
			member: null
		};
	}
};
