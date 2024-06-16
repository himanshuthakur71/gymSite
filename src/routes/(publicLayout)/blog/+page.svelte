<script>
	import Header from '$lib/Components/Header.svelte';
	export let data;
	const { blogs } = data;
</script>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-VM7Td7N-X3-1-1600x900.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				FITNESS TIPS FROM <span class="text-primary">OUR TRAINERS</span>
			</h1>
		</div>
	</div>
</div>

<section class="w-full bg-base-100 py-32" data-theme="fantasy">
	<div class="hms-container">
		<div class="grid w-full grid-cols-1 gap-16">
			{#each blogs as blog, i}
				{#if i % 2 == 0}
					<div class="w-full shadow">
						<div class="grid grid-cols-1 gap-4 overflow-hidden rounded bg-base-200 lg:grid-cols-2">
							<figure class="flex h-full w-full">
								<img src={blog?.faceIamge} alt={blog?.title} class="h-full w-full" />
							</figure>
							<div class="h-full w-full p-4">
								<div class="flex h-full w-full flex-col justify-center gap-4">
									<div class="w-full">
										<h2 class=" mb-[10px] text-2xl font-bold md:text-3xl">
											{blog?.title}
										</h2>
										<p>
											{blog?.demoContent}
										</p>
									</div>
									<div class="">
										<a href="/blog/{blog?.slug}.html" class="btn btn-primary">Learn more</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				{:else if i % 2 != 0}
					<div class="w-full shadow">
						<div class="grid grid-cols-1 gap-4 overflow-hidden rounded bg-base-200 lg:grid-cols-2">
							<div class="h-full w-full p-4">
								<div class="flex h-full w-full flex-col justify-center gap-4">
									<div class="w-full">
										<h2 class=" mb-[10px] text-2xl font-bold md:text-3xl">
											{blog?.title}
										</h2>
										<p>
											{blog?.demoContent}
										</p>
									</div>
									<div class="">
										<a href="/blog/{blog?.slug}.html" class="btn btn-primary">Learn more</a>
									</div>
								</div>
							</div>
							<figure class="flex h-full w-full">
								<img src={blog?.faceIamge} alt={blog?.title} class="h-full w-full" />
							</figure>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class=" mt-16 flex items-center justify-center">
			<a href="/blog" class="btn btn-accent btn-lg btn-block max-w-[320px]">See More</a>
		</div>
	</div>
</section>
