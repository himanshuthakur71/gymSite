<script lang="ts">
	import BlogsSections from '$lib/Components/BlogsSections.svelte';
	import Hero from '$lib/Components/Hero.svelte';
	import Parallax from '$lib/Components/Parallax.svelte';
	import PriceBox from '$lib/Components/PriceBox.svelte';
	import WhyUsFaq from '$lib/Components/WhyUsFAQ.svelte';

	export let data;
	const { blogs } = data;
</script>

<svelte:head>
	<title>Fitness Academy Gym | Personal Trainers & Coaches | Fitness Academy</title>
	<meta
		name="description"
		content="Fitness Academy is a unique Meetli, Baghpat fitness gym offering an innovative, highly-individualized performance program with personal training, and semi-private training sessions and group fitness team training for athletes and fitness fans at all levels of ability."
	/>
</svelte:head>

<Hero />

<main>
	<section class="w-full py-16 lg:py-32">
		<div class="hms-container">
			<div class="w-full">
				<h2
					class="relative mb-8 flex justify-center pb-8 text-3xl font-black after:absolute after:bottom-0 after:block after:h-[10px] after:w-[70px] after:bg-primary md:text-4xl lg:text-5xl"
				>
					Our Approach to Fitness Gets Results.
				</h2>
				<p class="mb-4 text-center text-lg font-[500]">
					At FITNESS ACADEMY, we know that customized fitness programs deliver superior results.
				</p>
				<p class="text-center">
					We have pioneered a boutique fitness program at our FITNESS ACADEMY gym which uses a
					personalized workout to get you fit faster and trains you more effectively than
					traditional mainstream fitness programs. If you are ready to transform your body, health,
					and athletic performance goals into a reality, join our awesome community of fitness fans,
					athletes and professional fitness coaches and begin your journey to a more fit you, today.
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
				<div
					class=" flex items-center justify-center rounded-md bg-[url(/images/capsule-fitness_fans-orange.jpg)] py-28 text-2xl font-semibold uppercase shadow-md lg:text-3xl"
				>
					<span>For Fitness Fans</span>
				</div>

				<div
					class=" flex items-center justify-center rounded-md bg-[url(/images/capsule-athletes-blue.jpg)] py-28 text-2xl font-semibold uppercase shadow-md lg:text-3xl"
				>
					<span>For Athletes</span>
				</div>
			</div>
		</div>
	</section>

	<section class="w-full bg-base-100 py-32" data-theme="fantasy">
		<div class="hms-container">
			<BlogsSections {blogs} />
			<div class=" mt-16 flex items-center justify-center">
				<a href="/blog" class="btn btn-accent btn-lg btn-block max-w-[320px]">See More</a>
			</div>
		</div>
	</section>

	<Parallax />
	<PriceBox />

	<section class="my-16 w-full lg:my-32">
		<div class="hms-container">
			<WhyUsFaq />
		</div>
	</section>
</main>
