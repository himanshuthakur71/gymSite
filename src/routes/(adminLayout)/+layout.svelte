<script lang="ts">
	import type { Snippet } from 'svelte';

	let { data, children }: { data: any; children: Snippet } = $props();
</script>

{@render children()}
