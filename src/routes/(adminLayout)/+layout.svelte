<script lang="ts">
	import { userStore } from '$lib/Stores/userStore';
	export let data: any;

	const { session } = data;

	$userStore = session?.session?.user;
</script>

<slot />
