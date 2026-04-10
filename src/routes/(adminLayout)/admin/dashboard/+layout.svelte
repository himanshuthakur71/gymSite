<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import { supabase } from '$lib/supabaseClient';

	let { data, children }: { data: any; children: Snippet } = $props();

	const isAdmin: boolean = data?.isAdmin ?? false;
	const employee: any = data?.employee ?? null;
	const perms: Record<string, boolean> = employee?.permissions ?? {};

	// Sync Supabase session to browser client (admin only)
	$effect(() => {
		if (data.session) {
			supabase.auth.setSession(data.session);
		}
	});

	let mobileMenuOpen = $state(false);

	// Build nav based on who is logged in and their permissions
	const allNavLinks = [
		{ href: '/admin/dashboard', label: 'Dashboard', show: true },
		{ href: '/admin/dashboard/member', label: 'Members', show: isAdmin || !!perms.members },
		{ href: '/admin/dashboard/plans', label: 'Plans', show: isAdmin || !!perms.plans },
		{ href: '/admin/dashboard/batch', label: 'Batch', show: isAdmin || !!perms.batch },
		{ href: '/admin/dashboard/gallery', label: 'Gallery', show: isAdmin || !!perms.gallery },
		{ href: '/admin/dashboard/employee', label: 'Employees', show: isAdmin },
		{ href: '/admin/dashboard/announcements', label: 'Announcements', show: isAdmin },
		{ href: '/admin/dashboard/notifications', label: 'Notifications', show: isAdmin }
	];

	const navLinks = $derived(allNavLinks.filter((l) => l.show));
</script>

<div class="grid h-full min-h-screen w-full grid-rows-[auto_1fr_auto]">
	<header class="navbar bg-base-200 shadow">
		<div class="flex-1">
			<a href="/admin/dashboard" class="flex h-[90px] w-[90px] items-center justify-center">
				<img
					src="/images/logo_gym-removebg-preview.png"
					alt="logo"
					width="90"
					height="90"
					class="h-full w-full"
				/>
			</a>
			{#if employee}
				<div class="ml-2 hidden flex-col lg:flex">
					<span class="text-xs text-gray-400">Logged in as</span>
					<span class="text-sm font-semibold">{employee.first_name} {employee.last_name}</span>
					<span class="badge badge-outline badge-xs capitalize">{employee.role}</span>
				</div>
			{/if}
		</div>
		<div class="flex-none gap-2">
			<div class="hidden items-center gap-1 lg:flex">
				{#each navLinks as link}
					<a href={link.href} class="btn btn-ghost text-sm">{link.label}</a>
				{/each}
			</div>
			<!-- Mobile menu -->
			<div class="dropdown dropdown-end lg:hidden">
				<button
					type="button"
					tabindex="0"
					class="btn btn-ghost"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				{#if mobileMenuOpen}
					<ul class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow">
						{#each navLinks as link}
							<li>
								<a href={link.href} onclick={() => (mobileMenuOpen = false)}>{link.label}</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<!-- Logout via server POST — handles both admin and employee -->
			<form method="POST" action="/admin/logout">
				<button type="submit" class="btn btn-error font-bold uppercase">Logout</button>
			</form>
		</div>
	</header>

	<main class="mb-16 lg:mb-32">
		{@render children()}
	</main>

	<Footer />
</div>
