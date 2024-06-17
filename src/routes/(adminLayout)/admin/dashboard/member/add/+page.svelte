<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let formfields = {
		first_name: 'Himanshu',
		last_name: 'Thakur',
		phone_number: '7500073815',
		email: 'himanshu@mail.com',
		gender: 'male',
		joining_date: '2024-06-17',
		aadhar_number: '7855sdjhjhsd89955',
		age: '26',
		gym_time: 'evening',
		fee_pm: '700',
		fee_received: '0',
		father_name: 'Satish Pundir',
		mother_name: 'Babita Pundir',
		address: 'Vill/Post: Pipalshah, Charthawal'
	};
	let loading = false;
	let saveSucess = false;

	const add_member = async () => {
		loading = true;

		try {
			const { data, error } = await supabase.from('members').insert([formfields]).select();

			if (data) {
				saveSucess = true;
			}
		} finally {
			loading = false;
		}
	};
</script>

<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" text-2xl lg:text-3xl">Add New Members</h1>
		</div>

		<form on:submit|preventDefault={add_member}>
			<div class="grid w-full grid-cols-1 gap-4 bg-base-200 p-4">
				<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">First name *</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.first_name}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Last name *</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.last_name}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Phone number *</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.phone_number}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Email *</span>
						</div>
						<input
							type="email"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.email}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Gender *</span>
						</div>

						<select class="select select-bordered" bind:value={formfields.gender}>
							<option disabled selected value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">other</option>
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Joining Date</span>
						</div>
						<input
							type="date"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.joining_date}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Address</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.address}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Aadhar number(Unique ID)</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.aadhar_number}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Age</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.age}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Gym Time</span>
						</div>
						<select class="select select-bordered" required bind:value={formfields.gym_time}>
							<option disabled selected value="">Select</option>
							<option value="morning">Morning </option>
							<option value="afternoon">Afternoon </option>
							<option value="evening">Evening </option>
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Amount to pay/month</span>
						</div>
						<input
							type="number"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.fee_pm}
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Amount Recived</span>
						</div>
						<input
							type="number"
							placeholder="Type here"
							class="input input-bordered w-full"
							required
							bind:value={formfields.fee_received}
						/>
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Father's name</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.father_name}
						/>
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Mother's name</span>
						</div>
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full"
							bind:value={formfields.mother_name}
						/>
					</label>
				</div>
			</div>

			<div class="mt-6 flex justify-between">
				<button
					disabled={loading}
					type="submit"
					class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]"
				>
					Save
					{#if loading}
						<span class="loading"></span>
					{/if}
				</button>

				<a
					href="/admin/dashboard/member"
					class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]"
				>
					Cancel
				</a>
			</div>
		</form>
	</div>
</section>

{#if saveSucess}
	<dialog id="my_modal_1" class="modal" open>
		<div class="modal-box bg-base-300">
			<h3 class="text-lg font-bold">Sucess</h3>
			<p class="py-4">Member add sucessfully</p>
			<div class=" mt-8 flex justify-center">
				<a data-sveltekit-reload href="/admin/dashboard/member" class="btn btn-primary btn-wide"
					>Continue</a
				>
			</div>
		</div>
	</dialog>
{/if}
