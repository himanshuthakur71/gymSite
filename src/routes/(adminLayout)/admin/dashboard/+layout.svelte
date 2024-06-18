<script lang="ts">
	import { userStore } from '$lib/Stores/userStore';
	import Footer from '$lib/Components/Footer.svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	const logout = async () => {
		let { error } = await supabase.auth.signOut();
		if (!error) {
			goto('/admin/login');
		}
	};

	onMount(async () => {
		if (!$userStore?.user_metadata?.first_name) {
			goto('/admin/login');
		}
	});
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
			<a href="/admin/dashboard" class="btn btn-ghost text-xl">Dashboard</a>
			<a href="/admin/dashboard/member" class="btn btn-ghost text-xl">Members</a>
			<a href="/admin/dashboard/plans" class="btn btn-ghost text-xl">Plans</a>
			<a href="/admin/dashboard/batch" class="btn btn-ghost text-xl">Batch</a>
			<a href="/admin/dashboard/gallery" class="btn btn-ghost text-xl">Gallery</a>
			<button type="button" class=" btn btn-error font-bold uppercase" on:click={logout}>
				Logout
			</button>
		</div>
	</header>

	<main class="mb-16 lg:mb-32">
		<slot />
	</main>

	<Footer />
</div>
