<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const gym_batches = $derived(data?.gym_batches ?? []);

	function formatDate(inputDate: string) {
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		const [y, m, d] = inputDate.split('-').map(Number);
		const date = new Date(y, m - 1, d);
		return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
	}

	let filterFirstName = $state('');
	let filterPhone = $state('');
	let filterBatch = $state('');
	let filterAadhar = $state('');
	let confirmDeleteId = $state<string | null>(null);

	const filteredMembers = $derived(
		(data?.members ?? []).filter((member: any) =>
			(!filterFirstName || member.first_name?.toLowerCase().includes(filterFirstName.toLowerCase())) &&
			(!filterPhone || member.phone_number?.includes(filterPhone)) &&
			(!filterBatch || member.gym_time?.includes(filterBatch)) &&
			(!filterAadhar || member.aadhar_number?.includes(filterAadhar))
		)
	);
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				<strong>Members</strong>
				<span class="text-gray-600">|</span>
				<a href="/admin/dashboard/member/add" class="link-hover text-blue-500">Add New</a>
			</h1>
		</div>

		<section class="mb-16">
			<legend class="mb-4 max-w-[160px] border-b-4 border-primary pb-2 text-xl font-semibold text-primary">Find Member:</legend>
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<label class="form-control w-full">
					<div class="label"><span class="label-text">First name</span></div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={filterFirstName} />
				</label>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Phone no</span></div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={filterPhone} />
				</label>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Aadhar no</span></div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={filterAadhar} />
				</label>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Select Batch</span></div>
					<select class="select select-bordered" bind:value={filterBatch}>
						<option value="">All Batches</option>
						{#each gym_batches as batch}
							<option value={batch?.batch_name}>{batch?.batch_name}</option>
						{/each}
					</select>
				</label>
			</div>
		</section>

		<div class="w-full">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				{#each filteredMembers as member}
					<div class="relative grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md">
						<div class="flex items-center gap-3">
							<span class="flex h-[25px] w-[50px] items-center justify-center rounded-br bg-primary text-[14px] font-[700] text-primary-content shadow-lg">{member?.id}</span>
							{#if member?.status === 'active'}
								<span class="badge badge-accent">Active</span>
							{:else if member?.status === 'in-active'}
								<span class="badge badge-error">In Active</span>
							{/if}
						</div>
						<div class="grid w-full grid-cols-1 gap-4 bg-base-200 p-4 md:grid-cols-2">
							<p class="flex flex-col text-lg"><span>Name:</span><strong>{member?.first_name} {member?.last_name}</strong></p>
							<p class="flex flex-col text-lg"><span>Mobile:</span><strong>{member?.phone_number}</strong></p>
							<p class="flex flex-col text-lg"><span>Plan Expiry:</span><strong>{member?.end_date ? formatDate(member.end_date) : '-'}</strong></p>
							<p class="flex flex-col text-lg"><span>Due Amount:</span><strong>{member?.due_amount || '-'}</strong></p>
						</div>
						<div class="flex w-full gap-4">
							<a href="/admin/dashboard/member/view/{member?.id}" class="btn btn-accent btn-sm">View</a>
							<a href="/admin/dashboard/member/{member?.id}" class="btn btn-primary btn-sm">Edit</a>
							<button
								type="button"
								class="btn btn-error btn-sm"
								onclick={() => confirmDeleteId = String(member?.id)}
							>Delete</button>
						</div>
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
			<p class="py-4">Are you sure you want to delete this member? This action cannot be undone.</p>
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
