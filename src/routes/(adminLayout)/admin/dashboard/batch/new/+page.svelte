<script lang="ts">
	import { enhance } from '$app/forms';

	let loading = $state(false);
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Add New Batch</h1>
		</div>

		<div class="my-16 w-full">
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
			>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
					<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Name *</span></div>
							<input type="text" name="batch_name" placeholder="e.g. Morning Batch" class="input input-bordered w-full" required />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Limit *</span></div>
							<input type="number" name="batch_limit" placeholder="e.g. 30" class="input input-bordered w-full" required min="1" />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Open Time *</span></div>
							<input type="time" name="batch_open_time" class="input input-bordered w-full" required />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Batch Close Time *</span></div>
							<input type="time" name="batch_close_time" class="input input-bordered w-full" required />
						</label>
					</div>
				</div>

				<div class="mt-6 flex justify-between">
					<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">
						Save
						{#if loading}<span class="loading loading-spinner loading-sm"></span>{/if}
					</button>
					<a href="/admin/dashboard/batch" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Cancel</a>
				</div>
			</form>
		</div>
	</div>
</section>
