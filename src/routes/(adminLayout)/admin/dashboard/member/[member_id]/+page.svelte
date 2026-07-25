<script lang="ts">
	import { enhance } from '$app/forms';

	let { data }: { data: any } = $props();

	const member = $derived(data?.member);
	const gym_plans: any[] = data?.gym_plans ?? [];
	const gym_batches: any[] = data?.gym_batches ?? [];

	let currentPlan: any = $state(gym_plans.find((p) => String(p?.plan_amount) === String(data?.member?.fee_pm)) ?? null);
	let loading = $state(false);
	let endDate = $state(data?.member?.end_date ?? '');
	let joiningDate = $state(data?.member?.joining_date ?? '');
	let feePm = $state(String(data?.member?.fee_pm ?? ''));

	// Payment modal state
	let showPaymentModal = $state(false);
	let paymentLoading = $state(false);
	let paymentAmount = $state('');
	let paymentDate = $state(new Date().toISOString().split('T')[0]);
	let paymentMode = $state('cash');
	let paymentNote = $state('');

	function openPaymentModal() {
		paymentAmount = String(Number(member?.due_amount) > 0 ? member.due_amount : '');
		showPaymentModal = true;
	}

	function fmtYMD(date: Date) {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}

	function calcEndDate(joining: string, plan: any): string {
		if (!joining || !plan) return '';
		const [y, m, d] = joining.split('-').map(Number);
		const base = new Date(y, m - 1, d);
		if (Number(plan.plan_days) > 0) {
			base.setDate(base.getDate() + Number(plan.plan_days));
		} else if (Number(plan.plan_time) > 0) {
			base.setMonth(base.getMonth() + Number(plan.plan_time));
		} else {
			return joining;
		}
		return fmtYMD(base);
	}

	function onPlanChange(planAmount: string) {
		const plan = gym_plans.find((p) => String(p?.plan_amount) === planAmount) ?? null;
		currentPlan = plan;
		endDate = calcEndDate(joiningDate, plan);
	}

	function onJoiningDateChange(val: string) {
		joiningDate = val;
		endDate = calcEndDate(val, currentPlan);
	}

	function modeBadgeClass(mode: string) {
		const map: Record<string, string> = {
			cash: 'badge-success', upi: 'badge-info', card: 'badge-warning',
			online: 'badge-accent', bank_transfer: 'badge-neutral'
		};
		return map[mode] ?? 'badge-neutral';
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">Edit Member</h1>
		</div>

		<!-- Payment Status Card -->
		{#if member?.fee_pm}
		<div class="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-base-content/20 bg-base-content/20 sm:grid-cols-3">
			<div class="bg-base-200 p-5">
				<div class="text-xs font-semibold uppercase tracking-widest text-base-content/50">Plan Fee</div>
				<div class="mt-1 text-2xl font-bold font-mono">₹{Number(member.fee_pm).toLocaleString('en-IN')}</div>
			</div>
			<div class="bg-base-200 p-5">
				<div class="text-xs font-semibold uppercase tracking-widest text-base-content/50">Received</div>
				<div class="mt-1 text-2xl font-bold font-mono text-success">₹{Number(member.fee_received ?? 0).toLocaleString('en-IN')}</div>
			</div>
			<div class="flex items-center justify-between gap-4 bg-base-200 p-5">
				<div>
					<div class="text-xs font-semibold uppercase tracking-widest text-base-content/50">Balance Due</div>
					<div class="mt-1 text-2xl font-bold font-mono {Number(member.due_amount) > 0 ? 'text-error' : 'text-success'}">
						{Number(member.due_amount) > 0 ? `₹${Number(member.due_amount).toLocaleString('en-IN')}` : 'Paid ✓'}
					</div>
				</div>
				<button type="button" class="btn btn-primary btn-sm shrink-0" onclick={openPaymentModal}>
					+ Add Payment
				</button>
			</div>
		</div>
		{/if}

		<!-- Edit Form -->
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
			<input type="hidden" name="end_date" value={endDate} />

			<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
				<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
					<label class="form-control w-full">
						<div class="label"><span class="label-text">First name *</span></div>
						<input type="text" name="first_name" value={member?.first_name ?? ''} placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Last name *</span></div>
						<input type="text" name="last_name" value={member?.last_name ?? ''} placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Phone number *</span></div>
						<input type="text" name="phone_number" value={member?.phone_number ?? ''} placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Email</span></div>
						<input type="email" name="email" value={member?.email ?? ''} placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Gender *</span></div>
						<select name="gender" class="select select-bordered" required>
							<option disabled value="">Select</option>
							<option value="male" selected={member?.gender === 'male'}>Male</option>
							<option value="female" selected={member?.gender === 'female'}>Female</option>
							<option value="other" selected={member?.gender === 'other'}>Other</option>
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Aadhar number (Unique ID)</span></div>
						<input type="text" name="aadhar_number" value={member?.aadhar_number ?? ''} placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Age *</span></div>
						<input type="number" name="age" value={member?.age ?? ''} placeholder="Type here" class="input input-bordered w-full" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Select Batch *</span></div>
						<select name="gym_time" class="select select-bordered" required>
							<option disabled value="">Select</option>
							{#each gym_batches as batch}
								<option value={batch?.batch_name} selected={member?.gym_time === batch?.batch_name}>{batch?.batch_name}</option>
							{/each}
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Plan *</span></div>
						<select
							name="fee_pm"
							class="select select-bordered"
							required
							onchange={(e) => { feePm = (e.target as HTMLSelectElement).value; onPlanChange(feePm); }}
						>
							<option disabled value="">Select</option>
							{#each gym_plans as plan}
								<option value={plan?.plan_amount} selected={String(member?.fee_pm) === String(plan?.plan_amount)}>
									{plan?.plan_name} - ₹{plan?.plan_amount}
									({plan?.plan_days > 0 ? `${plan.plan_days} day` : `${plan?.plan_time} month`})
								</option>
							{/each}
						</select>
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
						<div class="label">
							<span class="label-text">End Date (auto-calculated)</span>
						</div>
						<input type="date" class="input input-bordered w-full" value={endDate} disabled />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Father's name</span></div>
						<input type="text" name="father_name" value={member?.father_name ?? ''} placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Mother's name</span></div>
						<input type="text" name="mother_name" value={member?.mother_name ?? ''} placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Address</span></div>
						<input type="text" name="address" value={member?.address ?? ''} placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Member Status *</span></div>
						<select name="status" class="select select-bordered" required>
							<option value="active" selected={member?.status === 'active'}>Active</option>
							<option value="in-active" selected={member?.status === 'in-active'}>In Active</option>
						</select>
					</label>
				</div>
			</div>

			{#if joiningDate !== (data?.member?.joining_date ?? '')}
				<div class="alert alert-warning mt-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
					</svg>
					<span class="text-sm">Changing the joining date will be treated as a <strong>renewal</strong> — payment balance resets to zero. You'll be prompted to record the new payment after saving.</span>
				</div>
			{/if}

			<div class="mt-6 flex justify-between">
				<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">
					{#if loading}
						<span class="loading loading-spinner loading-sm"></span>
					{:else}
						Save
					{/if}
				</button>
				<a href="/admin/dashboard/member" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Cancel</a>
			</div>
		</form>
	</div>
</section>

<!-- Add Payment Modal -->
{#if showPaymentModal}
<dialog class="modal" open>
	<div class="modal-box bg-base-300">
		<h3 class="mb-2 text-lg font-bold">Add Payment</h3>
		<p class="mb-5 text-sm text-base-content/60">
			<strong>{member?.first_name} {member?.last_name}</strong>
			{#if Number(member?.due_amount) > 0}
				&nbsp;·&nbsp; Balance due: <strong class="text-error">₹{Number(member.due_amount).toLocaleString('en-IN')}</strong>
			{/if}
		</p>

		<form
			method="POST"
			action="?/addPayment"
			use:enhance={() => {
				paymentLoading = true;
				return async ({ update }) => {
					paymentLoading = false;
					showPaymentModal = false;
					paymentNote = '';
					await update();
				};
			}}
		>
			<div class="grid grid-cols-1 gap-4">
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Amount (₹) *</span></div>
					<input type="number" name="amount" bind:value={paymentAmount} class="input input-bordered w-full" required min="1" placeholder="Enter amount" />
				</label>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Payment Date *</span></div>
					<input type="date" name="payment_date" bind:value={paymentDate} class="input input-bordered w-full" required />
				</label>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Payment Mode *</span></div>
					<select name="payment_mode" bind:value={paymentMode} class="select select-bordered w-full" required>
						<option value="cash">Cash</option>
						<option value="upi">UPI</option>
						<option value="card">Card</option>
						<option value="online">Online</option>
						<option value="bank_transfer">Bank Transfer</option>
					</select>
				</label>
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Note</span>
						<span class="label-text-alt text-base-content/40">optional</span>
					</div>
					<input type="text" name="note" bind:value={paymentNote} class="input input-bordered w-full" placeholder="e.g. UPI ref, transaction ID" />
				</label>
			</div>
			<div class="modal-action">
				<button type="submit" class="btn btn-primary" disabled={paymentLoading}>
					Save Payment
					{#if paymentLoading}<span class="loading loading-spinner loading-sm"></span>{/if}
				</button>
				<button type="button" class="btn btn-outline" onclick={() => showPaymentModal = false}>Cancel</button>
			</div>
		</form>
	</div>
</dialog>
{/if}
