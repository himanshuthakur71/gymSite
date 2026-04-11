<script lang="ts">
	import { fly } from 'svelte/transition';

	let success = $state(false);
	let loading = $state(false);
	let error = $state('');

	let formFields = $state({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		message: ''
	});

	async function sendEmail(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		error = '';
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...formFields, subject: `Enquiry from ${formFields.first_name} ${formFields.last_name}` })
			});
			if (!res.ok) throw new Error('Failed to send');
			success = true;
			formFields = { first_name: '', last_name: '', email: '', phone: '', message: '' };
		} catch {
			error = 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

{#if success}
	<div role="alert" class="alert alert-success mb-4" transition:fly={{ y: -50, duration: 500 }}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<span>Your message received. We will contact you shortly!</span>
	</div>
{/if}

{#if error}
	<div role="alert" class="alert alert-error mb-4">
		<span>{error}</span>
	</div>
{/if}

<form onsubmit={sendEmail}>
	<div class="grid w-full grid-cols-1 gap-4">
		<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
			<label class="form-control w-full">
				<div class="label"><span class="label-text font-semibold">First Name *</span></div>
				<input type="text" placeholder="First name" class="input input-bordered w-full" required bind:value={formFields.first_name} />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text font-semibold">Last Name *</span></div>
				<input type="text" placeholder="Last name" class="input input-bordered w-full" required bind:value={formFields.last_name} />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text font-semibold">Email *</span></div>
				<input type="email" placeholder="Email" class="input input-bordered w-full" required bind:value={formFields.email} />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text font-semibold">Phone *</span></div>
				<input type="text" placeholder="Phone" class="input input-bordered w-full" required bind:value={formFields.phone} />
			</label>
		</div>
		<label class="form-control">
			<div class="label"><span class="label-text font-semibold">Any Other Questions for Us?</span></div>
			<textarea class="textarea textarea-bordered h-24" placeholder="Type here..." bind:value={formFields.message}></textarea>
		</label>
	</div>
	<div class="mt-12 flex w-full flex-wrap justify-between gap-4">
		<button type="submit" disabled={loading} class="btn btn-accent btn-lg btn-block max-w-[180px] text-xl uppercase">
			{#if loading}<span class="loading loading-spinner loading-sm"></span>{/if}
			Submit
		</button>
		<a href="/" class="btn btn-outline btn-accent btn-lg btn-block max-w-[180px] text-xl uppercase">Back</a>
	</div>
</form>
