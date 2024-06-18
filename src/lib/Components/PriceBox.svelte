<script lang="ts">
	export let gymPlans: any;
</script>

<section class="w-full">
	<div class="w-full py-16">
		<div class="hms-container">
			<div class="w-full">
				<h2
					class="relative mb-8 flex justify-center pb-8 text-3xl font-black after:absolute after:bottom-0 after:block after:h-[10px] after:w-[70px] after:bg-primary md:text-4xl lg:text-5xl"
				>
					PRICING
				</h2>
				<p class="text-center text-lg font-[500]">CHOOSE THE RIGHT PLAN FOR YOUR NEEDS</p>
			</div>
		</div>
	</div>
	{#if gymPlans}
		<div class="w-full bg-white py-16">
			<div class="hms-container">
				<div class="w-full">
					<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{#each gymPlans as plan}
							<div class="w-full rounded bg-base-200 px-4 py-8 shadow-md">
								<p class=" mb-4 text-center text-3xl font-black lg:text-4xl">
									<sup class="text-primary">₹</sup>
									{plan?.plan_amount}
								</p>
								<h4 class=" lg:3xl text-center text-2xl">{plan?.plan_name}</h4>

								<ul
									class="mt-6 grid list-none grid-cols-1 gap-2 border-t border-primary pt-4 text-center md:text-lg"
								>
									<li><strong>{plan?.plan_time} Month</strong> membership</li>
									<li>Personalized Fitness Program Design</li>
									<li>8 Semi-Private Traning Sessions</li>
									<li>Great Coaching</li>
									<li>Awesome Community</li>
								</ul>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>
