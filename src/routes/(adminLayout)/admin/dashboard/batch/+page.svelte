<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const gym_batches: any[] = data?.gym_batches ?? [];
	const batchCounts: Record<string, number> = data?.batchCounts ?? {};
	let confirmDeleteId = $state<string | null>(null);

	function formatTime12hr(time: string): string {
		if (!time) return '-';
		const [hourStr, minStr] = time.split(':');
		let hour = Number(hourStr);
		const min = minStr ?? '00';
		const ampm = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12 || 12;
		return `${hour}:${min} ${ampm}`;
	}
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Batch</h1>
			<span class="text-gray-600">|</span>
			<a href="/admin/dashboard/batch/new" class="link-hover font-[500] text-blue-500">Add New</a>
		</div>

		<div class="my-16">
			<div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
				{#each gym_batches as batch}
					{@const memberCount = batchCounts[batch?.batch_name] ?? 0}
					{@const available = (batch?.batch_limit ?? 0) - memberCount}
					<div class="relative grid w-full grid-cols-1 gap-3 bg-base-200 p-4 shadow-md">
						<div class="absolute right-2 top-2 flex gap-2">
							<a href="/admin/dashboard/batch/{batch?.id}" class="btn btn-primary btn-sm">Edit</a>
							<button
								type="button"
								class="btn btn-error btn-sm"
								onclick={() => confirmDeleteId = String(batch?.id)}
							>Delete</button>
						</div>
						<h2 class="text-xl font-bold text-primary">{batch?.batch_name}</h2>
						<p class="flex flex-col text-lg">
							<span class="text-sm text-gray-400">Time</span>
							<strong>{formatTime12hr(batch?.batch_open_time)} - {formatTime12hr(batch?.batch_close_time)}</strong>
						</p>
						<div class="flex gap-6">
							<p class="flex flex-col text-lg">
								<span class="text-sm text-gray-400">Capacity</span>
								<strong>{batch?.batch_limit}</strong>
							</p>
							<p class="flex flex-col text-lg">
								<span class="text-sm text-gray-400">Members</span>
								<strong>{memberCount}</strong>
							</p>
							<p class="flex flex-col text-lg">
								<span class="text-sm text-gray-400">Available</span>
								<strong class={available > 0 ? 'text-success' : 'text-error'}>{available}</strong>
							</p>
						</div>
						{#if available <= 0}
							<span class="badge badge-error w-fit">Full</span>
						{:else}
							<span class="badge badge-success w-fit">{available} slot{available !== 1 ? 's' : ''} open</span>
						{/if}
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
			<p class="py-4">Are you sure you want to delete this batch?</p>
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
