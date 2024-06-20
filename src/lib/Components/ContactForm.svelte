<script lang="ts">
	import emailjs from '@emailjs/browser';

	let formFields = {
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		mesaage: ''
	};

	const sendEmail = async () => {
		var templateParams = {
			from_name: `${formFields?.first_name} ${formFields?.last_name}`,
			from_mobile: formFields?.phone,
			from_email: formFields?.email,
			message: formFields?.mesaage
		};

		emailjs.init({
			publicKey: 'fxNNEM5-t8JUTaGVl'
		});

		emailjs.send('service_yg3x2wb', 'template_d9a0hf7', templateParams).then(
			(response) => {
				console.log('SUCCESS!', response.status, response.text);
			},
			(error) => {
				console.log('FAILED...', error);
			}
		);
	};
</script>

<form on:submit|preventDefault={sendEmail}>
	<div class="grid w-full grid-cols-1 gap-4">
		<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text font-semibold">First Name *</span>
				</div>
				<input
					type="text"
					placeholder="First name"
					class="input input-bordered w-full"
					required
					bind:value={formFields.first_name}
				/>
			</label>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text font-semibold">Last Name *</span>
				</div>
				<input
					type="text"
					placeholder="Last name"
					class="input input-bordered w-full"
					required
					bind:value={formFields.last_name}
				/>
			</label>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text font-semibold">Email *</span>
				</div>
				<input
					type="email"
					placeholder="Email"
					class="input input-bordered w-full"
					required
					bind:value={formFields.email}
				/>
			</label>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text font-semibold">Phone *</span>
				</div>
				<input
					type="text"
					placeholder="Phone"
					class="input input-bordered w-full"
					required
					bind:value={formFields.phone}
				/>
			</label>
		</div>
		<label class="form-control">
			<div class="label">
				<span class="label-text font-semibold">Any Other Questions for Us?</span>
			</div>
			<textarea
				class="textarea textarea-bordered h-24"
				placeholder="Type here..."
				bind:value={formFields.mesaage}
			></textarea>
		</label>
	</div>
	<div class="mt-12 flex w-full flex-wrap justify-between gap-4">
		<button type="submit" class=" btn btn-accent btn-lg btn-block max-w-[180px] text-xl uppercase">
			Submit
		</button>

		<a
			href="/"
			class=" btn btn-outline btn-accent btn-lg btn-block max-w-[180px] text-xl uppercase"
		>
			Back
		</a>
	</div>
</form>
