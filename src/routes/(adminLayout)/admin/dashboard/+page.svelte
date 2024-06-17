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

			<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<a
					href="/admin/dashboard/member"
					class="flex w-full items-center justify-center rounded bg-base-200 p-4 px-4 py-16 text-center text-2xl font-bold text-primary shadow hover:bg-base-300 hover:underline"
				>
					Manage Members
				</a>
				<a
					href="/admin/dashboard/gallery"
					class="flex w-full items-center justify-center rounded bg-base-200 p-4 px-4 py-16 text-center text-2xl font-bold text-primary shadow hover:bg-base-300 hover:underline"
				>
					Manage Gallery
				</a>

				<a
					href="/admin/dashboard/contact-us"
					class="flex w-full items-center justify-center rounded bg-base-200 p-4 px-4 py-16 text-center text-2xl font-bold text-primary shadow hover:bg-base-300 hover:underline"
				>
					Forms Details
				</a>
			</div>
		</div>
	</div>
</section>
