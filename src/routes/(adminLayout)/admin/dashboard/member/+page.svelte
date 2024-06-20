<script lang="ts">
	import { browser } from '$app/environment';
	import { supabase } from '$lib/supabaseClient.js';

	export let data;

	let members: any = data?.members;

	const gym_batches: any = data?.gym_batches;

	const gym_plans: any = data?.gym_plans;

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

	const deleteMember = async (id: any) => {
		const { error } = await supabase.from('members').delete().eq('id', id);
		if (!error) {
			browser && window.location.reload();
		}
	};

	// Filter criteria
	let filterFirstName = '';
	let filterPhone = '';
	let filterBatch = '';
	let filteraadhar_number = '';

	// Function to filter societies based on criteria
	function filterSocieties() {
		members = data?.members;
		members = members.filter((member: any) => {
			return (
				(!filterFirstName || member.first_name.includes(filterFirstName)) &&
				(!filterPhone || member.phone_number.includes(filterPhone)) &&
				(!filterBatch || member.gym_time.includes(filterBatch)) &&
				(!filteraadhar_number || member.aadhar_number.includes(filteraadhar_number))
			);
		});
	}

	// Function to clear all filters
	function clearFilters() {
		filterFirstName = '';
		filterPhone = '';
		filterBatch = '';
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				<strong>Members</strong>
				<span class="text-gray-600">|</span>
				<a href="/admin/dashboard/member/add" class=" link-hover text-blue-500">Add New</a>
			</h1>
		</div>

		<section class="mb-16">
			<legend
				class=" mb-4 max-w-[160px] border-b-4 border-primary pb-2 text-xl font-semibold text-primary"
				>Find Member:</legend
			>
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">First name</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full"
						bind:value={filterFirstName}
						on:input={filterSocieties}
					/>
				</label>
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Phone no</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full"
						bind:value={filterPhone}
						on:input={filterSocieties}
					/>
				</label>

				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Aadhar no</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full"
						bind:value={filteraadhar_number}
						on:input={filterSocieties}
					/>
				</label>

				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Select Batch</span>
					</div>
					<select
						class="select select-bordered"
						bind:value={filterBatch}
						on:change={filterSocieties}
					>
						<option value="">Select</option>
						{#each gym_batches as batch}
							<option value={batch?.batch_name}>{batch?.batch_name}</option>
						{/each}
					</select>
				</label>
			</div>
		</section>

		<div class="w-full">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				{#each members as member}
					<div class="relative grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md">
						<span
							class="absolute flex h-[25px] w-[50px] items-center justify-center rounded-br bg-primary text-[14px] font-[700] text-primary-content shadow-lg"
							>{member?.id}</span
						>
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
							<a href="/admin/dashboard/member/view/{member?.id}" class="btn btn-accent btn-sm"
								>View</a
							>
							<a href="/admin/dashboard/member/{member?.id}" class="btn btn-primary btn-sm">Edit</a>
							<button
								on:click={() => deleteMember(member?.id)}
								type="button"
								class="btn btn-error btn-sm">Delete</button
							>
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
