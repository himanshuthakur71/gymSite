<script>
	import Header from '$lib/Components/Header.svelte';
</script>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-SCP7Pp2-X3-1599x900.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				WHAT’S <span class="text-primary">INCLUDED?</span>
			</h1>
		</div>
	</div>
</div>

<section class="my-16 lg:my-32">
	<div class="hms-container">
		<div class="grid w-full grid-cols-1 gap-4 text-lg lg:text-xl">
			<p>
				Our boutique fitness gym offers members three flexible <a
					href="/memberships"
					class="link-hover link-primary">membership packages</a
				> (Live Coaching 8, 12 & 16) with different levels of benefits so that you can choose the right
				mix and frequency of workout options which meet your budget and your needs.
			</p>

			<p>Each of our membership packages includes:</p>

			<ul class=" list-disc pl-4">
				<li>
					A custom, personalized workout plan tailored to your current fitness capabilities, goals &
					requirements
				</li>

				<li class="mt-2">
					The Advanced Wellness proprietary suite of fitness services led by our professional team
					of fitness experts:
					<ul class=" mt-2 list-disc pl-8">
						<li class="mt-2">A one-on-one introductory training sessions</li>
						<li class="mt-2">A customized, individual workout plan</li>
						<li class="mt-2">A Nutrition Tips Session</li>
						<li class="mt-2">Semi-private training sessions: 6:1 client-to-trainer ratio</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="pt-16">
			<a href="/" class="btn btn-primary px-8 text-xl font-[600] uppercase">Back</a>
		</div>
	</div>
</section>
