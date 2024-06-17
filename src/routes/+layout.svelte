<script lang="ts">
	import 'nprogress/nprogress.css';
	import '../app.css';

	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
</script>

<slot></slot>
