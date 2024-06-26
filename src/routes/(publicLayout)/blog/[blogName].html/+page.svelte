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
			<p class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				FITNESS TIPS FROM <span class="text-primary">OUR TRAINERS</span>
			</p>
		</div>
	</div>
</div>

<section class="w-full bg-base-100 pb-32 pt-4" data-theme="fantasy">
	<div class="hms-container">
		<div class="w-full">
			<div class="breadcrumbs text-sm">
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/blog">Blogs</a></li>
					<li>{meta?.title}</li>
				</ul>
			</div>

			<div class="mt-6">
				<div class="date"><samp>{meta?.date}</samp></div>
				<div class="blog_cntt mt-4" style="width: 100%;">
					<svelte:component this={content} />
				</div>
				{#if meta?.authorName}
					<div
						class=" relative mt-[30px] flex items-center gap-[20px] pt-[15px] after:absolute after:left-0 after:top-0 after:block after:h-[2px] after:w-[30%] after:bg-primary"
					>
						{#if meta?.authorPhoto}
							<a href={meta?.linkedin} target="_blank">
								<figure
									class="h-[80px] w-[80px] overflow-hidden rounded-full border-4 border-primary"
								>
									<img
										src={meta?.authorPhoto}
										width="80"
										height="80"
										alt="article author"
										loading="lazy"
										class="h-full w-full object-cover"
									/>
								</figure>
							</a>
						{/if}
						<div class="flex flex-col gap-0">
							<i id="author-label">Author</i>
							<p>
								<a href={meta?.linkedin} target="_blank" class=" link hover:text-amber-700">
									<b>{meta?.authorName}</b>
								</a>
								<a href={meta?.linkedin} target="_blank" class="linkLink">
									<img src="/images/linkedin-48.png" alt="linkedin" width="30px" height="30px" />
								</a>
							</p>
						</div>
					</div>
				{/if}
			</div>

			<div class="hms-container pt-16">
				<a href="/" class="btn btn-accent px-8 text-xl font-[600] uppercase">Back</a>
			</div>
		</div>
	</div>
</section>
