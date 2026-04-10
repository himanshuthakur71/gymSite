<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form }: { data: any; form: any } = $props();

	const expired: any[] = data?.expired ?? [];
	const expiringSoon: any[] = data?.expiringSoon ?? [];
	const paymentDue: any[] = data?.paymentDue ?? [];

	let sendingExpiry = $state(false);
	let sendingExpired = $state(false);
	let sendingPayment = $state(false);
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Notifications</h1>
		</div>

		{#if form?.success}
			<div role="alert" class="alert alert-success mt-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>Emails sent successfully to {form?.sent} member{form?.sent !== 1 ? 's' : ''}!</span>
			</div>
		{/if}

		<div class="my-16 grid grid-cols-1 gap-12">

			<!-- Expiring Soon Section -->
			<div class="w-full">
				<div class="mb-4 flex items-center gap-3 border-b border-warning pb-2">
					<h2 class="text-xl font-bold text-warning">Expiring Soon (Next 7 Days)</h2>
					<span class="badge badge-warning">{expiringSoon.length}</span>
				</div>

				{#if expiringSoon.length === 0}
					<p class="text-gray-400">No members expiring in the next 7 days.</p>
				{:else}
					<div class="mb-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
						{#each expiringSoon as member}
							<div class="flex items-center justify-between bg-base-200 p-3">
								<div>
									<p class="font-semibold">{member?.first_name} {member?.last_name}</p>
									<p class="text-sm text-gray-400">{member?.email || 'No email'}</p>
								</div>
								<span class="badge badge-warning">{member?.end_date}</span>
							</div>
						{/each}
					</div>
					<form
						method="POST"
						action="?/sendExpiryWarnings"
						use:enhance={() => {
							sendingExpiry = true;
							return async ({ update }) => {
								sendingExpiry = false;
								await update();
							};
						}}
					>
						<button disabled={sendingExpiry} type="submit" class="btn btn-warning">
							Send Warning Emails ({expiringSoon.length})
							{#if sendingExpiry}<span class="loading loading-spinner loading-sm"></span>{/if}
						</button>
					</form>
				{/if}
			</div>

			<!-- Expired Section -->
			<div class="w-full">
				<div class="mb-4 flex items-center gap-3 border-b border-error pb-2">
					<h2 class="text-xl font-bold text-error">Expired Memberships</h2>
					<span class="badge badge-error">{expired.length}</span>
				</div>

				{#if expired.length === 0}
					<p class="text-gray-400">No expired memberships.</p>
				{:else}
					<div class="mb-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
						{#each expired as member}
							<div class="flex items-center justify-between bg-base-200 p-3">
								<div>
									<p class="font-semibold">{member?.first_name} {member?.last_name}</p>
									<p class="text-sm text-gray-400">{member?.email || 'No email'}</p>
								</div>
								<span class="badge badge-error">Exp: {member?.end_date}</span>
							</div>
						{/each}
					</div>
					<form
						method="POST"
						action="?/sendExpiredNotifications"
						use:enhance={() => {
							sendingExpired = true;
							return async ({ update }) => {
								sendingExpired = false;
								await update();
							};
						}}
					>
						<button disabled={sendingExpired} type="submit" class="btn btn-error">
							Send Expired Notifications ({expired.length})
							{#if sendingExpired}<span class="loading loading-spinner loading-sm"></span>{/if}
						</button>
					</form>
				{/if}
			</div>

			<!-- Payment Due Section -->
			<div class="w-full">
				<div class="mb-4 flex items-center gap-3 border-b border-accent pb-2">
					<h2 class="text-xl font-bold text-accent">Payment Due</h2>
					<span class="badge badge-accent">{paymentDue.length}</span>
				</div>

				{#if paymentDue.length === 0}
					<p class="text-gray-400">No pending payments.</p>
				{:else}
					<div class="mb-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
						{#each paymentDue as member}
							<div class="flex items-center justify-between bg-base-200 p-3">
								<div>
									<p class="font-semibold">{member?.first_name} {member?.last_name}</p>
									<p class="text-sm text-gray-400">{member?.email || 'No email'}</p>
								</div>
								<span class="badge badge-error">Due: ₹{member?.due_amount}</span>
							</div>
						{/each}
					</div>
					<form
						method="POST"
						action="?/sendPaymentReminders"
						use:enhance={() => {
							sendingPayment = true;
							return async ({ update }) => {
								sendingPayment = false;
								await update();
							};
						}}
					>
						<button disabled={sendingPayment} type="submit" class="btn btn-accent">
							Send Payment Reminders ({paymentDue.length})
							{#if sendingPayment}<span class="loading loading-spinner loading-sm"></span>{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>

		<div class="mt-32">
			<a href="/admin/dashboard" class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a>
		</div>
	</div>
</section>
