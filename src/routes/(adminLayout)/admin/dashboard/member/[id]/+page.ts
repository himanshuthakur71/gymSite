import { supabase } from '$lib/supabaseClient';

export const load: any = async ({ params }) => {
	try {
		let { data: member, error } = await supabase
			.from('members')
			.select('*')
			.eq('id', params.id)
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
