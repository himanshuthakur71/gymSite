<script lang="ts">
	import Header from '$lib/Components/Header.svelte';

	export let data;
	const { galleryImages, galleryVideos } = data;
</script>

<svelte:head>
	<title>Gallery - Fitness Academy</title>
	<link rel="canonical" href="https://www.fitnessacademygym.com/gallery" />
</svelte:head>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-Ww5PW6r-X3-1600x900.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				PHOTOS & VIDEO <span class="text-primary">GALLERY</span>
			</h1>
		</div>
	</div>
</div>

<section class="w-full bg-base-100 py-32" data-theme="fantasy">
	<div class="hms-container">
		{#if galleryImages?.length}
			<div class="w-full">
				<h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">Photo Gallery</h2>
				<div class="mt-2 w-full">
					<div class="grid grid-cols-1 place-items-center gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
						{#each galleryImages as item, i}
							<div class="flex h-full w-full items-center justify-center">
								<img
									class="h-full w-full shadow-md hover:opacity-75"
									src={`https://itkrfzkrbqgsscxcveae.supabase.co/storage/v1/object/public/gallery/images/${item?.name}`}
									alt="gallery image {i}"
									width="100%"
									height="100%"
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		{#if galleryVideos?.length}
			<div class="mt-8 w-full">
				<h2 class="text-xl font-semibold md:text-2xl lg:text-3xl">Video Gallery</h2>
				<div class="mt-2 w-full">
					<div class="grid grid-cols-1 place-items-center gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
						{#each galleryVideos as item, i}
							<!-- svelte-ignore a11y-media-has-caption -->
							<video controls class=" shadow-md">
								<source
									src={`https://itkrfzkrbqgsscxcveae.supabase.co/storage/v1/object/public/gallery/video/${item?.name}`}
									type="video/mp4"
								/>

								Your browser does not support the video tag.
							</video>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
