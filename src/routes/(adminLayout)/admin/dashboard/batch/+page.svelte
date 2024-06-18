<script lang="ts">
	import { browser } from '$app/environment';
	import BatchCard from '$lib/Components/BatchCard.svelte';
	import { supabase } from '$lib/supabaseClient.js';

	export let data;

	const gym_batches: any = data?.gym_batches;

	const deletePlan = async (id: any) => {
		const { error } = await supabase.from('gym_batches').delete().eq('id', id);
		if (!error) {
			browser && window.location.reload();
		}
	};
</script>

<section class="my-16">
	<div class="hms-container">
		<div
			class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl"
		>
			<h1>Batch</h1>
			<span class=" text-gray-600">|</span>
			<a href="/admin/dashboard/batch/new" class=" link-hover font-[500] text-blue-500">Add</a>
		</div>

		<div class="my-16">
			<div class="grid w-full grid-cols-1 gap-6">
				{#each gym_batches as batch}
					<BatchCard {batch} />
				{/each}
			</div>
		</div>

		<div class=" mt-32">
			<a
				href="/admin/dashboard"
				class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a
			>
		</div>
	</div>
</section>
