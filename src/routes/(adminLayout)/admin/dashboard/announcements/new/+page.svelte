<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const activeCount: number = data?.activeCount ?? 0;
	const totalCount: number = data?.totalCount ?? 0;

	let loading = $state(false);
	let sendTo = $state('all');
	const recipientCount = $derived(sendTo === 'active' ? activeCount : totalCount);
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>New Announcement</h1>
		</div>

		<div class="my-16 w-full max-w-2xl">
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
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Title *</span></div>
						<input type="text" name="title" placeholder="Announcement title" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Message *</span></div>
						<textarea name="message" placeholder="Write your announcement here..." class="textarea textarea-bordered w-full" rows="8" required></textarea>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Send To *</span></div>
						<select
							name="send_to"
							class="select select-bordered"
							bind:value={sendTo}
							required
						>
							<option value="all">All Members ({totalCount})</option>
							<option value="active">Active Members Only ({activeCount})</option>
						</select>
					</label>
					<div class="alert alert-info">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<span>This announcement will be emailed to <strong>{recipientCount}</strong> member{recipientCount !== 1 ? 's' : ''}.</span>
					</div>
				</div>

				<div class="mt-6 flex justify-between">
					<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[160px] text-xl font-[600]">
						Send
						{#if loading}<span class="loading loading-spinner loading-sm"></span>{/if}
					</button>
					<a href="/admin/dashboard/announcements" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-xl font-[600]">Cancel</a>
				</div>
			</form>
		</div>
	</div>
</section>
