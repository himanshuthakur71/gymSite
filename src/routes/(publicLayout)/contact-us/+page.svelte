<script>
	import ContactForm from '$lib/Components/ContactForm.svelte';
	import Header from '$lib/Components/Header.svelte';
</script>

<svelte:head>
	<title>Contact Us - Fitness Academy</title>
	<link rel="canonical" href="https://www.fitnessacademygym.com/contact-us" />
</svelte:head>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-WQmMjBX-X3-1600x695.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				CONTACT <span class="text-primary">US</span>
			</h1>
		</div>
	</div>
</div>

<section class="w-full bg-base-100 py-32" data-theme="fantasy">
	<div class="hms-container">
		<div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_0.5fr]">
			<div class="w-full">
				<h2 class="text-xl md:text-2xl">
					Please use the form below to contact us online and someone will respond to you shortly. We
					look forward to hearing from you!
				</h2>
				<div class="mt-8 w-full">
					<ContactForm />
				</div>
			</div>
			<div class="w-full">
				<div class="w-full">
					<iframe
						title="google map location"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.6659937877957!2d77.3022743!3d28.9623301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c511d08b98719%3A0x4708af98fd71cd6d!2sFitness%20academy!5e1!3m2!1sen!2sin!4v1718529926255!5m2!1sen!2sin"
						width="100%"
						height="250"
						style="border:0;"
						allowfullscreen
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
				<div class="mt-8 w-full">
					<h3 class=" border-b border-accent pb-2 font-bold lg:text-2xl">Get In Touch</h3>

					<div class=" mt-4">
						<ul>
							<li>
								<a
									href="tel:+919058884925"
									class="flex items-center gap-4 text-lg hover:link-primary"
								>
									<figure class=" flex items-center justify-center rounded-full bg-accent p-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20px"
											height="20px"
											viewBox="0 0 24 24"
										>
											<path
												fill="currentColor"
												d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
											/>
										</svg>
									</figure>
									+91.9058884925
								</a>
							</li>
							<li class="mt-2">
								<div class="flex items-start gap-4">
									<div>
										<figure class=" flex items-center justify-center rounded-full bg-accent p-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="20px"
												height="20px"
												viewBox="0 0 24 24"
											>
												<g fill="none">
													<path
														d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
													/>
													<path
														fill="currentColor"
														d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"
													/>
												</g>
											</svg>
										</figure>
									</div>
									<p class="grid">
										<span><b>Morning</b> 5am to 11am Male </span>
										<span><b>Afternoon</b> 11am to 4pm Female </span>
										<span><b>Evening</b> 4:30pm to 10pm Male</span>
									</p>
								</div>
							</li>
							<li class="mt-2">
								<a
									target="_blank"
									href="https://www.google.com/maps?ll=28.96233,77.302274&z=15&t=h&hl=en&gl=IN&mapclient=embed&cid=5118534048128552301"
									class="flex items-center gap-4"
								>
									<figure class=" flex items-center justify-center rounded-full bg-accent p-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20px"
											height="20px"
											viewBox="0 0 24 24"
										>
											<path
												fill="currentColor"
												d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
											/>
										</svg>
									</figure>

									Meetli, Baghpat (UP) INDIA
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
