<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let loading = false;
	let saveSucess = false;

	let formFeilds = {
		batch_name: '',
		batch_limit: '',
		batch_open_time: '',
		batch_close_time: ''
	};

	const addGymBatch = async () => {
		loading = true;
		try {
			const { data, error } = await supabase.from('gym_batches').insert([formFeilds]).select();

			console.log({
				data,
				error
			});

			if (data) {
				saveSucess = true;
			}
		} finally {
			loading = false;
		}
	};
</script>

<section class="my-16">
	<div class="hms-container">
		<div
			class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl"
		>
			<h1>Add New Batch</h1>
		</div>

		<div class="my-16 w-full">
			<form on:submit|preventDefault={addGymBatch}>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
					<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
						<label class="form-control w-full">
							<div class="label">
								<span class="label-text">Batch Name *</span>
							</div>
							<input
								type="text"
								placeholder="Type here"
								class="input input-bordered w-full"
								required
								bind:value={formFeilds.batch_name}
							/>
						</label>

						<label class="form-control w-full">
							<div class="label">
								<span class="label-text">Batch Limit *</span>
							</div>
							<input
								type="number"
								placeholder="Type here"
								class="input input-bordered w-full"
								required
								bind:value={formFeilds.batch_limit}
							/>
						</label>

						<label class="form-control w-full">
							<div class="label">
								<span class="label-text">Batch Open Time *</span>
							</div>
							<input
								type="time"
								placeholder="Type here"
								class="input input-bordered w-full"
								required
								bind:value={formFeilds.batch_open_time}
							/>
						</label>

						<label class="form-control w-full">
							<div class="label">
								<span class="label-text">Batch Close Time *</span>
							</div>
							<input
								type="time"
								placeholder="Type here"
								class="input input-bordered w-full"
								required
								bind:value={formFeilds.batch_close_time}
							/>
						</label>
					</div>
				</div>

				<div class="mt-6 flex justify-between">
					<button
						disabled={loading}
						type="submit"
						class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]"
					>
						Save
						{#if loading}
							<span class="loading"></span>
						{/if}
					</button>

					<a
						href="/admin/dashboard/batch"
						class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]"
					>
						Cancel
					</a>
				</div>
			</form>
		</div>
	</div>
</section>

{#if saveSucess}
	<dialog id="my_modal_1" class="modal" open>
		<div class="modal-box bg-base-300">
			<h3 class="text-lg font-bold">Sucess</h3>
			<p class="py-4">Gym Batch add sucessfully</p>
			<div class=" mt-8 flex justify-center">
				<a data-sveltekit-reload href="/admin/dashboard/batch" class="btn btn-primary btn-wide"
					>Continue</a
				>
			</div>
		</div>
	</dialog>
{/if}
