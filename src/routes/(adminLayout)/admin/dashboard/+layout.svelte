<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	let { data, children }: { data: any; children: Snippet } = $props();

	// Sync the server session to the browser client so mutations are authenticated
	$effect(() => {
		if (data.session) {
			supabase.auth.setSession(data.session);
		}
	});

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (!error) goto('/admin/login');
	};

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/admin/dashboard', label: 'Dashboard' },
		{ href: '/admin/dashboard/member', label: 'Members' },
		{ href: '/admin/dashboard/plans', label: 'Plans' },
		{ href: '/admin/dashboard/batch', label: 'Batch' },
		{ href: '/admin/dashboard/gallery', label: 'Gallery' },
		{ href: '/admin/dashboard/employee', label: 'Employees' },
		{ href: '/admin/dashboard/announcements', label: 'Announcements' },
		{ href: '/admin/dashboard/notifications', label: 'Notifications' }
	];
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
		</div>
		<div class="flex-none gap-2">
			<div class="hidden items-center gap-1 lg:flex">
				{#each navLinks as link}
					<a href={link.href} class="btn btn-ghost text-sm">{link.label}</a>
				{/each}
			</div>
			<!-- Mobile menu button -->
			<div class="dropdown dropdown-end lg:hidden">
				<button type="button" tabindex="0" class="btn btn-ghost" onclick={() => mobileMenuOpen = !mobileMenuOpen}>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				{#if mobileMenuOpen}
					<ul class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow">
						{#each navLinks as link}
							<li><a href={link.href} onclick={() => mobileMenuOpen = false}>{link.label}</a></li>
						{/each}
					</ul>
				{/if}
			</div>
			<button type="button" class="btn btn-error font-bold uppercase" onclick={logout}>
				Logout
			</button>
		</div>
	</header>

	<main class="mb-16 lg:mb-32">
		{@render children()}
	</main>

	<Footer />
</div>
