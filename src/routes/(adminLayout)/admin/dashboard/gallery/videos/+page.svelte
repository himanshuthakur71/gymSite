<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';

	let { data }: { data: any } = $props();

	const galleryVideos: any[] = data?.galleryVideos ?? [];

	let input: HTMLInputElement;
	let showVideo = $state('');
	let loading = $state(false);

	async function onChange() {
		const file = input.files?.[0];
		if (!file) { showVideo = ''; return; }
		uploadToServer(file);
		const reader = new FileReader();
		reader.addEventListener('load', () => { showVideo = reader.result as string; });
		reader.readAsDataURL(file);
	}

	function deletePreview() {
		showVideo = '';
	}

	async function deleteBucketVideo(name: string) {
		const { data } = await supabase.storage.from('gallery').remove([`video/${name}`]);
		if (data) await invalidateAll();
	}

	async function uploadToServer(fil: File) {
		loading = true;
		try {
			const { data, error } = await supabase.storage.from('gallery').upload(`video/${fil.name}`, fil);
			if (error) console.error('Error uploading file:', error);
			if (data) { showVideo = ''; await invalidateAll(); }
		} finally {
			loading = false;
		}
	}

	const deleteIcon = `<path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1" />`;
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">Upload & Delete Videos in Gallery Page</h1>
		</div>

		<div class="w-full">
			<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#if showVideo}
					<div class="z-depth-2-hover z-depth-1 relative flex w-full flex-shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[25px] bg-base-200 px-[15] py-[15px] hover:bg-base-300">
						<button type="button" onclick={deletePreview} title="Delete" class="btn btn-square btn-error btn-sm absolute right-[0px] top-[0px] z-[2] rounded-none">
							<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32">{@html deleteIcon}</svg>
						</button>
						<!-- svelte-ignore a11y-media-has-caption -->
						<video controls><source src={showVideo} type="video/mp4" />Your browser does not support the video tag.</video>
					</div>
				{:else}
					<label for="avatar" class="z-depth-2-hover z-depth-1 relative flex w-full flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[25px] bg-base-200 px-[15] py-[15px] hover:bg-base-300">
						{#if loading}<span class="loading absolute top-6"></span>{/if}
						<input accept="video/mp4" id="avatar" name="avatar" type="file" class="absolute z-[2] h-full w-full cursor-pointer opacity-0" bind:this={input} onchange={onChange} disabled={loading} />
						<iconify-icon icon="line-md:upload-loop" width="5em" height="5em" class="text-primary"></iconify-icon>
						<p class="text-2xl font-bold">Upload mp4</p>
						<p>or Drag and Drop</p>
					</label>
				{/if}

				{#each galleryVideos as item}
					<div class="z-depth-2-hover z-depth-1 relative flex w-full flex-shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[25px] bg-base-200 px-[15] py-[15px] hover:bg-base-300">
						<button type="button" onclick={() => deleteBucketVideo(item?.name)} title="Delete" class="btn btn-square btn-error btn-sm absolute right-[0px] top-[0px] z-[2] rounded-none">
							<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32">{@html deleteIcon}</svg>
						</button>
						<!-- svelte-ignore a11y-media-has-caption -->
						<video controls>
							<source src={`${PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/video/${item?.name}`} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				{/each}
			</div>

			<div class="mt-32">
				<a href="/admin/dashboard/gallery" class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a>
			</div>
		</div>
	</div>
</section>
