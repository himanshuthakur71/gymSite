<script lang="ts">
	import emailjs from '@emailjs/browser';
	import { fly } from 'svelte/transition';

	let sucess = false;

	let formFields = {
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		mesaage: 'Hi I want a SPECIAL TRIAL OFFER'
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
				// console.log('SUCCESS!', response.status, response.text);
				sucess = true;
				formFields = {
					first_name: '',
					last_name: '',
					email: '',
					phone: '',
					mesaage: 'Hi I want a SPECIAL TRIAL OFFER'
				};
			},
			(error) => {
				console.log('FAILED...', error);
			}
		);
	};
</script>

<section class="w-full">
	<div class="parallax bg-cover">
		<div class="w-full">
			<div class="hms-container">
				<div class="relative z-[2] w-full py-16 lg:py-32">
					<div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2">
						<div class="w-full">
							<h3
								class="mb-6 border-l-[10px] border-primary py-1 pl-[10px] text-3xl font-bold md:text-4xl lg:text-5xl"
							>
								WE’RE NOT LIKE ANY OTHER GYM IN <span class=" font-black italic"
									>Meetli, Baghpat.</span
								>
							</h3>
							<p class="md:text-lg">
								Whether you want to get in shape with a personalized fitness training plan, break a
								sweat in a team environment, or reach peak athletic performance, our group of expert
								fitness coaches and community members are here to help you be your best self, every
								day.
							</p>
							<div class="mt-8">
								<a href="/join" class="px btn btn-success btn-lg rounded px-8 text-3xl uppercase"
									>Join Us</a
								>
							</div>
						</div>
						<div class="w-full">
							<div class="mx-auto w-full bg-black shadow-xl lg:max-w-[400px]">
								<div class=" relative flex w-full justify-center">
									<h4 class=" w-full bg-[#EADEDA] py-4 text-center text-xl font-black text-black">
										SPECIAL TRIAL OFFER
									</h4>
								</div>
								<div class="mx-auto w-full p-4 lg:max-w-[340px]">
									<p class=" mb-6 text-center">
										Sign up to begin your 1-week trial membership for only ₹399.
									</p>
									{#if sucess}
										<div
											role="alert"
											class="alert alert-success mb-4"
											transition:fly={{ y: -50, duration: 500 }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-6 w-6 shrink-0 stroke-current"
												fill="none"
												viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												/></svg
											>
											<span>We will Contact you Shrotly...</span>
										</div>
									{/if}
									<form on:submit|preventDefault={sendEmail}>
										<div class="grid w-full grid-cols-1 gap-4">
											<input
												type="text"
												placeholder="First name *"
												class="input input-bordered w-full"
												required
												bind:value={formFields.first_name}
											/>
											<input
												type="text"
												placeholder="Last name *"
												class="input input-bordered w-full"
												required
												bind:value={formFields.last_name}
											/>
											<input
												type="text"
												placeholder="Phone *"
												class="input input-bordered w-full"
												required
												bind:value={formFields.phone}
											/>
											<input
												type="email"
												placeholder="Email"
												class="input input-bordered w-full"
												required
												bind:value={formFields.email}
											/>

											<button type="submit" class="btn btn-primary text-xl font-semibold uppercase"
												>Submit</button
											>
											<p class="text-center text-[14px]">
												<small>* We won’t share your personal information with anyone. *</small>
											</p>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.parallax {
		position: relative;
		/* Set a specific height */
		/* height: 500px; */
		/* Create the parallax scrolling effect */
		background-attachment: fixed;
		/* background-position: center; */
		background-repeat: no-repeat;
		background-size: cover;

		background-image: url('/images/i-KmTrQTQ-X3-2-1600x1146.jpg');
		background-position: 50% -90.9187px;
		color: white;
	}

	.parallax::after {
		content: '';
		background-color: rgba(0, 0, 0, 0.62);
		left: 0;
		position: absolute;
		top: 0;
		-webkit-transition: all 0.2s ease-in-out;
		-moz-transition: all 0.2s ease-in-out;
		-ms-transition: all 0.2s ease-in-out;
		-o-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
