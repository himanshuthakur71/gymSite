<section class="w-full py-16 lg:py-32">
	<div class="hms-container">
		<div class="w-full">
			<h2
				class="relative mb-8 flex justify-center pb-8 text-3xl font-black after:absolute after:bottom-0 after:block after:h-[10px] after:w-[70px] after:bg-primary md:text-4xl lg:text-5xl"
			>
				Our Approach to Fitness Gets Results.
			</h2>
			<p class="mb-4 text-center text-lg font-[500]">
				At Advanced Wellness, we know that customized fitness programs deliver superior results.
			</p>
			<p class="text-center">
				We have pioneered a boutique fitness program at our xxGymNamexx gym which uses a
				personalized workout to get you fit faster and trains you more effectively than traditional
				mainstream fitness programs. If you are ready to transform your body, health, and athletic
				performance goals into a reality, join our awesome community of fitness fans, athletes and
				professional fitness coaches and begin your journey to a more fit you, today.
			</p>
		</div>
	</div>
</section>

<section class="w-full bg-base-300 py-16">
	<div class="w-full">
		<h2
			class="relative z-[3] flex items-center justify-center bg-base-300 pb-8 text-center text-3xl md:text-4xl lg:text-5xl"
		>
			<span class="realtive">Ready to get started?</span>
		</h2>

		<div class="relative grid w-full grid-cols-1 gap-[15px] bg-primary lg:grid-cols-[1fr_1fr]">
			<span
				class=" absolute -top-[50px] left-[calc(50%-49px)] z-[2] flex h-[100px] w-[100px] rotate-45 bg-primary"
			></span>
			<a
				href="/"
				class="link-hover flex items-center justify-center rounded-md bg-[url(/images/capsule-fitness_fans-orange.jpg)] py-28 text-2xl font-semibold uppercase shadow-md hover:opacity-85 lg:text-3xl"
			>
				<span>For Fitness Fans</span>
			</a>

			<a
				href="/"
				class="link-hover flex items-center justify-center rounded-md bg-[url(/images/capsule-athletes-blue.jpg)] py-28 text-2xl font-semibold uppercase shadow-md hover:opacity-85 lg:text-3xl"
			>
				<span>For Athletes</span>
			</a>
		</div>
	</div>
</section>

<section class="w-full bg-base-100 py-32" data-theme="fantasy">
	<div class="hms-container">
		<div class="grid w-full grid-cols-1 gap-16">
			{#each Array(5) as blog, i}
				{#if i % 2 == 0}
					<div class="w-full shadow">
						<div class="grid grid-cols-1 gap-4 overflow-hidden rounded bg-base-200 lg:grid-cols-2">
							<figure class="flex h-full w-full">
								<img
									src="/images/i-TL6V8z7-X3-570x300.jpg"
									alt="A CUSTOMIZED FITNESS PROGRAM – JUST FOR YOU"
									class="h-full w-full"
								/>
							</figure>
							<div class="h-full w-full p-4">
								<div class="flex h-full w-full flex-col justify-center gap-4">
									<div class="w-full">
										<h2 class=" mb-[10px] text-2xl font-bold md:text-3xl">
											Lorem ipsum dolor sit amet.
										</h2>
										<p>
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. At nihil hic
											repudiandae voluptates vitae! Magni labore cumque aut iste amet!
										</p>
									</div>
									<div class="">
										<button class="btn btn-primary">Learn more</button>
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
											Lorem ipsum dolor sit amet.
										</h2>
										<p>
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. At nihil hic
											repudiandae voluptates vitae! Magni labore cumque aut iste amet!
										</p>
									</div>
									<div class="">
										<button class="btn btn-primary">Learn more</button>
									</div>
								</div>
							</div>
							<figure class="flex h-full w-full">
								<img
									src="/images/i-TL6V8z7-X3-570x300.jpg"
									alt="A CUSTOMIZED FITNESS PROGRAM – JUST FOR YOU"
									class="h-full w-full"
								/>
							</figure>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class=" mt-16 flex items-center justify-center">
			<a href="/" class="btn btn-accent btn-lg btn-block max-w-[320px]">See More</a>
		</div>
	</div>
</section>
