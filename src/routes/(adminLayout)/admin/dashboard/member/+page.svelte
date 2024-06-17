<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	const members: any = data?.members || [];

	const onClickGoTo = (id: string) => {
		goto(`/admin/dashboard/member/${id}`);
	};
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" text-2xl lg:text-3xl">
				<strong>Members</strong>
				<span>|</span>
				<a href="/admin/dashboard/member/add" class=" link-hover text-blue-500">Add New</a>
			</h1>
		</div>

		<div class="mb-8 w-full bg-base-300 p-4">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">First name</span>
					</div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" required />
				</label>

				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Email</span>
					</div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" required />
				</label>

				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Phone Number</span>
					</div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" required />
				</label>

				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Is Paid</span>
					</div>
					<select class="select select-bordered">
						<option disabled selected value="">Select</option>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</select>
				</label>
			</div>
		</div>

		<div class="w-full bg-base-200 p-4">
			<table class="w-full text-left text-[18px]">
				<thead class=" text-primary">
					<th class="border-b border-r p-2 pb-4">First name</th>
					<th class="border-b border-r p-2 pb-4">Last name</th>
					<th class="border-b border-r p-2 pb-4">Phone number</th>
					<th class="border-b border-r p-2 pb-4">Email</th>
					<th class="border-b border-r p-2 pb-4">Gender</th>
					<th class="border-b border-r p-2 pb-4">Joining Date</th>
					<th class="border-b border-r p-2 pb-4">Free P/M</th>
					<th class="border-b border-r p-2 pb-4">Free Received</th>
					<th class="border-b p-2 pb-4">Timing</th>
				</thead>
				<tbody>
					{#each members as member}
						<tr
							on:click={() => onClickGoTo(member?.id)}
							class="cursor-pointer hover:link-info hover:bg-base-100"
						>
							<td class="border-b border-r p-2">{member?.first_name}</td>
							<td class="border-b border-r p-2">{member?.last_name}</td>
							<td class="border-b border-r p-2">{member?.phone_number}</td>
							<td class="border-b border-r p-2">{member?.email}</td>
							<td class="border-b border-r p-2">{member?.gender}</td>
							<td class="border-b border-r p-2">{member?.joining_date}</td>
							<td class="border-b border-r p-2">{member?.fee_pm}</td>
							<td class="border-b border-r p-2">{member?.fee_received}</td>
							<td class="border-b p-2">{member?.gym_time}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class=" mt-32">
			<a
				href="/admin/dashboard"
				class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a
			>
		</div>
	</div>
</section>
