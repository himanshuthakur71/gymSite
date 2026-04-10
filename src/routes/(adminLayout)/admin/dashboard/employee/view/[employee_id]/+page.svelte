<script lang="ts">
	let { data }: { data: any } = $props();

	const employee: any = data?.employee;
	const perms: any = employee?.permissions ?? {};

	function formatDate(inputDate: string) {
		if (!inputDate) return '-';
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		const [y, m, d] = inputDate.split('-').map(Number);
		const date = new Date(y, m - 1, d);
		return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
	}

	function roleBadgeClass(role: string) {
		if (role === 'admin') return 'badge-primary';
		if (role === 'trainer') return 'badge-accent';
		return 'badge-secondary';
	}
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>View Employee</h1>
			<span class="text-gray-600">|</span>
			<a href="/admin/dashboard/employee/{employee?.id}" class="link-hover font-[500] text-blue-500">Edit</a>
		</div>

		<section class="my-16 grid grid-cols-1 gap-10 text-lg">
			<div class="w-full">
				<h2 class="mb-4 flex flex-wrap items-center gap-2 border-b-2 border-secondary pb-2 text-2xl font-bold text-primary">
					Personal Info
					<span class="badge {roleBadgeClass(employee?.role)} capitalize">{employee?.role}</span>
					{#if employee?.status === 'active'}
						<span class="badge badge-success">Active</span>
					{:else}
						<span class="badge badge-error">Inactive</span>
					{/if}
				</h2>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4 text-base-content lg:grid-cols-2">
					<p><strong>Name:</strong> {employee?.first_name} {employee?.last_name}</p>
					<p><strong>Email:</strong> {employee?.email || '-'}</p>
					<p><strong>Phone:</strong> {employee?.phone || '-'}</p>
					<p><strong>Joining Date:</strong> {employee?.joining_date ? formatDate(employee.joining_date) : '-'}</p>
					<p><strong>Salary:</strong> {employee?.salary ? `₹${employee.salary}` : '-'}</p>
					<p><strong>Notes:</strong> {employee?.notes || '-'}</p>
				</div>
			</div>

			<div class="w-full">
				<h2 class="mb-4 border-b-2 border-secondary pb-2 text-2xl font-bold text-primary">Permissions</h2>
				<div class="flex flex-wrap gap-3 bg-base-300 p-4">
					{#if perms?.members}<span class="badge badge-primary badge-lg">Members</span>{/if}
					{#if perms?.plans}<span class="badge badge-primary badge-lg">Plans</span>{/if}
					{#if perms?.batch}<span class="badge badge-primary badge-lg">Batch</span>{/if}
					{#if perms?.gallery}<span class="badge badge-primary badge-lg">Gallery</span>{/if}
					{#if perms?.reports}<span class="badge badge-primary badge-lg">Reports</span>{/if}
					{#if !perms?.members && !perms?.plans && !perms?.batch && !perms?.gallery && !perms?.reports}
						<span class="text-gray-400">No permissions assigned</span>
					{/if}
				</div>
			</div>
		</section>

		<div class="mt-32">
			<a href="/admin/dashboard/employee" class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a>
		</div>
	</div>
</section>
