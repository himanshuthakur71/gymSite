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
					class="flex w-full flex-col justify-between gap-4 rounded bg-base-200 p-4 shadow hover:bg-base-300"
				>
					<h2 class="text-2xl font-bold text-primary">Members</h2>

					<div class="">
						<p>
							Active: <b>000</b>
						</p>
						<p>
							In-Active: <b>000</b>
						</p>
						<p>
							Total: <b>000</b>
						</p>
					</div>
				</a>

				<a
					href="/admin/dashboard/gallery"
					class="flex w-full flex-col justify-between gap-4 rounded bg-base-200 p-4 shadow hover:bg-base-300"
				>
					<h2 class="text-2xl font-bold text-primary">Gallery</h2>

					<div class="">
						<p>
							Total Images: <b>000</b>
						</p>
						<p>
							Total Video: <b>000</b>
						</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</section>
