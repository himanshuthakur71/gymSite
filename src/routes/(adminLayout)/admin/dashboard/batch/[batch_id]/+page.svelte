<script lang="ts">
	import { page } from '$app/state';
	import { supabase } from '$lib/supabaseClient';

	let { data }: { data: any } = $props();

	const { gym_batch } = data;

	let loading = $state(false);
	let saveSuccess = $state(false);

	let formFields = $state({
		batch_name: gym_batch?.batch_name || '',
		batch_limit: gym_batch?.batch_limit || '',
		batch_open_time: gym_batch?.batch_open_time || '',
		batch_close_time: gym_batch?.batch_close_time || ''
	});

	const updateGymBatch = async () => {
		loading = true;
		try {
			const { data, error } = await supabase
				.from('gym_batches')
				.update([formFields])
				.eq('id', page.params.batch_id)
				.select();
			if (data) saveSuccess = true;
		} finally {
			loading = false;
		}
	};
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Update Batch</h1>
		</div>

		<div class="my-16 w-full">
			<form onsubmit={(e) => { e.preventDefault(); updateGymBatch(); }}>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
					<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Name *</span></div>
							<input type="text" placeholder="Type here" class="input input-bordered w-full" required bind:value={formFields.batch_name} />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Limit *</span></div>
							<input type="number" placeholder="Type here" class="input input-bordered w-full" required bind:value={formFields.batch_limit} />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Open Time *</span></div>
							<input type="time" class="input input-bordered w-full" required bind:value={formFields.batch_open_time} />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Close Time *</span></div>
							<input type="time" class="input input-bordered w-full" required bind:value={formFields.batch_close_time} />
						</label>
					</div>
				</div>

				<div class="mt-6 flex justify-between">
					<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">
						Save
						{#if loading}<span class="loading"></span>{/if}
					</button>
					<a href="/admin/dashboard/batch" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Cancel</a>
				</div>
			</form>
		</div>
	</div>
</section>

{#if saveSuccess}
	<dialog class="modal" open>
		<div class="modal-box bg-base-300">
			<h3 class="text-lg font-bold">Success</h3>
			<p class="py-4">Gym Batch updated successfully</p>
			<div class="mt-8 flex justify-center">
				<a data-sveltekit-reload href="/admin/dashboard/batch" class="btn btn-primary btn-wide">Continue</a>
			</div>
		</div>
	</dialog>
{/if}
