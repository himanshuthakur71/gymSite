<script lang="ts">
	import type { Snippet } from 'svelte';
	import 'nprogress/nprogress.css';
	import '../app.css';
	import NProgress from 'nprogress';
	import { navigating } from '$app/state';

	let { children }: { children: Snippet } = $props();

	NProgress.configure({ minimum: 0.16, showSpinner: false });

	$effect(() => {
		if (navigating.to) NProgress.start();
		else NProgress.done();
	});
</script>

{@render children()}
