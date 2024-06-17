<script lang="ts">
	export let data;
	const { members } = data;
	console.log(members);
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
			<table class="w-full text-left text-[16px]">
				<thead>
					<th>First name</th>
					<th>Last name</th>
					<th>Phone number</th>
					<th>Email</th>
					<th>Gender</th>
					<th>Joining Date</th>
					<th>Free P/M</th>
					<th>Free Paid</th>
				</thead>
			</table>
		</div>
	</div>
</section>
