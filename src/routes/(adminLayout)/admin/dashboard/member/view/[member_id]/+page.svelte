<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { data }: { data: any } = $props();

	const member: any = $derived(data?.member);
	const gym_plans: any[] = $derived(data?.gym_plans ?? []);
	const payments: any[] = $derived(data?.payments ?? []);
	const history: any[] = $derived(data?.history ?? []);

	const currentPlan = $derived(gym_plans.find((p) => String(p?.plan_amount) === String(member?.fee_pm)) ?? null);

	const openOnLoad = $page.url.searchParams.get('openPayment') === '1';

	let activeTab = $state<'details' | 'payments' | 'history'>(openOnLoad ? 'payments' : 'details');
	let showPaymentModal = $state(openOnLoad);
	let paymentLoading = $state(false);
	let paymentAmount = $state(openOnLoad ? String(data?.member?.due_amount ?? '') : '');
	let paymentDate = $state(new Date().toISOString().split('T')[0]);
	let paymentMode = $state('cash');
	let paymentNote = $state('');

	function openPaymentModal() {
		paymentAmount = String(Number(member?.due_amount) > 0 ? member.due_amount : '');
		showPaymentModal = true;
	}

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

	const totalPaid = $derived(payments.reduce((sum: number, p: any) => sum + Number(p.amount), 0));

	function eventBadgeClass(type: string) {
		const map: Record<string, string> = {
			joined: 'badge-success',
			renewed: 'badge-info',
			left: 'badge-error',
			rejoined: 'badge-success',
			plan_changed: 'badge-warning',
			payment_recorded: 'badge-accent'
		};
		return map[type] ?? 'badge-neutral';
	}

	function eventLabel(type: string) {
		const map: Record<string, string> = {
			joined: 'Joined',
			renewed: 'Renewed',
			left: 'Left',
			rejoined: 'Rejoined',
			plan_changed: 'Plan Changed',
			payment_recorded: 'Payment'
		};
		return map[type] ?? type;
	}

	function modeBadgeClass(mode: string) {
		const map: Record<string, string> = {
			cash: 'badge-success',
			upi: 'badge-info',
			card: 'badge-warning',
			online: 'badge-accent',
			bank_transfer: 'badge-neutral'
		};
		return map[mode] ?? 'badge-neutral';
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				<strong>View Member</strong>
				<span class="text-gray-600">|</span>
				<a href="/admin/dashboard/member/{member?.id}" class="link-hover text-blue-500">Edit</a>
			</h1>
		</div>

		<!-- Tabs -->
		<div role="tablist" class="tabs tabs-bordered mb-8 text-base">
			<button
				role="tab"
				class="tab {activeTab === 'details' ? 'tab-active' : ''}"
				onclick={() => activeTab = 'details'}
			>Details</button>
			<button
				role="tab"
				class="tab {activeTab === 'payments' ? 'tab-active' : ''}"
				onclick={() => activeTab = 'payments'}
			>
				Payments
				{#if Number(member?.due_amount) > 0}
					<span class="badge badge-error badge-sm ml-2">Due ₹{Number(member.due_amount).toLocaleString('en-IN')}</span>
				{/if}
			</button>
			<button
				role="tab"
				class="tab {activeTab === 'history' ? 'tab-active' : ''}"
				onclick={() => activeTab = 'history'}
			>
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
						{#if (currentPlan?.plan_days ?? 0) > 0}
							{currentPlan.plan_days} day(s)
						{:else if (currentPlan?.plan_time ?? 0) > 0}
							{currentPlan.plan_time} month(s)
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
			<!-- Summary strip -->
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
								<th>#</th>
								<th>Date</th>
								<th>Amount</th>
								<th>Mode</th>
								<th>Note</th>
								<th>Recorded By</th>
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
					<input
						type="number"
						name="amount"
						bind:value={paymentAmount}
						class="input input-bordered w-full"
						required
						min="1"
						placeholder="Enter amount"
					/>
				</label>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Payment Date *</span></div>
					<input
						type="date"
						name="payment_date"
						bind:value={paymentDate}
						class="input input-bordered w-full"
						required
					/>
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
					<input
						type="text"
						name="note"
						bind:value={paymentNote}
						class="input input-bordered w-full"
						placeholder="e.g. UPI ref, transaction ID"
					/>
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
