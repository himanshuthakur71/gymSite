<script>
	export let data;

	const { galleryImages, galleryVideos } = data;
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				Update your site gallery here.
			</h1>
		</div>

		<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<a
				href="/admin/dashboard/gallery/photos"
				class="flex w-full flex-col gap-2 rounded bg-base-200 p-4 shadow hover:bg-base-300"
			>
				<h2 class="text-xl font-bold text-primary">Photos</h2>

				<b class=" text-[60px]">{galleryImages?.length}</b>
			</a>

			<a
				href="/admin/dashboard/gallery/videos"
				class="flex w-full flex-col gap-2 rounded bg-base-200 p-4 shadow hover:bg-base-300"
			>
				<h2 class="text-xl font-bold text-primary">Videos</h2>

				<b class=" text-[60px]">{galleryVideos?.length}</b>
			</a>
		</div>

		<div class=" mt-32">
			<a
				href="/admin/dashboard"
				class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a
			>
		</div>
	</div>
</section>
