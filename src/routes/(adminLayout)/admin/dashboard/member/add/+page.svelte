<section class="h-full w-full">
	<div class="hms-container">
		<div class="my-16">
			<h1 class=" text-2xl lg:text-3xl">Add New Members</h1>
		</div>
		<form>
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
						/>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Gender *</span>
						</div>

						<select class="select select-bordered">
							<option disabled selected value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">other</option>
						</select>
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Aadhar number(Unique ID)</span>
						</div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Age</span>
						</div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" />
					</label>
					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Gym Time</span>
						</div>
						<select class="select select-bordered" required>
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
						/>
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Father's name</span>
						</div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" />
					</label>

					<label class="form-control w-full">
						<div class="label">
							<span class="label-text">Mother's name</span>
						</div>
						<input type="text" placeholder="Type here" class="input input-bordered w-full" />
					</label>
				</div>
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Address</span>
					</div>
					<input type="text" placeholder="Type here" class="input input-bordered w-full" />
				</label>
			</div>

			<div class="mt-6 flex justify-between">
				<button
					type="submit"
					class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Save</button
				>

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
