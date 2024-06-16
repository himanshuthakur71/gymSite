<script lang="ts">
	import { userStore } from '$lib/Stores/userStore';
</script>

<section>
	<div class="hms-container">
		<div class="w-full">
			<div class="my-16">
				<h1 class=" text-2xl lg:text-3xl">
					Welcome, <strong>{$userStore?.user_metadata?.first_name}</strong>
				</h1>
			</div>
		</div>
	</div>
</section>
