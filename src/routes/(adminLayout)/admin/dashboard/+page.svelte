<script lang="ts">
	import { userStore } from '$lib/Stores/userStore';
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 text-2xl font-semibold lg:text-3xl">
			<h1>Hello, {$userStore?.user_metadata?.first_name}</h1>
		</div>

		<section class="mt-16">
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<a
					href="/admin/dashboard/member"
					class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
				>
					Members
				</a>
				<a
					href="/admin/dashboard/plans"
					class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
				>
					Plans
				</a>

				<a
					href="/admin/dashboard/batch"
					class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
				>
					Batch
				</a>
				<a
					href="/admin/dashboard/gallery"
					class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
				>
					Gallery
				</a>
			</div>
		</section>
	</div>
</section>
