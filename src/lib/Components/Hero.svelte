<script>
	import Header from './Header.svelte';
</script>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/slider-01.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1
				class="flex w-full flex-col items-end border-r-8 border-primary py-1 pr-4 text-end text-4xl font-black md:text-5xl"
			>
				<span>A fun Fitness Gym.</span>
				<span>In your hood.</span>
				<span>Focused 100% on you.</span>
			</h1>
			<a href="/join" class="px btn btn-success btn-lg rounded px-8 text-3xl uppercase">Join Us</a>
		</div>
	</div>
</div>
