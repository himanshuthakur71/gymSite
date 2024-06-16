<script>
	import Header from '$lib/Components/Header.svelte';
	import WhyUsFaq from '$lib/Components/WhyUsFAQ.svelte';
</script>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-RPPt4xk-X3-1500x900.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				WHY <span class=" text-primary">FITNESS ACADEMY</span>
			</h1>
		</div>
	</div>
</div>

<section class="w-full py-16 lg:py-32">
	<div class="hms-container">
		<div class="w-full">
			<p class="text-lg">
				We know you have lots of choices when it comes to fitness options in a coaching team and
				gym. But here’s why we believe we have pioneered a new way of training which delivers better
				results for our members.
			</p>

			<div class="mt-16 w-full">
				<WhyUsFaq />
			</div>
		</div>
	</div>
</section>
