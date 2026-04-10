<script lang="ts">
	let { data }: { data: any } = $props();

	const member: any = data?.member;
	const gym_plans: any[] = data?.gym_plans ?? [];

	const currentPlan = $derived(gym_plans.find((p) => String(p?.plan_amount) === String(member?.fee_pm)) ?? null);

	function formatDate(inputDate: string) {
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		const [y, m, d] = inputDate.split('-').map(Number);
		const date = new Date(y, m - 1, d);
		return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
	}

	const daysRemaining = $derived(() => {
		if (!member?.end_date) return 0;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const [y, m, d] = member.end_date.split('-').map(Number);
		const end = new Date(y, m - 1, d);
		return Math.ceil((end.getTime() - today.getTime()) / 86400000);
	});

	const daysLabel = $derived(() => {
		const days = daysRemaining();
		if (days < 0) return `Expired ${Math.abs(days)} days ago`;
		if (days === 0) return 'Expires today';
		return `${days} days remaining`;
	});

	const daysBadgeClass = $derived(() => {
		const days = daysRemaining();
		if (days <= 0) return 'badge-error';
		if (days <= 7) return 'badge-warning';
		return 'badge-success';
	});
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class="border-b border-b-gray-600 pb-4 text-2xl lg:text-3xl">
				<strong>View Member</strong>
				<span class="text-gray-600">|</span>
				<a href="/admin/dashboard/member/{member?.id}" class="link-hover text-blue-500">Edit</a>
			</h1>
		</div>

		<section class="grid grid-cols-1 gap-10 text-lg">
			<div class="w-full">
				<h2 class="mb-4 flex max-w-[420px] flex-wrap items-center gap-2 border-b-2 border-secondary pb-2 text-2xl font-bold text-primary">
					Personal Info
					{#if member?.status === 'active'}<span class="badge badge-accent">Active</span>{/if}
					{#if member?.status === 'in-active'}<span class="badge badge-error">In Active</span>{/if}
					<span class="badge {daysBadgeClass()}">{daysLabel()}</span>
				</h2>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4 text-base-content lg:grid-cols-2">
					<p><strong>Member ID:</strong> {member?.id}</p>
					<p><strong>Name:</strong> {member?.first_name} {member?.last_name}</p>
					<p><strong>Phone:</strong> {member?.phone_number}</p>
					<p><strong>Email:</strong> {member?.email || '-'}</p>
					<p><strong>Gender:</strong> {member?.gender}</p>
					<p><strong>Aadhar No:</strong> {member?.aadhar_number || '-'}</p>
					<p><strong>Age:</strong> {member?.age} years</p>
					<p><strong>Father Name:</strong> {member?.father_name || '-'}</p>
					<p><strong>Mother Name:</strong> {member?.mother_name || '-'}</p>
					<p><strong>Address:</strong> {member?.address || '-'}</p>
				</div>
			</div>

			<div class="w-full">
				<h2 class="mb-4 max-w-[320px] border-b-2 border-secondary pb-2 text-2xl font-bold text-primary">Gym Info</h2>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4 text-base-content lg:grid-cols-2">
					<p><strong>Plan:</strong> {currentPlan?.plan_name ?? '-'}</p>
					<p><strong>Duration:</strong> {currentPlan?.plan_time ?? '-'} month(s)</p>
					<p><strong>Batch:</strong> {member?.gym_time}</p>
					<p><strong>Joining Date:</strong> {member?.joining_date ? formatDate(member.joining_date) : '-'}</p>
					<p><strong>End Date:</strong> {member?.end_date ? formatDate(member.end_date) : '-'}</p>
					<p><strong>Total Amount:</strong> ₹{currentPlan?.plan_amount ?? member?.fee_pm}</p>
					<p><strong>Amount Received:</strong> ₹{member?.fee_received}</p>
					<p class="text-error"><strong>Amount Due:</strong> ₹{member?.due_amount ?? 0}</p>
				</div>
			</div>
		</section>

		<div class="mt-32">
			<a href="/admin/dashboard/member" class="btn btn-outline btn-primary btn-block max-w-[120px] text-xl font-[500]">Back</a>
		</div>
	</div>
</section>
