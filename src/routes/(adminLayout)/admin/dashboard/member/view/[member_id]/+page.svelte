<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { data }: { data: any } = $props();

	const member: any = $derived(data?.member);
	const gym_plans: any[] = $derived(data?.gym_plans ?? []);
	const payments: any[] = $derived(data?.payments ?? []);
	const history: any[] = $derived(data?.history ?? []);

	const currentPlan = $derived(gym_plans.find((p) => String(p?.plan_amount) === String(member?.fee_pm)) ?? null);

	const openPaymentOnLoad = $page.url.searchParams.get('openPayment') === '1';
	const openRenewOnLoad = $page.url.searchParams.get('openRenew') === '1';

	// ── Tab state ──
	let activeTab = $state<'details' | 'payments' | 'history'>(openPaymentOnLoad ? 'payments' : 'details');

	// ── Add Payment modal ──
	let showPaymentModal = $state(openPaymentOnLoad);
	let paymentLoading = $state(false);
	let paymentAmount = $state(openPaymentOnLoad ? String(data?.member?.due_amount ?? '') : '');
	let paymentDate = $state(new Date().toISOString().split('T')[0]);
	let paymentMode = $state('cash');
	let paymentNote = $state('');

	function openPaymentModal() {
		paymentAmount = String(Number(member?.due_amount) > 0 ? member.due_amount : '');
		showPaymentModal = true;
	}

	// ── Renew modal ──
	let showRenewModal = $state(openRenewOnLoad);
	let renewLoading = $state(false);
	let renewPlan: any = $state(null);
	let renewPlanName = $state('');
	let renewFeePm = $state('');
	let renewJoiningDate = $state('');
	let renewEndDate = $state('');
	let renewAmountPaid = $state('');
	let renewPaymentMode = $state('cash');
	let renewNote = $state('');

	function fmtYMD(date: Date): string {
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

	function defaultRenewalJoiningDate(): string {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (!member?.end_date || member?.status === 'in-active') return fmtYMD(today);
		const [y, m, d] = member.end_date.split('-').map(Number);
		const endDate = new Date(y, m - 1, d);
		if (endDate < today) return fmtYMD(today); // expired → start today
		endDate.setDate(endDate.getDate() + 1); // still active → start day after end
		return fmtYMD(endDate);
	}

	function openRenewModal() {
		const defaultPlan = gym_plans.find((p) => String(p?.plan_amount) === String(member?.fee_pm)) ?? gym_plans[0] ?? null;
		renewPlan = defaultPlan;
		renewPlanName = defaultPlan?.plan_name ?? '';
		renewFeePm = String(defaultPlan?.plan_amount ?? '');
		renewJoiningDate = defaultRenewalJoiningDate();
		renewEndDate = calcEndDate(renewJoiningDate, defaultPlan);
		renewAmountPaid = '';
		renewPaymentMode = 'cash';
		renewNote = '';
		showRenewModal = true;
	}

	function onRenewPlanChange(planAmount: string) {
		const plan = gym_plans.find((p) => String(p?.plan_amount) === planAmount) ?? null;
		renewPlan = plan;
		renewPlanName = plan?.plan_name ?? '';
		renewEndDate = calcEndDate(renewJoiningDate, plan);
	}

	function onRenewJoiningDateChange(val: string) {
		renewJoiningDate = val;
		renewEndDate = calcEndDate(val, renewPlan);
	}

	const renewDue = $derived(
		renewFeePm && renewAmountPaid !== ''
			? Math.max(0, Number(renewFeePm) - Number(renewAmountPaid))
			: renewFeePm ? Number(renewFeePm) : null
	);

	// ── Helpers ──
	function formatDate(inputDate: string) {
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		const [y, m, d] = inputDate.split('-').map(Number);
		const date = new Date(y, m - 1, d);
		return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
	}

	function formatDateTime(isoStr: string) {
		return new Date(isoStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	}

	const daysRemaining = $derived(() => {
		if (!member?.end_date) return 0;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const [y, m, d] = member.end_date.split('-').map(Number);
		const end = new Date(y, m - 1, d);
		return Math.ceil((end.getTime() - today.getTime()) / 86400000);
	});

	const daysLabel = $derived(() => {
		const days = daysRemaining();
		if (days < 0) return `Expired ${Math.abs(days)} days ago`;
		if (days === 0) return 'Expires today';
		return `${days} days remaining`;
	});

	const daysBadgeClass = $derived(() => {
		const days = daysRemaining();
		if (days <= 0) return 'badge-error';
		if (days <= 7) return 'badge-warning';
		return 'badge-success';
	});

	const needsRenewal = $derived(member?.status === 'in-active' || daysRemaining() <= 0);

	const totalPaid = $derived(payments.reduce((sum: number, p: any) => sum + Number(p.amount), 0));

	function eventBadgeClass(type: string) {
		const map: Record<string, string> = {
			joined: 'badge-success', renewed: 'badge-info', left: 'badge-error',
			rejoined: 'badge-success', plan_changed: 'badge-warning', payment_recorded: 'badge-accent'
		};
		return map[type] ?? 'badge-neutral';
	}

	function eventLabel(type: string) {
		const map: Record<string, string> = {
			joined: 'Joined', renewed: 'Renewed', left: 'Left',
			rejoined: 'Rejoined', plan_changed: 'Plan Changed', payment_recorded: 'Payment'
		};
		return map[type] ?? type;
	}

	function modeBadgeClass(mode: string) {
		const map: Record<string, string> = {
			cash: 'badge-success', upi: 'badge-info', card: 'badge-warning',
			online: 'badge-accent', bank_transfer: 'badge-neutral'
		};
		return map[mode] ?? 'badge-neutral';
	}

	// Auto-open renew modal if ?openRenew=1
	$effect(() => {
		if (openRenewOnLoad && gym_plans.length > 0 && !renewPlan) {
			openRenewModal();
		}
	});
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				<strong>View Member</strong>
				<span class="text-gray-600">|</span>
				<a href="/admin/dashboard/member/{member?.id}" class="link-hover text-blue-500">Edit</a>
				<span class="text-gray-600">|</span>
				<button
					type="button"
					onclick={openRenewModal}
					class="link-hover {needsRenewal ? 'text-warning' : 'text-green-500'} text-2xl lg:text-3xl"
				>Renew</button>
			</h1>
		</div>

		<!-- Renewal / Expired alert banner -->
		{#if member?.status === 'in-active'}
			<div role="alert" class="alert alert-error mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 11-12.728 12.728A9 9 0 0118.364 5.636z"/>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01"/>
				</svg>
				<span>This member is <strong>inactive</strong>. Renew their membership to reactivate them.</span>
				<button type="button" class="btn btn-sm btn-error" onclick={openRenewModal}>Renew Now</button>
			</div>
		{:else if daysRemaining() <= 0}
			<div role="alert" class="alert alert-warning mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
				</svg>
				<span>Membership <strong>expired {Math.abs(daysRemaining())} day{Math.abs(daysRemaining()) !== 1 ? 's' : ''} ago</strong>. Renew to continue.</span>
				<button type="button" class="btn btn-sm btn-warning" onclick={openRenewModal}>Renew Now</button>
			</div>
		{:else if daysRemaining() <= 7}
			<div role="alert" class="alert alert-warning mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
				</svg>
				<span>Membership expires in <strong>{daysRemaining()} day{daysRemaining() !== 1 ? 's' : ''}</strong>. Consider renewing early.</span>
				<button type="button" class="btn btn-sm btn-warning btn-outline" onclick={openRenewModal}>Renew Early</button>
			</div>
		{/if}

		<!-- Tabs -->
		<div role="tablist" class="tabs tabs-bordered mb-8 text-base">
			<button role="tab" class="tab {activeTab === 'details' ? 'tab-active' : ''}" onclick={() => activeTab = 'details'}>
				Details
			</button>
			<button role="tab" class="tab {activeTab === 'payments' ? 'tab-active' : ''}" onclick={() => activeTab = 'payments'}>
				Payments
				{#if Number(member?.due_amount) > 0}
					<span class="badge badge-error badge-sm ml-2">Due ₹{Number(member.due_amount).toLocaleString('en-IN')}</span>
				{/if}
			</button>
			<button role="tab" class="tab {activeTab === 'history' ? 'tab-active' : ''}" onclick={() => activeTab = 'history'}>
				History
				{#if history.length > 0}
					<span class="badge badge-neutral badge-sm ml-2">{history.length}</span>
				{/if}
			</button>
		</div>

		<!-- ── Details Tab ── -->
		{#if activeTab === 'details'}
		<section class="grid grid-cols-1 gap-10 text-lg">
			<div class="w-full">
				<h2 class="mb-4 flex max-w-[480px] flex-wrap items-center gap-2 border-b-2 border-secondary pb-2 text-2xl font-bold text-primary">
					Personal Info
					{#if member?.status === 'active'}<span class="badge badge-accent">Active</span>{/if}
					{#if member?.status === 'in-active'}<span class="badge badge-error">In Active</span>{/if}
					<span class="badge {daysBadgeClass()}">{daysLabel()}</span>
				</h2>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4 text-base-content lg:grid-cols-2">
					<p><strong>Member ID:</strong> {member?.id}</p>
					<p><strong>Name:</strong> {member?.first_name} {member?.last_name}</p>
					<p><strong>Phone:</strong> {member?.phone_number}</p>
					<p><strong>Email:</strong> {member?.email || '-'}</p>
					<p><strong>Gender:</strong> {member?.gender}</p>
					<p><strong>Aadhar No:</strong> {member?.aadhar_number || '-'}</p>
					<p><strong>Age:</strong> {member?.age} years</p>
					<p><strong>Father Name:</strong> {member?.father_name || '-'}</p>
					<p><strong>Mother Name:</strong> {member?.mother_name || '-'}</p>
					<p><strong>Address:</strong> {member?.address || '-'}</p>
				</div>
			</div>

			<div class="w-full">
				<h2 class="mb-4 max-w-[320px] border-b-2 border-secondary pb-2 text-2xl font-bold text-primary">Gym Info</h2>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4 text-base-content lg:grid-cols-2">
					<p><strong>Plan:</strong> {currentPlan?.plan_name ?? '-'}</p>
					<p><strong>Duration:</strong>
						{#if (currentPlan?.plan_days ?? 0) > 0}{currentPlan.plan_days} day(s)
						{:else if (currentPlan?.plan_time ?? 0) > 0}{currentPlan.plan_time} month(s)
						{:else}-{/if}
					</p>
					<p><strong>Batch:</strong> {member?.gym_time}</p>
					<p><strong>Joining Date:</strong> {member?.joining_date ? formatDate(member.joining_date) : '-'}</p>
					<p><strong>End Date:</strong> {member?.end_date ? formatDate(member.end_date) : '-'}</p>
					<p><strong>Plan Fee:</strong> ₹{currentPlan?.plan_amount ?? member?.fee_pm ?? 0}</p>
					<p><strong>Amount Received:</strong> ₹{Number(member?.fee_received ?? 0).toLocaleString('en-IN')}</p>
					{#if Number(member?.due_amount) > 0}
						<p class="font-bold text-error"><strong>Amount Due:</strong> ₹{Number(member.due_amount).toLocaleString('en-IN')}</p>
					{:else}
						<p class="font-bold text-success"><strong>Amount Due:</strong> Paid ✓</p>
					{/if}
				</div>
			</div>
		</section>
		{/if}

		<!-- ── Payments Tab ── -->
		{#if activeTab === 'payments'}
		<section>
			<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div class="bg-base-300 p-5">
					<div class="mb-1 text-sm text-base-content/60">Plan Fee</div>
					<div class="text-2xl font-bold font-mono">₹{Number(member?.fee_pm ?? 0).toLocaleString('en-IN')}</div>
				</div>
				<div class="bg-base-300 p-5">
					<div class="mb-1 text-sm text-base-content/60">Total Received</div>
					<div class="text-2xl font-bold font-mono text-success">₹{Number(member?.fee_received ?? 0).toLocaleString('en-IN')}</div>
				</div>
				<div class="bg-base-300 p-5">
					<div class="mb-1 text-sm text-base-content/60">Balance Due</div>
					<div class="text-2xl font-bold font-mono {Number(member?.due_amount) > 0 ? 'text-error' : 'text-success'}">
						{Number(member?.due_amount) > 0 ? `₹${Number(member.due_amount).toLocaleString('en-IN')}` : 'Paid ✓'}
					</div>
				</div>
			</div>

			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-bold">Payment History</h2>
				<button class="btn btn-primary btn-sm" onclick={openPaymentModal}>+ Add Payment</button>
			</div>

			{#if payments.length === 0}
				<div class="bg-base-300 p-10 text-center text-base-content/50">No payments recorded yet.</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="table w-full">
						<thead>
							<tr>
								<th>#</th><th>Date</th><th>Amount</th><th>Mode</th><th>Note</th><th>Recorded By</th>
							</tr>
						</thead>
						<tbody>
							{#each payments as p, i}
								<tr>
									<td class="text-base-content/40 text-sm">{payments.length - i}</td>
									<td>{p.payment_date ? formatDate(p.payment_date) : '-'}</td>
									<td class="font-bold font-mono">₹{Number(p.amount).toLocaleString('en-IN')}</td>
									<td><span class="badge {modeBadgeClass(p.payment_mode)} badge-sm">{p.payment_mode?.toUpperCase()}</span></td>
									<td class="text-base-content/60 text-sm">{p.note || '-'}</td>
									<td class="text-base-content/60 text-sm">{p.recorded_by || '-'}</td>
								</tr>
							{/each}
						</tbody>
						<tfoot>
							<tr class="font-bold">
								<td colspan="2" class="text-right">Total</td>
								<td class="font-mono">₹{totalPaid.toLocaleString('en-IN')}</td>
								<td colspan="3"></td>
							</tr>
						</tfoot>
					</table>
				</div>
			{/if}
		</section>
		{/if}

		<!-- ── History Tab ── -->
		{#if activeTab === 'history'}
		<section>
			<h2 class="mb-6 text-xl font-bold">Member History</h2>
			{#if history.length === 0}
				<div class="bg-base-300 p-10 text-center text-base-content/50">No history recorded yet.</div>
			{:else}
				<div class="flex flex-col">
					{#each history as event}
						<div class="flex gap-4 border-b border-base-300 py-4 last:border-b-0">
							<div class="mt-0.5 flex-shrink-0">
								<span class="badge {eventBadgeClass(event.event_type)} badge-sm whitespace-nowrap">{eventLabel(event.event_type)}</span>
							</div>
							<div class="flex-1 min-w-0">
								<p class="font-semibold text-base-content">{event.description || eventLabel(event.event_type)}</p>
								<p class="mt-1 text-sm text-base-content/50">
									{formatDateTime(event.created_at)}{event.recorded_by ? ` · ${event.recorded_by}` : ''}
								</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>
		{/if}

		<div class="mt-16">
			<a href="/admin/dashboard/member" class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a>
		</div>
	</div>
</section>

<!-- ── Add Payment Modal ── -->
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
		<form method="POST" action="?/addPayment" use:enhance={() => {
			paymentLoading = true;
			return async ({ update }) => {
				paymentLoading = false;
				showPaymentModal = false;
				paymentNote = '';
				await update();
			};
		}}>
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

<!-- ── Renew Membership Modal ── -->
{#if showRenewModal}
<dialog class="modal" open>
	<div class="modal-box max-w-lg bg-base-300">
		<h3 class="mb-1 text-lg font-bold">
			{member?.status === 'in-active' ? 'Rejoin Member' : 'Renew Membership'}
		</h3>
		<p class="mb-5 text-sm text-base-content/60">
			<strong>{member?.first_name} {member?.last_name}</strong>
			{#if member?.status === 'in-active'}
				&nbsp;·&nbsp; <span class="text-error">Currently Inactive</span>
			{:else if daysRemaining() <= 0}
				&nbsp;·&nbsp; <span class="text-error">Expired {Math.abs(daysRemaining())} days ago</span>
			{:else}
				&nbsp;·&nbsp; <span class="text-success">{daysRemaining()} days remaining</span>
			{/if}
		</p>

		<form method="POST" action="?/renew" use:enhance={() => {
			renewLoading = true;
			return async ({ update }) => {
				renewLoading = false;
				showRenewModal = false;
				await update();
			};
		}}>
			<input type="hidden" name="end_date" value={renewEndDate} />
			<input type="hidden" name="plan_name" value={renewPlanName} />

			<div class="grid grid-cols-1 gap-4">
				<!-- Plan -->
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Plan *</span></div>
					<select
						name="fee_pm"
						class="select select-bordered w-full"
						required
						onchange={(e) => {
							renewFeePm = (e.target as HTMLSelectElement).value;
							onRenewPlanChange(renewFeePm);
						}}
					>
						<option disabled value="">Select plan</option>
						{#each gym_plans as plan}
							<option
								value={plan?.plan_amount}
								selected={String(plan?.plan_amount) === String(member?.fee_pm)}
							>
								{plan?.plan_name} — ₹{plan?.plan_amount}
								({plan?.plan_days > 0 ? `${plan.plan_days} day` : `${plan?.plan_time} month`})
							</option>
						{/each}
					</select>
				</label>

				<!-- Joining date + End date -->
				<div class="grid grid-cols-2 gap-4">
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Joining Date *</span></div>
						<input
							type="date"
							name="joining_date"
							class="input input-bordered w-full"
							required
							bind:value={renewJoiningDate}
							onchange={(e) => onRenewJoiningDateChange((e.target as HTMLInputElement).value)}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">End Date</span></div>
						<input type="date" class="input input-bordered w-full" value={renewEndDate} disabled />
					</label>
				</div>

				<!-- Amount paid now -->
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Amount Paid Now</span>
						<span class="label-text-alt text-base-content/40">0 = record payment later</span>
					</div>
					<input
						type="number"
						name="amount_paid"
						bind:value={renewAmountPaid}
						class="input input-bordered w-full"
						min="0"
						placeholder="0"
					/>
				</label>

				<!-- Due preview -->
				{#if renewFeePm}
					<div class="flex items-center justify-between rounded-lg bg-base-200 px-4 py-3 text-sm">
						<span class="text-base-content/60">Plan fee: <strong>₹{Number(renewFeePm).toLocaleString('en-IN')}</strong></span>
						{#if renewDue !== null && renewDue > 0}
							<span class="font-semibold text-error">Balance due after: ₹{renewDue.toLocaleString('en-IN')}</span>
						{:else if renewDue === 0}
							<span class="font-semibold text-success">✓ Fully paid</span>
						{/if}
					</div>
				{/if}

				<!-- Payment mode -->
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Payment Mode</span></div>
					<select name="payment_mode" bind:value={renewPaymentMode} class="select select-bordered w-full">
						<option value="cash">Cash</option>
						<option value="upi">UPI</option>
						<option value="card">Card</option>
						<option value="online">Online</option>
						<option value="bank_transfer">Bank Transfer</option>
					</select>
				</label>

				<!-- Note -->
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Note</span>
						<span class="label-text-alt text-base-content/40">optional</span>
					</div>
					<input type="text" name="note" bind:value={renewNote} class="input input-bordered w-full" placeholder="e.g. returning after summer break" />
				</label>
			</div>

			<div class="modal-action">
				<button
					type="submit"
					class="btn btn-success"
					disabled={renewLoading || !renewFeePm || !renewJoiningDate}
				>
					{member?.status === 'in-active' ? 'Rejoin & Save' : 'Renew & Save'}
					{#if renewLoading}<span class="loading loading-spinner loading-sm"></span>{/if}
				</button>
				<button type="button" class="btn btn-outline" onclick={() => showRenewModal = false}>Cancel</button>
			</div>
		</form>
	</div>
</dialog>
{/if}
