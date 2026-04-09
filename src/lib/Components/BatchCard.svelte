<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let { batch }: { batch: any } = $props();

	let totalMemberInBatch = $state(0);

	supabase
		.from('members')
		.select('*')
		.eq('gym_time', batch?.batch_name)
		.then(({ data }) => {
			if (data) totalMemberInBatch = data.length;
		});

	function formatTime(timeString: string) {
		const [hours, minutes] = timeString.split(':').map(Number);
		const date = new Date();
		date.setHours(hours, minutes, 0);
		const h = date.getHours() % 12 || 12;
		const m = String(date.getMinutes()).padStart(2, '0');
		const period = date.getHours() >= 12 ? 'PM' : 'AM';
		return `${h}:${m} ${period}`;
	}
</script>

<div class="relative grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md md:grid-cols-2">
	<div class="absolute right-2 top-2 flex gap-4">
		<a href="/admin/dashboard/batch/{batch?.id}" class="btn btn-primary btn-sm">Edit</a>
	</div>
	<h2 class="flex flex-col text-lg">
		<span>Batch Name:</span>
		<strong class="text-primary">{batch?.batch_name}</strong>
	</h2>
	<p class="flex flex-col text-lg">
		<span>Available Limit:</span>
		<strong>{batch?.batch_limit - totalMemberInBatch}</strong>
	</p>
	<p class="flex flex-col text-lg">
		<span>Total Member in Batch:</span>
		<strong>{totalMemberInBatch}</strong>
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
