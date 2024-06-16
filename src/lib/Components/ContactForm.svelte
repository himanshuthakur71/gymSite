<form>
	<div class="grid w-full grid-cols-1 gap-4">
		<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text font-semibold">First Name *</span>
				</div>
				<input type="text" placeholder="First name" class="input input-bordered w-full" required />
			</label>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text font-semibold">Last Name *</span>
				</div>
				<input type="text" placeholder="Last name" class="input input-bordered w-full" required />
			</label>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text font-semibold">Email *</span>
				</div>
				<input type="email" placeholder="Email" class="input input-bordered w-full" required />
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
