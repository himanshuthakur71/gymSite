<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	export let data;

	const gym_plans: any = data?.gym_plans;
	const gym_batches: any = data?.gym_batches;

	let currentPlan: any;

	let formfields: any = {
		first_name: '',
		last_name: '',
		phone_number: '',
		email: '',
		gender: '',
		joining_date: '',
		end_date: '',
		aadhar_number: '',
		age: '',
		gym_time: '',
		fee_pm: '',
		fee_received: '',
		father_name: '',
		mother_name: '',
		address: '',
		is_paid: false,
		due_amount: '',
		status: 'active'
	};
	let loading = false;
	let saveSucess = false;

	const add_member = async () => {
		loading = true;

		try {
			const { data, error } = await supabase.from('members').insert([formfields]).select();

			if (data) {
				saveSucess = true;
			}
		} finally {
			loading = false;
		}
	};

	const getCurrentPlan = (amt: any = formfields.fee_pm) => {
		gym_plans.forEach((plan: any) => {
			if (plan?.plan_amount == amt) {
				currentPlan = plan;
			}
		});
	};

	const checkPayment = () => {
		if (formfields?.fee_pm == formfields?.fee_received) {
			formfields.is_paid = true;
		}
	};

	const updateDueAmount = () => {
		if (formfields?.fee_received) {
			formfields.due_amount = Number(formfields.fee_pm) - Number(formfields.fee_received);
		}
	};

	// Helper function to format date in YYYY-MM-DD format
	function formatDate(date: any) {
		let year = date.getFullYear();
		let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
		let day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	// Function to add months to the base date
	function addMonths(date: any, months: any) {
		const result = new Date(date);
		result.setMonth(result.getMonth() + months);
		return result;
	}

	// Main function to calculate the dates
	function getFutureDates(inputDate: any) {
		if (typeof inputDate !== 'string') {
			throw new Error('Input date must be a string in YYYY-MM-DD format');
		}

		// Split the input date string and create a new Date object
		const [year, month, day] = inputDate.split('-').map(Number);
		const baseDate = new Date(year, month - 1, day);

		// Calculate the future dates
		const oneMonthLater = addMonths(baseDate, 1);
		const threeMonthsLater = addMonths(baseDate, 3);
		const sixMonthsLater = addMonths(baseDate, 6);
		const twelveMonthsLater = addMonths(baseDate, 12);

		// console.log({
		// 	oneMonth: formatDate(oneMonthLater),
		// 	threeMonths: formatDate(threeMonthsLater),
		// 	sixMonths: formatDate(sixMonthsLater),
		// 	twelveMonths: formatDate(twelveMonthsLater)
		// });

		if (currentPlan?.plan_time == 1) {
			formfields.end_date = formatDate(oneMonthLater);
		}

		if (currentPlan?.plan_time == 3) {
			formfields.end_date = formatDate(threeMonthsLater);
		}

		if (currentPlan?.plan_time == 6) {
			formfields.end_date = formatDate(sixMonthsLater);
		}

		if (currentPlan?.plan_time == 12) {
			formfields.end_date = formatDate(twelveMonthsLater);
		}
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">Add New Members</h1>
		</div>

		<form on:submit|preventDefault={add_member}>
			<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
				<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">First name *</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.first_name}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Last name *</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.last_name}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Phone number *</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.phone_number}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Email</span>
						</div>
						<input
							type="email"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.email}
						/>
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Gender *</span>
						</div>

						<select class="select select-bordered" bind:value={formfields.gender}>
							<option disabled selected value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">other</option>
						</select>
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Aadhar number(Unique ID)</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.aadhar_number}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Age</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.age}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Select Batch</span>
						</div>
						<select class="select select-bordered" required bind:value={formfields.gym_time}>
							<option disabled selected value="">Select</option>
							{#each gym_batches as batch}
								<option value={batch?.batch_name}>{batch?.batch_name}</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Plan</span>
						</div>

						<select
							class="select select-bordered"
							required
							bind:value={formfields.fee_pm}
							on:change={() => getCurrentPlan(formfields.fee_pm)}
						>
							<option disabled selected value="">Select</option>
							{#each gym_plans as plan}
								<option value={plan?.plan_amount}>{plan?.plan_name} </option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Amount Recived</span>
						</div>
						<input
							type="number"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.fee_received}
							on:change={checkPayment}
							on:change={updateDueAmount}
						/>
					</label>

					{#if currentPlan}
						<label class="form-control w-full">
							<div class="label">
								<span class="label-text">Joining Date *</span>
							</div>
							<input
								type="date"
								placeholder="Type here"
								class="input input-bordered w-full"
								bind:value={formfields.joining_date}
								required
								on:change={() => getFutureDates(formfields.joining_date)}
							/>
						</label>
						<label class="form-control w-full">
							<div class="label">
								<span class="label-text">End Date *</span>
							</div>

							<input
								type="date"
								placeholder="Type here"
								class="input input-bordered w-full"
								bind:value={formfields.end_date}
								required
								disabled
							/>
						</label>
					{/if}

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Father's name</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.father_name}
						/>
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Mother's name</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.mother_name}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Address</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.address}
						/>
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Member Status</span>
						</div>
						<select class="select select-bordered" required bind:value={formfields.status}>
							<option disabled selected value="">Select</option>
							<option value="active">Active </option>
							<option value="in-active">In Active </option>
						</select>
					</label>
				</div>
			</div>

			<div class="mt-6 flex justify-between">
				<button
					disabled={loading}
					type="submit"
					class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]"
				>
					Save
					{#if loading}
						<span class="loading"></span>
					{/if}
				</button>

				<a
					href="/admin/dashboard/member"
					class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]"
				>
					Cancel
				</a>
			</div>
		</form>
	</div>
</section>

{#if saveSucess}
	<dialog id="my_modal_1" class="modal" open>
		<div class="modal-box bg-base-300">
			<h3 class="text-lg font-bold">Sucess</h3>
			<p class="py-4">Member add sucessfully</p>
			<div class=" mt-8 flex justify-center">
				<a data-sveltekit-reload href="/admin/dashboard/member" class="btn btn-primary btn-wide"
					>Continue</a
				>
			</div>
		</div>
	</dialog>
{/if}
