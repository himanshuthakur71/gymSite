<script>
	import Header from '$lib/Components/Header.svelte';
	import Parallax from '$lib/Components/Parallax.svelte';
</script>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-8XTLLXG-X3-1600x900.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				SPECIAL <span class="text-primary">OFFERS</span>
			</h1>
		</div>
	</div>
</div>

<div class="">
	<Parallax />

	<div class="hms-container py-16">
		<a href="/" class="btn btn-primary px-8 text-xl font-[600] uppercase">Back</a>
	</div>
</div>
