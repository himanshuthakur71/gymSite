<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	let members: any = data?.members || [];

	const onClickGoTo = (id: string) => {
		goto(`/admin/dashboard/member/${id}`);
	};

	// Filter criteria
	let filterFirstName = '';
	let filterEmail = '';
	let filterPhone = '';
	let filterIsPaid = false;

	// Function to filter Members based on criteria
	function filterMembers() {
		members = data?.members || [];
		members = members.filter((member: any) => {
			return (
				(!filterFirstName || member?.first_name.includes(filterFirstName)) &&
				(!filterEmail || member?.email.includes(filterEmail)) &&
				(!filterPhone || member?.phone_number.includes(filterPhone))
			);
		});
	}

	// Function to clear all filters
	function clearFilters() {
		filterFirstName = '';
		filterEmail = '';
		filterPhone = '';
		filterIsPaid = false;
	}

	const showUnPaidOnly = () => {
		members = data?.members || [];
		members = members.filter((member: any) => {
			return !filterIsPaid || !member?.is_paid;
		});
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

		<div class="w-full">
			<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
				<div class="grid w-full grid-cols-1 gap-4 bg-base-200 p-4 shadow-md">
					<div class="grid w-full grid-cols-1 gap-4 bg-base-200 p-4 md:grid-cols-2">
						<p class="flex flex-col text-lg">
							<span>Name:</span>
							<strong>xxxxxxx</strong>
						</p>

						<p class="flex flex-col text-lg">
							<span>Mobile:</span>
							<strong>xxxxxxxxxx</strong>
						</p>

						<p class="flex flex-col text-lg">
							<span>Plan Expiry:</span>
							<strong>xxxxxxx</strong>
						</p>

						<p class="flex flex-col text-lg">
							<span>Due Amount:</span>
							<strong>xxxxxxx</strong>
						</p>
						<div class="flex w-full gap-4">
							<a href="/admin/dashboard/member" class="btn btn-accent btn-sm">View</a>
							<a href="/admin/dashboard/member" class="btn btn-primary btn-sm">Edit</a>
							<button type="button" class="btn btn-error btn-sm">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class=" mt-32">
			<a
				href="/admin/dashboard"
				class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a
			>
		</div>
	</div>
</section>
