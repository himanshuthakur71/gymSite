<script>
	export let blogs;
</script>

<div class="grid w-full grid-cols-1 gap-16">
	{#each blogs as blog, i}
		{#if i < 6}
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
		{/if}
	{/each}
</div>
