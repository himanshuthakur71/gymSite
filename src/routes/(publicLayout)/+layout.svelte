<script lang="ts">
	import type { Snippet } from 'svelte';
	import Footer from '$lib/Components/Footer.svelte';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}

<Footer />
