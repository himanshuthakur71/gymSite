<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	let { data, children }: { data: any; children: Snippet } = $props();

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (!error) goto('/admin/login');
	};
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
			<div class="hidden items-center gap-2 lg:flex">
				<a href="/admin/dashboard" class="btn btn-ghost text-xl">Dashboard</a>
				<a href="/admin/dashboard/employee" class="btn btn-ghost text-xl">Employee</a>
				<a href="/admin/dashboard/member" class="btn btn-ghost text-xl">Members</a>
				<a href="/admin/dashboard/plans" class="btn btn-ghost text-xl">Plans</a>
				<a href="/admin/dashboard/batch" class="btn btn-ghost text-xl">Batch</a>
				<a href="/admin/dashboard/gallery" class="btn btn-ghost text-xl">Gallery</a>
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
