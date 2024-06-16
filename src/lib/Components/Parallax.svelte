<section class="w-full">
	<div class="parallax bg-cover">
		<div class="w-full">
			<div class="hms-container">
				<div class="relative z-[2] w-full py-16 lg:py-32">
					<div class="grid grid-cols-1 lg:grid-cols-2">
						<div class="w-full">
							<h3
								class="mb-6 border-l-[10px] border-primary py-1 pl-[10px] text-3xl font-bold md:text-4xl lg:text-5xl"
							>
								WE’RE NOT LIKE ANY OTHER GYM IN <span class=" font-black italic">xxLOCATIONxx.</span
								>
							</h3>
							<p class="md:text-lg">
								Whether you want to get in shape with a personalized fitness training plan, break a
								sweat in a team environment, or reach peak athletic performance, our group of expert
								fitness coaches and community members are here to help you be your best self, every
								day.
							</p>
						</div>
						<div class="w-full">
							<div class="mx-auto w-full max-w-[320px] bg-black shadow-xl lg:max-w-[400px]">
								<div class=" relative flex w-full justify-center">
									<h4 class=" w-full bg-[#EADEDA] py-4 text-center text-xl font-black text-black">
										SPECIAL TRIAL OFFER
									</h4>
								</div>
								<div class="mx-auto w-full max-w-[340px] p-4">
									<p class=" mb-6 text-center">
										Sign up to begin your 1-week trial membership for only ₹99.
									</p>
									<form>
										<div class="grid w-full grid-cols-1 gap-4">
											<input
												type="text"
												placeholder="First name *"
												class="input input-bordered w-full"
											/>
											<input
												type="text"
												placeholder="Last name *"
												class="input input-bordered w-full"
											/>
											<input
												type="text"
												placeholder="Phone *"
												class="input input-bordered w-full"
											/>
											<input type="email" placeholder="Email" class="input input-bordered w-full" />

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
