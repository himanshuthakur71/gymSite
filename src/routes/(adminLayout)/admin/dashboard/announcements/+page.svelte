<script lang="ts">
	let { data }: { data: any } = $props();

	const announcements: any[] = data?.announcements ?? [];

	function formatDate(inputDate: string) {
		if (!inputDate) return '-';
		const date = new Date(inputDate);
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
	}
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Announcements</h1>
			<span class="text-gray-600">|</span>
			<a href="/admin/dashboard/announcements/new" class="link-hover font-[500] text-blue-500">Create New</a>
		</div>

		<div class="my-16">
			{#if announcements.length === 0}
				<p class="text-gray-400">No announcements yet.</p>
			{:else}
				<div class="grid w-full grid-cols-1 gap-4">
					{#each announcements as ann}
						<div class="w-full bg-base-200 p-4 shadow-md">
							<div class="flex items-start justify-between gap-4">
								<div class="flex-1">
									<h2 class="text-xl font-bold text-primary">{ann?.title}</h2>
									<p class="mt-2 text-gray-300 line-clamp-3">{ann?.message}</p>
								</div>
								<span class="shrink-0 text-sm text-gray-400">{ann?.created_at ? formatDate(ann.created_at) : '-'}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="mt-32">
			<a href="/admin/dashboard" class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a>
		</div>
	</div>
</section>
