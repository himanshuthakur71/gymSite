<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const gym_plans: any[] = data?.gym_plans ?? [];
	const gym_batches: any[] = data?.gym_batches ?? [];

	let currentPlan: any = $state(null);
	let planName = $state('');
	let loading = $state(false);
	let joiningDate = $state('');
	let endDate = $state('');
	let feePm = $state('');
	let feeReceived = $state('');

	const dueAmount = $derived(
		feePm && feeReceived !== ''
			? Math.max(0, Number(feePm) - Number(feeReceived))
			: null
	);

	function fmtYMD(date: Date) {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}

	function calcEndDate(joining: string, plan: any): string {
		if (!joining || !plan) return '';
		const [y, m, d] = joining.split('-').map(Number);
		const base = new Date(y, m - 1, d);
		if (Number(plan.plan_days) > 0) {
			// Day pass: add plan_days days
			base.setDate(base.getDate() + Number(plan.plan_days));
		} else if (Number(plan.plan_time) > 0) {
			// Monthly plan: add plan_time months
			base.setMonth(base.getMonth() + Number(plan.plan_time));
		} else {
			return joining; // fallback: same day
		}
		return fmtYMD(base);
	}

	function onPlanChange(planAmount: string) {
		const plan = gym_plans.find((p) => String(p?.plan_amount) === planAmount) ?? null;
		currentPlan = plan;
		planName = plan?.plan_name ?? '';
		feePm = planAmount;
		endDate = calcEndDate(joiningDate, plan);
	}

	function onJoiningDateChange(val: string) {
		joiningDate = val;
		endDate = calcEndDate(val, currentPlan);
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">Add New Member</h1>
		</div>

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
			<input type="hidden" name="plan_name" value={planName} />
			<input type="hidden" name="end_date" value={endDate} />

			<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
				<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
					<label class="form-control w-full">
						<div class="label"><span class="label-text">First name *</span></div>
						<input type="text" name="first_name" placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Last name *</span></div>
						<input type="text" name="last_name" placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Phone number *</span></div>
						<input type="text" name="phone_number" placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Email</span></div>
						<input type="email" name="email" placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Gender *</span></div>
						<select name="gender" class="select select-bordered" required>
							<option disabled selected value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Aadhar number (Unique ID)</span></div>
						<input type="text" name="aadhar_number" placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Age *</span></div>
						<input type="number" name="age" placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Select Batch *</span></div>
						<select name="gym_time" class="select select-bordered" required>
							<option disabled selected value="">Select</option>
							{#each gym_batches as batch}
								<option value={batch?.batch_name}>{batch?.batch_name}</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Plan *</span></div>
						<select
							name="fee_pm"
							class="select select-bordered"
							required
							onchange={(e) => onPlanChange((e.target as HTMLSelectElement).value)}
						>
							<option disabled selected value="">Select</option>
							{#each gym_plans as plan}
								<option value={plan?.plan_amount}>
									{plan?.plan_name} - ₹{plan?.plan_amount}
									({plan?.plan_days > 0 ? `${plan.plan_days} day` : `${plan?.plan_time} month`})
								</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Amount Received *</span>
							{#if dueAmount !== null}
								<span class="label-text-alt {dueAmount > 0 ? 'text-error font-semibold' : 'text-success font-semibold'}">
									{dueAmount > 0 ? `Due: ₹${dueAmount}` : '✓ Fully Paid'}
								</span>
							{/if}
						</div>
						<input
							type="number"
							name="fee_received"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={feeReceived}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Joining Date *</span></div>
						<input
							type="date"
							name="joining_date"
							class="input input-bordered w-full"
							required
							value={joiningDate}
							onchange={(e) => onJoiningDateChange((e.target as HTMLInputElement).value)}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">End Date (auto-calculated)</span></div>
						<input type="date" class="input input-bordered w-full" value={endDate} disabled />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Father's name</span></div>
						<input type="text" name="father_name" placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Mother's name</span></div>
						<input type="text" name="mother_name" placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Address</span></div>
						<input type="text" name="address" placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Member Status *</span></div>
						<select name="status" class="select select-bordered" required>
							<option value="active" selected>Active</option>
							<option value="in-active">In Active</option>
						</select>
					</label>
				</div>
			</div>

			<div class="mt-6 flex justify-between">
				<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">
					Save
					{#if loading}<span class="loading loading-spinner loading-sm"></span>{/if}
				</button>
				<a href="/admin/dashboard/member" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Cancel</a>
			</div>
		</form>
	</div>
</section>
