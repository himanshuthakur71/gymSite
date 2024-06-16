<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	const logout = async () => {
		let { error } = await supabase.auth.signOut();
		if (!error) {
			goto('/admin/login');
		}
	};
</script>

<header class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/admin/dashboard" class="btn btn-ghost text-xl">daisyUI</a>
	</div>
	<div class="flex-none gap-2">
		<button type="button" class=" btn btn-error font-bold uppercase" on:click={logout}
			>Logout</button
		>
	</div>
</header>
