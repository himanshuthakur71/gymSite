import { supabase } from '$lib/supabaseClient';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	function getTodayDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
		const day = String(today.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	const findTodayExpMembers = async () => {
		try {
			let { data: todayExpricesmembers, error } = await supabase
				.from('members')
				.select('*')
				.eq('end_date', getTodayDate());

			if (todayExpricesmembers) {
				return todayExpricesmembers;
			}
		} catch {
			return [];
		}
	};

	return {
		todayExpricesmembers: await findTodayExpMembers()
	};
};
