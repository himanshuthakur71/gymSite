<script lang="ts">
	import { userStore } from '$lib/Stores/userStore';

	export let data;

	const todayExpricesmembers: any = data?.todayExpricesmembers;
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 text-2xl font-semibold lg:text-3xl">
			<h1>Hello, {$userStore?.user_metadata?.first_name}</h1>
		</div>

		<section class="mt-2">
			{#if todayExpricesmembers}
				<div class="mb-16 grid w-full grid-cols-1 gap-4">
					{#each todayExpricesmembers as member}
						<div role="alert" class="alert alert-warning">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 shrink-0 stroke-current"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/></svg
							>
							<span
								>Warning: <strong>{member?.first_name} {member?.last_name}</strong> membership will expire
								today.</span
							>
							<a href="/admin/dashboard/member/view/{member?.id}" class="btn btn-sm">view</a>
						</div>
					{/each}
				</div>
			{/if}

			<div class="mb-16 w-full">
				<h2 class="mb-8 border-b border-primary pb-2 text-xl font-semibold text-primary">
					Members Details
				</h2>
				<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<div class="w-full bg-base-300 px-6 py-2 shadow-md">
						<h2 class="text-lg font-[500]">Today</h2>
						<p class="text-[42px] font-bold text-accent lg:text-[52px]">00</p>
					</div>

					<div class="w-full bg-base-300 px-6 py-2 shadow-md">
						<h2 class="text-lg font-[500]">Week</h2>
						<p class="text-[42px] font-bold text-accent lg:text-[52px]">00</p>
					</div>

					<div class="w-full bg-base-300 px-6 py-2 shadow-md">
						<h2 class="text-lg font-[500]">Month</h2>
						<p class="text-[42px] font-bold text-accent lg:text-[52px]">00</p>
					</div>
				</div>
			</div>

			<div class="w-full">
				<h2 class="mb-8 border-b border-primary pb-2 text-xl font-semibold text-primary">
					Quick Access Links
				</h2>
				<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<a
						href="/admin/dashboard/member"
						class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
					>
						Members
					</a>
					<a
						href="/admin/dashboard/plans"
						class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
					>
						Plans
					</a>

					<a
						href="/admin/dashboard/batch"
						class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
					>
						Batch
					</a>
					<a
						href="/admin/dashboard/gallery"
						class="link-hover link-primary flex w-full items-center justify-center bg-base-200 px-4 py-16 text-3xl font-semibold"
					>
						Gallery
					</a>
				</div>
			</div>
		</section>
	</div>
</section>
