<script lang="ts">
	import Header from '$lib/Components/Header.svelte';
	import { page } from '$app/stores';
	export let data: any;

	// const { meta, content } = data;

	$: meta = data?.meta;
	$: content = data?.content;

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://www.fitnessacademygym.com/blog/${$page?.params?.blogName}.html`
		},
		headline: data?.meta?.title,
		description: data?.meta?.demoContent,
		author: {
			'@type': 'Organization',
			name: data?.meta?.authorName,
			url: data?.meta?.linkedin
		},
		publisher: {
			'@type': 'Organization',
			name: 'https://www.fitnessacademygym.com/',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.fitnessacademygym.com/images/logo_gym-removebg-preview.png'
			}
		},
		datePublished: data?.meta?.date
	};
</script>

<svelte:head>
	<title>{meta?.title}</title>
	<meta name="description" content={meta?.description} />
	<link
		rel="canonical"
		href="https://www.fitnessacademygym.com/blog/${$page?.params?.blogName}.html"
	/>

	{@html `<script type="application/ld+json">` + JSON.stringify(schema) + `</script>`}
</svelte:head>

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
