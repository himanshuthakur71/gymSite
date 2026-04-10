<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const employees: any[] = data?.employees ?? [];
	let filterName = $state('');
	let filterRole = $state('');
	let confirmDeleteId = $state<string | null>(null);

	const filteredEmployees = $derived(
		employees.filter((e: any) =>
			(!filterName || `${e.first_name} ${e.last_name}`.toLowerCase().includes(filterName.toLowerCase())) &&
			(!filterRole || e.role === filterRole)
		)
	);

	function roleBadgeClass(role: string) {
		if (role === 'admin') return 'badge-primary';
		if (role === 'trainer') return 'badge-accent';
		return 'badge-secondary';
	}

	function formatDate(inputDate: string) {
		if (!inputDate) return '-';
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		const [y, m, d] = inputDate.split('-').map(Number);
		const date = new Date(y, m - 1, d);
		return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
	}
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Employees</h1>
			<span class="text-gray-600">|</span>
			<a href="/admin/dashboard/employee/add" class="link-hover font-[500] text-blue-500">Add New</a>
		</div>

		<section class="my-8">
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Search by name</span></div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={filterName} />
				</label>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Filter by role</span></div>
					<select class="select select-bordered" bind:value={filterRole}>
						<option value="">All Roles</option>
						<option value="admin">Admin</option>
						<option value="trainer">Trainer</option>
						<option value="staff">Staff</option>
					</select>
				</label>
			</div>
		</section>

		<div class="my-8">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				{#each filteredEmployees as employee}
					<div class="relative grid w-full grid-cols-1 gap-3 bg-base-200 p-4 shadow-md">
						<div class="flex items-center gap-2">
							<span class="badge {roleBadgeClass(employee?.role)} capitalize">{employee?.role}</span>
							{#if employee?.status === 'active'}
								<span class="badge badge-success">Active</span>
							{:else}
								<span class="badge badge-error">Inactive</span>
							{/if}
						</div>
						<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
							<p class="flex flex-col"><span class="text-sm text-gray-400">Name</span><strong>{employee?.first_name} {employee?.last_name}</strong></p>
							<p class="flex flex-col"><span class="text-sm text-gray-400">Phone</span><strong>{employee?.phone || '-'}</strong></p>
							<p class="flex flex-col"><span class="text-sm text-gray-400">Email</span><strong>{employee?.email || '-'}</strong></p>
							<p class="flex flex-col"><span class="text-sm text-gray-400">Joining Date</span><strong>{employee?.joining_date ? formatDate(employee.joining_date) : '-'}</strong></p>
						</div>
						<div class="flex gap-2">
							<a href="/admin/dashboard/employee/view/{employee?.id}" class="btn btn-accent btn-sm">View</a>
							<a href="/admin/dashboard/employee/{employee?.id}" class="btn btn-primary btn-sm">Edit</a>
							<button
								type="button"
								class="btn btn-error btn-sm"
								onclick={() => confirmDeleteId = String(employee?.id)}
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
			<p class="py-4">Are you sure you want to delete this employee?</p>
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
