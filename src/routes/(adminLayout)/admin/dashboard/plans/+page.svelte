<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const gym_plans: any[] = data?.gym_plans ?? [];
	let confirmDeleteId = $state<string | null>(null);
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Plans</h1>
			<span class="text-gray-600">|</span>
			<a href="/admin/dashboard/plans/new" class="link-hover font-[500] text-blue-500">Add New</a>
		</div>

		<div class="my-16">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				{#each gym_plans as plan}
					<div class="relative grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md">
						<div class="absolute right-2 top-2 flex gap-2">
							<a href="/admin/dashboard/plans/{plan?.plan_id}" class="btn btn-primary btn-sm">Edit</a>
							<button
								type="button"
								class="btn btn-error btn-sm"
								onclick={() => confirmDeleteId = String(plan?.plan_id)}
							>Delete</button>
						</div>
						<h2 class="flex flex-col text-lg">
							<span>Plan Name:</span>
							<strong>{plan?.plan_name}</strong>
						</h2>
						<p class="flex flex-col text-lg">
							<span>Amount:</span>
							<strong>₹{plan?.plan_amount}</strong>
						</p>
						<p class="flex flex-col text-lg">
							<span>Duration:</span>
							<strong>{plan?.plan_time} month(s)</strong>
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-32">
			<a href="/admin/dashboard" class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a>
		</div>
	</div>
</section>

{#if confirmDeleteId}
	<dialog class="modal" open>
		<div class="modal-box bg-base-300">
			<h3 class="text-lg font-bold">Confirm Delete</h3>
			<p class="py-4">Are you sure you want to delete this plan?</p>
			<div class="modal-action">
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						return async ({ update }) => {
							confirmDeleteId = null;
							await update();
						};
					}}
				>
					<input type="hidden" name="id" value={confirmDeleteId} />
					<button type="submit" class="btn btn-error">Yes, Delete</button>
				</form>
				<button type="button" class="btn btn-outline" onclick={() => confirmDeleteId = null}>Cancel</button>
			</div>
		</div>
	</dialog>
{/if}
