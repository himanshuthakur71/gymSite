<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let data;

	const member: any = data?.member;

	const gym_plans: any = data?.gym_plans;

	let currentPlan: any;

	const getCurrentPlan = (amt: any) => {
		gym_plans.forEach((plan: any) => {
			if (plan?.plan_amount == amt) {
				currentPlan = plan;
			}
		});
	};

	onMount(() => {
		if (member?.fee_pm) {
			getCurrentPlan(member?.fee_pm);
		}
	});

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
			<h1 class=" border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				<strong>View Member</strong>
				<span class="text-gray-600">|</span>
				<a href="/admin/dashboard/member/{member?.id}" class=" link-hover text-blue-500">Edit</a>
			</h1>
		</div>

		<section class="grid grid-cols-1 gap-10 text-lg">
			<div class="w-full">
				<h2
					class="mb-4 flex max-w-[320px] flex-wrap items-center gap-2 border-b-2 border-secondary pb-2 text-2xl font-bold text-primary"
				>
					Personal Info
					{#if member?.status == 'active'}
						<span class="badge badge-accent">Active</span>
					{/if}

					{#if member?.status == 'in-active'}
						<span class="badge badge-error">In Active</span>
					{/if}
				</h2>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4 text-base-content lg:grid-cols-2">
					<p>
						<strong>Member ID:</strong>
						{member?.id}
					</p>
					<p>
						<strong>Name:</strong>
						{member?.first_name}
						{member?.last_name}
					</p>

					<p>
						<strong>Phone:</strong>
						{member?.phone_number}
					</p>

					<p>
						<strong>Email:</strong>
						{member?.email}
					</p>

					<p>
						<strong>Gender:</strong>
						{member?.gender}
					</p>
					<p>
						<strong>Aadhar No:</strong>
						{member?.aadhar_number}
					</p>

					<p>
						<strong>Age:</strong>
						{member?.age} years
					</p>

					<p>
						<strong>Father Name:</strong>
						{member?.father_name}
					</p>

					<p>
						<strong>Monther Name:</strong>
						{member?.mother_name}
					</p>
					<p>
						<strong>Address:</strong>
						{member?.address}
					</p>
				</div>
			</div>

			<div class="w-full">
				<h2
					class="mb-4 max-w-[320px] border-b-2 border-secondary pb-2 text-2xl font-bold text-primary"
				>
					Gym Info
				</h2>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4 text-base-content lg:grid-cols-2">
					<p>
						<strong>Plan:</strong>
						{currentPlan?.plan_name}
					</p>

					<p>
						<strong>Months:</strong>
						{currentPlan?.plan_time} month
					</p>

					<p>
						<strong>Batch:</strong>
						{member?.gym_time}
					</p>

					<p>
						<strong>Joining Date:</strong>
						{formatDate(member?.joining_date)}
					</p>

					<p>
						<strong>End Date:</strong>
						{formatDate(member?.end_date)}
					</p>

					<p>
						<strong>Total Amount:</strong>
						{currentPlan?.plan_amount}
					</p>

					<p>
						<strong>Amount Received:</strong>
						{member?.fee_received}
					</p>

					<p class=" text-error">
						<strong>Amount Due:</strong>
						{member?.due_amount}
					</p>
				</div>
			</div>
		</section>

		<div class=" mt-32">
			<a
				href="/admin/dashboard/member"
				class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a
			>
		</div>
	</div>
</section>
