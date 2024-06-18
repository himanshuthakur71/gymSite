<script lang="ts">
	export let data;

	let members: any = data?.members;

	// Helper function to map month numbers to month names
	function getMonthName(monthIndex: any) {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		return monthNames[monthIndex];
	}

	// Function to format date from YYYY-MM-DD to DD Month, YYYY
	function formatDate(inputDate: any) {
		// Split the input date string and create a new Date object
		const [year, month, day] = inputDate.split('-').map(Number);
		const date = new Date(year, month - 1, day);

		// Get the day, month name, and year
		const dayOfMonth = String(date.getDate()).padStart(2, '0');
		const monthName = getMonthName(date.getMonth());
		const fullYear = date.getFullYear();

		// Return the formatted date string
		return `${dayOfMonth} ${monthName}, ${fullYear}`;
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" text-2xl lg:text-3xl">
				<strong>Members</strong>
				<span>|</span>
				<a href="/admin/dashboard/member/add" class=" link-hover text-blue-500">Add New</a>
			</h1>
		</div>

		<div class="w-full">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				{#each members as member}
					<div class="grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md">
						<div class="grid w-full grid-cols-1 gap-4 bg-base-200 p-4 md:grid-cols-2">
							<p class="flex flex-col text-lg">
								<span>Name:</span>
								<strong>{member?.first_name} {member?.last_name}</strong>
							</p>

							<p class="flex flex-col text-lg">
								<span>Mobile:</span>
								<strong>{member?.phone_number}</strong>
							</p>

							<p class="flex flex-col text-lg">
								<span>Plan Expiry:</span>
								<strong>{formatDate(member?.end_date)}</strong>
							</p>

							<p class="flex flex-col text-lg">
								<span>Due Amount:</span>
								<strong>{member?.due_amount || '-'}</strong>
							</p>
						</div>
						<div class="flex w-full gap-4">
							<a href="/admin/dashboard/member" class="btn btn-accent btn-sm">View</a>
							<a href="/admin/dashboard/member" class="btn btn-primary btn-sm">Edit</a>
							<button type="button" class="btn btn-error btn-sm">Delete</button>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class=" mt-32">
			<a
				href="/admin/dashboard"
				class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a
			>
		</div>
	</div>
</section>
