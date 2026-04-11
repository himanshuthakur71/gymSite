<script lang="ts">
	let { data }: { data: any } = $props();

	const todayExpricesmembers: any[] = data?.todayExpricesmembers ?? [];
	const todayMembers: any[] = data?.todayMembers ?? [];
	const weekMembers: any[] = data?.weekMembers ?? [];
	const monthMembers: any[] = data?.monthMembers ?? [];
	const expiredMembers: any[] = data?.expiredMembers ?? [];
	const expiringSoonMembers: any[] = data?.expiringSoonMembers ?? [];
	const paymentDueMembers: any[] = data?.paymentDueMembers ?? [];
	const totalMembersCount: number = data?.totalMembersCount ?? 0;
	const user: any = data?.session?.user;
	const isAdmin: boolean = data?.isAdmin ?? false;
	const employee: any = data?.employee ?? null;
	const canViewReports: boolean = isAdmin || !!(employee?.permissions?.reports);

	function formatNumber(number: number) {
		return number.toLocaleString('en-IN');
	}

	const todayTotalSell = $derived(todayMembers.reduce((sum, m) => sum + Number(m?.fee_pm ?? 0), 0));
	const todayReceived = $derived(todayMembers.reduce((sum, m) => sum + Number(m?.fee_received ?? 0), 0));

	const weekTotalSell = $derived(weekMembers.reduce((sum, m) => sum + Number(m?.fee_pm ?? 0), 0));
	const weekReceived = $derived(weekMembers.reduce((sum, m) => sum + Number(m?.fee_received ?? 0), 0));

	const monthTotalSell = $derived(monthMembers.reduce((sum, m) => sum + Number(m?.fee_pm ?? 0), 0));
	const monthReceived = $derived(monthMembers.reduce((sum, m) => sum + Number(m?.fee_received ?? 0), 0));

	const perms = employee?.permissions ?? {};
	const quickLinks = $derived([
		{ href: '/admin/dashboard/member', label: 'Members', show: isAdmin || !!perms.members },
		{ href: '/admin/dashboard/plans', label: 'Plans', show: isAdmin || !!perms.plans },
		{ href: '/admin/dashboard/batch', label: 'Batch', show: isAdmin || !!perms.batch },
		{ href: '/admin/dashboard/gallery', label: 'Gallery', show: isAdmin || !!perms.gallery },
		{ href: '/admin/dashboard/employee', label: 'Employees', show: isAdmin },
		{ href: '/admin/dashboard/announcements', label: 'Announcements', show: isAdmin },
		{ href: '/admin/dashboard/notifications', label: 'Notifications', show: isAdmin }
	].filter(l => l.show));
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 text-2xl font-semibold lg:text-3xl">
			<h1>Hello, {employee ? `${employee.first_name} ${employee.last_name}` : (user?.user_metadata?.first_name ?? 'Admin')}</h1>
		</div>

		<!-- Alert Section -->
		<section class="mt-6 grid w-full grid-cols-1 gap-3">
			{#each todayExpricesmembers as member}
				<div role="alert" class="alert alert-warning">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<span>Warning: <strong>{member?.first_name} {member?.last_name}</strong> membership expires today.</span>
					<a href="/admin/dashboard/member/view/{member?.id}" class="btn btn-sm">View</a>
				</div>
			{/each}

			{#if expiredMembers.length > 0}
				<div role="alert" class="alert alert-error">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span><strong>{expiredMembers.length}</strong> member{expiredMembers.length !== 1 ? 's' : ''} with expired memberships.</span>
					<a href="/admin/dashboard/notifications" class="btn btn-sm btn-error">View</a>
				</div>
			{/if}

			{#if expiringSoonMembers.length > 0}
				<div role="alert" class="alert alert-warning">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<span><strong>{expiringSoonMembers.length}</strong> member{expiringSoonMembers.length !== 1 ? 's' : ''} expiring in the next 7 days.</span>
					<a href="/admin/dashboard/notifications" class="btn btn-sm">View</a>
				</div>
			{/if}

			{#if paymentDueMembers.length > 0}
				<div role="alert" class="alert alert-warning">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<span><strong>{paymentDueMembers.length}</strong> member{paymentDueMembers.length !== 1 ? 's' : ''} with pending payments.</span>
					<a href="/admin/dashboard/notifications" class="btn btn-sm">View</a>
				</div>
			{/if}
		</section>

		<!-- Stats Row -->
		<section class="mt-8">
			<div class="stats stats-horizontal w-full shadow">
				<div class="stat">
					<div class="stat-title">Total Members</div>
					<div class="stat-value text-primary">{formatNumber(totalMembersCount)}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Expired</div>
					<div class="stat-value text-error">{expiredMembers.length}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Expiring Soon</div>
					<div class="stat-value text-warning">{expiringSoonMembers.length}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Payment Due</div>
					<div class="stat-value text-accent">{paymentDueMembers.length}</div>
				</div>
			</div>
		</section>

		<!-- Financial Overview — admin or employees with reports permission only -->
		{#if canViewReports}
		<section class="mb-16 mt-8">
			<h2 class="mb-6 border-b border-primary pb-2 text-xl font-semibold text-primary">Financial Overview</h2>
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div class="w-full bg-base-300 px-6 py-4 shadow-md">
					<h3 class="text-lg font-[500]">Today <small>(New Members)</small></h3>
					<p class="text-[42px] font-bold text-accent lg:text-[52px]">{todayMembers.length}</p>
					<p class="text-xl text-red-500"><strong class="text-white">Total Sales: </strong>₹{formatNumber(todayTotalSell)}</p>
					<p class="text-xl text-red-500"><strong class="text-white">Amount Received: </strong>₹{formatNumber(todayReceived)}</p>
					<p class="mt-1 border-t pt-1 text-xl text-red-500"><strong class="text-white">Amount Due: </strong>₹{formatNumber(todayTotalSell - todayReceived)}</p>
				</div>

				<div class="w-full bg-base-300 px-6 py-4 shadow-md">
					<h3 class="text-lg font-[500]">This Week <small>(New Members)</small></h3>
					<p class="text-[42px] font-bold text-accent lg:text-[52px]">{weekMembers.length}</p>
					<p class="text-xl text-red-500"><strong class="text-white">Total Sales: </strong>₹{formatNumber(weekTotalSell)}</p>
					<p class="text-xl text-red-500"><strong class="text-white">Amount Received: </strong>₹{formatNumber(weekReceived)}</p>
					<p class="mt-1 border-t pt-1 text-xl text-red-500"><strong class="text-white">Amount Due: </strong>₹{formatNumber(weekTotalSell - weekReceived)}</p>
				</div>

				<div class="w-full bg-base-300 px-6 py-4 shadow-md">
					<h3 class="text-lg font-[500]">This Month <small>(New Members)</small></h3>
					<p class="text-[42px] font-bold text-accent lg:text-[52px]">{monthMembers.length}</p>
					<p class="text-xl text-red-500"><strong class="text-white">Total Sales: </strong>₹{formatNumber(monthTotalSell)}</p>
					<p class="text-xl text-red-500"><strong class="text-white">Amount Received: </strong>₹{formatNumber(monthReceived)}</p>
					<p class="mt-1 border-t pt-1 text-xl text-red-500"><strong class="text-white">Amount Due: </strong>₹{formatNumber(monthTotalSell - monthReceived)}</p>
				</div>
			</div>
		</section>
		{/if}

		<!-- Quick Access -->
		<section class="w-full">
			<h2 class="mb-6 border-b border-primary pb-2 text-xl font-semibold text-primary">Quick Access</h2>
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each quickLinks as link}
					<a
						href={link.href}
						class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
					>{link.label}</a>
				{/each}
			</div>
		</section>
	</div>
</section>
