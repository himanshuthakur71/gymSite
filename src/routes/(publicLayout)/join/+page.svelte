<script>
	import Header from '$lib/Components/Header.svelte';
</script>

<div
	class="relative w-full border-b-[20px] border-primary bg-[url(/images/i-ScdDBqD-X3-1-1600x866.jpg)] bg-cover bg-center bg-no-repeat before:absolute before:block before:h-[110px] before:w-full before:bg-[rgba(0,0,0,0.6)] lg:before:h-[170px]"
>
	<Header />
	<div class="flex min-h-[calc(100vh-195px)] w-full items-center">
		<div class="flex w-full flex-col items-end gap-8 bg-[rgba(0,0,0,0.6)] px-[15px] py-4">
			<h1 class=" w-full border-primary py-1 text-center text-4xl font-black md:text-5xl">
				JOIN <span class="text-primary">US</span>
			</h1>
		</div>
	</div>
</div>

<section class="w-full bg-base-100 py-32" data-theme="fantasy">
	<div class="hms-container">
		<h2 class="text-xl md:text-2xl lg:text-3xl">
			We’re psyched you want to become a member at <strong>FITNESS ACADEMY!</strong>
		</h2>
		<div class="mt-8 w-full">
			<form>
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
							/>
						</label>
						<label class="form-control w-full">
							<div class="label">
								<span class="label-text font-semibold">Phone *</span>
							</div>
							<input type="text" placeholder="Phone" class="input input-bordered w-full" required />
						</label>
					</div>
					<label class="form-control">
						<div class="label">
							<span class="label-text font-semibold">Any Other Questions for Us?</span>
						</div>
						<textarea class="textarea textarea-bordered h-24" placeholder="Type here..."></textarea>
					</label>
				</div>
				<div class="mt-12 flex w-full flex-wrap justify-between gap-4">
					<button
						type="submit"
						class=" btn btn-accent btn-lg btn-block max-w-[180px] text-xl uppercase"
					>
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
		</div>
	</div>
</section>
