<script>
	import ContactForm from '$lib/Components/ContactForm.svelte';
	import Header from '$lib/Components/Header.svelte';
</script>

<svelte:head>
	<title>Join Fitness Academy Gym - Fitness Academy</title>
	<link rel="canonical" href="https://www.fitnessacademygym.com/join" />
</svelte:head>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-ScdDBqD-X3-1-1600x866.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				JOIN <span class="text-primary">US</span>
			</h1>
		</div>
	</div>
</div>

<section class="w-full bg-base-100 py-32" data-theme="fantasy">
	<div class="hms-container">
		<h2 class="text-xl md:text-2xl lg:text-3xl">
			We’re psyched you want to become a member at <strong>FITNESS ACADEMY!</strong>
		</h2>
		<div class="mt-8 w-full">
			<ContactForm />
		</div>
	</div>
</section>
