<script lang="ts">
	import { browser } from '$app/environment';
	import { supabase } from '$lib/supabaseClient.js';

	export let data;

	const gym_plans: any = data?.gym_plans;

	const deletePlan = async (id: any) => {
		const { error } = await supabase.from('gym_plans').delete().eq('plan_id', id);
		if (!error) {
			browser && window.location.reload();
		}
	};
</script>

<section class="my-16">
	<div class="hms-container">
		<div
			class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl"
		>
			<h1>Plans</h1>
			<span class=" text-gray-600">|</span>
			<a href="/admin/dashboard/plans/new" class=" link-hover font-[500] text-blue-500">Add</a>
		</div>

		<div class="my-16">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				{#each gym_plans as plan}
					<div class="relative grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md">
						<div class=" absolute right-2 top-2 flex gap-4">
							<a href="/admin/dashboard/plans/{plan?.plan_id}" class="btn btn-primary btn-sm"
								>Edit</a
							>
							<button
								on:click={() => deletePlan(plan?.plan_id)}
								type="button"
								class="btn btn-error btn-sm">Delete</button
							>
						</div>
						<h2 class="flex flex-col text-lg">
							<span>Plan Name:</span>
							<strong>{plan?.plan_name}</strong>
						</h2>

						<p class="flex flex-col text-lg">
							<span>Complete Amount:</span>
							<strong>{plan?.plan_amount}</strong>
						</p>

						<p class="flex flex-col text-lg">
							<span>Month:</span>
							<strong>{plan?.plan_time}</strong>
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
