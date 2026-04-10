<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const gym_plan: any = data?.gym_plan;
	let loading = $state(false);
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Update Plan</h1>
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
							<div class="label"><span class="label-text">Plan Name *</span></div>
							<input type="text" name="plan_name" value={gym_plan?.plan_name ?? ''} placeholder="Type here" class="input input-bordered w-full" required />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Plan Amount *</span></div>
							<input type="number" name="plan_amount" value={gym_plan?.plan_amount ?? ''} placeholder="Type here" class="input input-bordered w-full" required />
						</label>
					</div>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Plan Time (Months) *</span></div>
						<select name="plan_time" class="select select-bordered" required>
							<option disabled value="">Select</option>
							{#each Array(24) as _, i}
								<option value={`${i + 1}`} selected={String(gym_plan?.plan_time) === String(i + 1)}>{i + 1} Month{i > 0 ? 's' : ''}</option>
							{/each}
						</select>
					</label>
				</div>

				<div class="mt-6 flex justify-between">
					<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">
						Save
						{#if loading}<span class="loading loading-spinner loading-sm"></span>{/if}
					</button>
					<a href="/admin/dashboard/plans" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Cancel</a>
				</div>
			</form>
		</div>
	</div>
</section>
