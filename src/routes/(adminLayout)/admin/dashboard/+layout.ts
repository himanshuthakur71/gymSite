import { supabase } from '$lib/supabaseClient';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const today = new Date();
	const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
	function getTodayDate() {
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

	const findTodayAddMembers = async () => {
		const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

		try {
			let { data: members, error } = await supabase
				.from('members')
				.select('*')
				.gte('created_at', todayStart.toISOString())
				.lte('created_at', todayEnd.toISOString());

			if (members) {
				return members;
			}
		} catch {
			return [];
		}
	};

	const findWeeKAddMembers = async () => {
		const startOfWeek = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - today.getDay()
		);

		try {
			const { data: members, error } = await supabase
				.from('members')
				.select()
				.gte('created_at', startOfWeek.toISOString())
				.lte('created_at', todayEnd.toISOString());

			if (members) {
				return members;
			}
		} catch {
			return [];
		}
	};

	const findMonthMembers = async () => {
		const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

		try {
			const { data: members, error } = await supabase
				.from('members')
				.select()
				.gte('created_at', startOfMonth.toISOString())
				.lte('created_at', todayEnd.toISOString());

			if (members) {
				return members;
			}
		} catch {
			return [];
		}
	};

	return {
		todayExpricesmembers: await findTodayExpMembers(),
		todayMembers: await findTodayAddMembers(),
		weekMembers: await findWeeKAddMembers(),
		monthMembers: await findMonthMembers()
	};
};
