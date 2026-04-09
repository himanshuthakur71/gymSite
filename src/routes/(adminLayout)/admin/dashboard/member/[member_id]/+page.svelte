<script lang="ts">
	import { page } from '$app/state';
	import { supabase } from '$lib/supabaseClient';

	let { data }: { data: any } = $props();

	const member: any = data?.member;
	const gym_plans: any[] = data?.gym_plans ?? [];
	const gym_batches: any[] = data?.gym_batches ?? [];

	let currentPlan: any = $state(gym_plans.find((p) => p?.plan_amount == member?.fee_pm) ?? null);
	let loading = $state(false);
	let saveSuccess = $state(false);

	let formfields: any = $state({
		first_name: member?.first_name || '', last_name: member?.last_name || '',
		phone_number: member?.phone_number || '', email: member?.email || '',
		gender: member?.gender || '', joining_date: member?.joining_date || '',
		end_date: member?.end_date || '', aadhar_number: member?.aadhar_number || '',
		age: member?.age || '', gym_time: member?.gym_time || '',
		fee_pm: member?.fee_pm || '', fee_received: member?.fee_received || '',
		father_name: member?.father_name || '', mother_name: member?.mother_name || '',
		address: member?.address || '', is_paid: member?.is_paid || false,
		due_amount: member?.due_amount || '', status: member?.status || ''
	});

	const update_member = async () => {
		loading = true;
		try {
			const { data, error } = await supabase
				.from('members')
				.update([formfields])
				.eq('id', page.params.member_id)
				.select();
			if (data) saveSuccess = true;
		} finally {
			loading = false;
		}
	};

	const getCurrentPlan = (amt: any) => {
		currentPlan = gym_plans.find((p) => p?.plan_amount == amt) ?? null;
	};

	const checkPayment = () => {
		if (formfields?.fee_pm == formfields?.fee_received) formfields.is_paid = true;
	};

	const updateDueAmount = () => {
		if (formfields?.fee_received) {
			formfields.due_amount = Number(formfields.fee_pm) - Number(formfields.fee_received);
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
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">Edit Member</h1>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); update_member(); }}>
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
							<option disabled value="">Select</option>
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
							<option disabled value="">Select</option>
							{#each gym_batches as batch}
								<option value={batch?.batch_name}>{batch?.batch_name}</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Plan *</span></div>
						<select class="select select-bordered" required bind:value={formfields.fee_pm} onchange={() => getCurrentPlan(formfields.fee_pm)}>
							<option disabled value="">Select</option>
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
							<option disabled value="">Select</option>
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
			<p class="py-4">Member updated successfully</p>
			<div class="mt-8 flex justify-center">
				<a data-sveltekit-reload href="/admin/dashboard/member" class="btn btn-primary btn-wide">Continue</a>
			</div>
		</div>
	</dialog>
{/if}
