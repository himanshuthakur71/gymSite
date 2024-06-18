<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let batch: any;

	let totalMemberInBtach = 0;

	const getBatchTotalMember = async () => {
		let { data: members, error } = await supabase
			.from('members')
			.select('*')

			// Filters
			.eq('gym_time', batch?.batch_name);

		// console.log({
		// 	members,
		// 	error
		// });

		if (members) {
			totalMemberInBtach = members.length;
		}
	};

	onMount(async () => {
		getBatchTotalMember();
	});

	function formatTime(timeString: string) {
		// Split the input string into components
		const [hours, minutes, seconds] = timeString.split(':').map(Number);

		// Create a Date object with the given time components
		const date = new Date();
		date.setHours(hours, minutes, seconds);

		// Extract the hours and minutes from the Date object
		let formattedHours = date.getHours();
		const formattedMinutes = date.getMinutes();
		const period = formattedHours >= 12 ? 'PM' : 'AM';

		// Convert hours from 24-hour to 12-hour format
		formattedHours = formattedHours % 12 || 12;

		// Format the minutes to always have two digits
		const formattedMinutesString = formattedMinutes.toString().padStart(2, '0');

		// Return the formatted time string
		return `${formattedHours}:${formattedMinutesString} ${period}`;
	}
</script>

<div class="relative grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md md:grid-cols-2">
	<div class=" absolute right-2 top-2 flex gap-4">
		<a href="/admin/dashboard/batch/{batch?.id}" class="btn btn-primary btn-sm">Edit</a>
		<!-- <button type="button" class="btn btn-error btn-sm">Delete</button> -->
	</div>
	<h2 class="flex flex-col text-lg">
		<span>Batch Name:</span>
		<strong class="text-primary">{batch?.batch_name}</strong>
	</h2>

	<p class="flex flex-col text-lg">
		<span>Available Limit:</span>
		<strong>{batch?.batch_limit - totalMemberInBtach}</strong>
	</p>

	<p class="flex flex-col text-lg">
		<span>Total Member in Batch:</span>
		<strong>{totalMemberInBtach}</strong>
	</p>

	<p class="flex flex-col text-lg">
		<span>Batch Limit:</span>
		<strong>{batch?.batch_limit}</strong>
	</p>

	<p class="flex flex-col text-lg">
		<span>Batch Timing:</span>
		<strong>{formatTime(batch?.batch_open_time)} to {formatTime(batch?.batch_close_time)}</strong>
	</p>
</div>
