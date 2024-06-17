<script lang="ts">
	import { browser } from '$app/environment';
	import { supabase } from '$lib/supabaseClient';

	export let data;

	const { galleryImages } = data;

	let input: any;

	let showImage: any = '';

	async function onChange() {
		const file = input.files[0];

		const { data, error } = await supabase.storage
			.from('gallery')
			.upload(`images/${file.name}`, file);

		if (error) {
			console.error('Error uploading file:', error);
		} else {
			console.log('File uploaded successfully:', data);
		}

		if (file) {
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				showImage = reader.result;
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = '';
	}

	function deleteImage() {
		input = null;
		showImage = '';
	}

	async function deleteBuketImage(name: string) {
		const { data, error } = await supabase.storage.from('gallery').remove([`images/${name}`]);

		if (data) {
			browser && window.location.reload();
		}
	}
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" text-2xl lg:text-3xl">Upload & Delete Photos in Gallery Page..</h1>
		</div>

		<div class="w-full">
			<div class="w-full">
				{#if showImage}
					<div
						class="z-depth-2-hover z-depth-1 relative flex h-[166px] w-full max-w-[231px] flex-shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[25px] bg-base-200 px-[15] py-[15px] hover:bg-base-300"
					>
						<button
							type="button"
							on:click={deleteImage}
							title="Delete"
							class="btn btn-square btn-error btn-sm absolute right-[0px] top-[0px] z-[2] rounded-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.2em"
								height="1.2em"
								viewBox="0 0 32 32"
							>
								<path
									fill="currentColor"
									d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"
								/>
							</svg>
						</button>
						<img src={showImage} alt="uploaded_imge" class="h-full w-full" />
					</div>
				{:else}
					<label
						for="avatar"
						class="z-depth-2-hover z-depth-1 relative flex h-[166px] w-full max-w-[231px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[25px] bg-base-200 px-[15] py-[15px] hover:bg-base-300"
					>
						<input
							accept="image/png, image/jpeg"
							id="avatar"
							name="avatar"
							type="file"
							class="absolute z-[2] h-full w-full cursor-pointer opacity-0"
							bind:this={input}
							on:change={onChange}
						/>
						<iconify-icon icon="line-md:upload-loop" width="5em" height="5em" class="text-primary"
						></iconify-icon>
						<p class="text-2xl font-bold">Upload Image</p>
						<p>or Drag and Drop</p>
					</label>
				{/if}

				{#each galleryImages as item}
					<div
						class="z-depth-2-hover z-depth-1 relative flex h-[166px] w-full max-w-[231px] flex-shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[25px] bg-base-200 px-[15] py-[15px] hover:bg-base-300"
					>
						<button
							type="button"
							on:click={() => deleteBuketImage(item?.name)}
							title="Delete"
							class="btn btn-square btn-error btn-sm absolute right-[0px] top-[0px] z-[2] rounded-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.2em"
								height="1.2em"
								viewBox="0 0 32 32"
							>
								<path
									fill="currentColor"
									d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"
								/>
							</svg>
						</button>
						<img
							src={`https://itkrfzkrbqgsscxcveae.supabase.co/storage/v1/object/public/gallery/images/${item?.name}`}
							alt="uploaded_imge"
							class="h-full w-full"
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
