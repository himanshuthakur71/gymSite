<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let { data }: { data: any } = $props();

	const gym_plans: any[] = data?.gym_plans ?? [];
	const gym_batches: any[] = data?.gym_batches ?? [];

	let currentPlan: any = $state(null);
	let loading = $state(false);
	let saveSuccess = $state(false);

	let formfields: any = $state({
		first_name: '', last_name: '', phone_number: '', email: '',
		gender: '', joining_date: '', end_date: '', aadhar_number: '',
		age: '', gym_time: '', fee_pm: '', fee_received: '',
		father_name: '', mother_name: '', address: '',
		is_paid: false, due_amount: '', status: 'active'
	});

	const add_member = async () => {
		loading = true;
		try {
			const { data, error } = await supabase.from('members').insert([formfields]).select();
			if (data) saveSuccess = true;
			if (error) console.log(error);
		} finally {
			loading = false;
		}
	};

	function formatDate(date: Date) {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}

	function addMonths(date: Date, months: number) {
		const result = new Date(date);
		result.setMonth(result.getMonth() + months);
		return result;
	}

	const getCurrentPlan = (amt: any = formfields.fee_pm) => {
		currentPlan = gym_plans.find((plan) => plan?.plan_amount == amt) ?? null;
	};

	const checkPayment = () => {
		if (formfields?.fee_pm == formfields?.fee_received) formfields.is_paid = true;
	};

	const updateDueAmount = () => {
		if (formfields?.fee_received) {
			formfields.due_amount = Number(formfields.fee_pm) - Number(formfields.fee_received);
		}
	};

	function getFutureDates(inputDate: string) {
		const [year, month, day] = inputDate.split('-').map(Number);
		const baseDate = new Date(year, month - 1, day);
		const monthsMap: Record<number, number> = { 1: 1, 2: 2, 3: 3, 6: 6, 12: 12 };
		const m = monthsMap[currentPlan?.plan_time];
		if (m) formfields.end_date = formatDate(addMonths(baseDate, m));
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">Add New Members</h1>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); add_member(); }}>
			<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
				<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
					<label class="form-control w-full">
						<div class="label"><span class="label-text">First name *</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" required bind:value={formfields.first_name} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Last name *</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" required bind:value={formfields.last_name} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Phone number *</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" required bind:value={formfields.phone_number} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Email</span></div>
						<input type="email" placeholder="Type here" class="input input-bordered w-full" bind:value={formfields.email} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Gender *</span></div>
						<select class="select select-bordered" bind:value={formfields.gender} required>
							<option disabled selected value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Aadhar number(Unique ID)</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={formfields.aadhar_number} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Age *</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" required bind:value={formfields.age} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Select Batch *</span></div>
						<select class="select select-bordered" required bind:value={formfields.gym_time}>
							<option disabled selected value="">Select</option>
							{#each gym_batches as batch}
								<option value={batch?.batch_name}>{batch?.batch_name}</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Plan *</span></div>
						<select class="select select-bordered" required bind:value={formfields.fee_pm} onchange={() => getCurrentPlan(formfields.fee_pm)}>
							<option disabled selected value="">Select</option>
							{#each gym_plans as plan}
								<option value={plan?.plan_amount}>{plan?.plan_name} - {plan?.plan_amount}</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Amount Recived *</span></div>
						<input type="number" placeholder="Type here" class="input input-bordered w-full" required bind:value={formfields.fee_received} onchange={() => { checkPayment(); updateDueAmount(); }} />
					</label>
					{#if currentPlan}
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Joining Date *</span></div>
							<input type="date" class="input input-bordered w-full" required bind:value={formfields.joining_date} onchange={() => getFutureDates(formfields.joining_date)} />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">End Date *</span></div>
							<input type="date" class="input input-bordered w-full" required bind:value={formfields.end_date} disabled />
						</label>
					{/if}
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Father's name</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={formfields.father_name} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Mother's name</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={formfields.mother_name} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Address</span></div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={formfields.address} />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Member Status</span></div>
						<select class="select select-bordered" required bind:value={formfields.status}>
							<option disabled selected value="">Select</option>
							<option value="active">Active</option>
							<option value="in-active">In Active</option>
						</select>
					</label>
				</div>
			</div>

			<div class="mt-6 flex justify-between">
				<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">
					Save
					{#if loading}<span class="loading"></span>{/if}
				</button>
				<a href="/admin/dashboard/member" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Cancel</a>
			</div>
		</form>
	</div>
</section>

{#if saveSuccess}
	<dialog class="modal" open>
		<div class="modal-box bg-base-300">
			<h3 class="text-lg font-bold">Success</h3>
			<p class="py-4">Member added successfully</p>
			<div class="mt-8 flex justify-center">
				<a data-sveltekit-reload href="/admin/dashboard/member" class="btn btn-primary btn-wide">Continue</a>
			</div>
		</div>
	</dialog>
{/if}
