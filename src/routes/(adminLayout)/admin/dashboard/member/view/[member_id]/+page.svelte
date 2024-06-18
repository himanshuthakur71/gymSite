<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let data;

	const member: any = data?.member;
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				<strong>View Member</strong>
				<span class="text-gray-600">|</span>
				<a href="/admin/dashboard/member/add" class=" link-hover text-blue-500">Add New</a>
			</h1>
		</div>
	</div>
</section>
