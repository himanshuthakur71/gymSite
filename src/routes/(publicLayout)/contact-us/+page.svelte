<script>
	import ContactForm from '$lib/Components/ContactForm.svelte';
	import Header from '$lib/Components/Header.svelte';
</script>

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
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d415.33466843698875!2d77.30123684994595!3d28.96197634890874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c519af625ea05%3A0x42ff0da83f71a536!2sMeetli%2C%20Uttar%20Pradesh%20250601!5e1!3m2!1sen!2sin!4v1718529376405!5m2!1sen!2sin"
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
									href="tel:+919058884985"
									class="flex items-center gap-1 text-lg hover:link-primary"
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
									+91.9058884985
								</a>
							</li>
							<li class="mt-2">
								<p class="flex items-center gap-1">
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
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
