<script lang="ts">
	import { enhance } from '$app/forms';

	let { form }: { form: any } = $props();
	let loading = $state(false);
</script>

<section class="my-16">
	<div class="hms-container">
		<div class="flex items-center gap-4 border-b border-b-gray-600 pb-2 text-2xl font-semibold lg:text-3xl">
			<h1>Add New Employee</h1>
		</div>

		<div class="my-16 w-full">
			{#if form?.error}
				<div class="alert alert-error mb-4"><span>{form.error}</span></div>
			{/if}
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
			>
				<div class="grid w-full grid-cols-1 gap-4 bg-base-300 p-4">
					<h2 class="border-b border-primary pb-2 text-lg font-semibold text-primary">Personal Information</h2>
					<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
						<label class="form-control w-full">
							<div class="label"><span class="label-text">First name *</span></div>
							<input type="text" name="first_name" placeholder="Type here" class="input input-bordered w-full" required />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Last name *</span></div>
							<input type="text" name="last_name" placeholder="Type here" class="input input-bordered w-full" required />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Email *</span></div>
							<input type="email" name="email" placeholder="Type here" class="input input-bordered w-full" required />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Phone *</span></div>
							<input type="text" name="phone" placeholder="Type here" class="input input-bordered w-full" required />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Role *</span></div>
							<select name="role" class="select select-bordered" required>
								<option disabled selected value="">Select Role</option>
								<option value="admin">Admin</option>
								<option value="trainer">Trainer</option>
								<option value="staff">Staff</option>
							</select>
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Salary</span></div>
							<input type="number" name="salary" placeholder="Type here" class="input input-bordered w-full" />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Joining Date</span></div>
							<input type="date" name="joining_date" class="input input-bordered w-full" />
						</label>
						<label class="form-control w-full">
							<div class="label"><span class="label-text">Status *</span></div>
							<select name="status" class="select select-bordered" required>
								<option value="active" selected>Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</label>
						<label class="form-control w-full lg:col-span-2">
							<div class="label"><span class="label-text">Notes</span></div>
							<textarea name="notes" placeholder="Type here" class="textarea textarea-bordered w-full" rows="3"></textarea>
						</label>
					</div>

					<h2 class="mt-4 border-b border-primary pb-2 text-lg font-semibold text-primary">Login Credentials</h2>
					<div class="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
						<label class="form-control w-full">
							<div class="label">
								<span class="label-text">Password *</span>
								<span class="label-text-alt text-gray-400">Min 6 characters</span>
							</div>
							<input type="password" name="password" placeholder="Set login password" class="input input-bordered w-full" minlength="6" required />
						</label>
					</div>

					<h2 class="mt-4 border-b border-primary pb-2 text-lg font-semibold text-primary">Permissions</h2>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
						<label class="flex cursor-pointer items-center gap-2">
							<input type="checkbox" name="perm_members" class="checkbox checkbox-primary" />
							<span class="label-text">Members</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input type="checkbox" name="perm_plans" class="checkbox checkbox-primary" />
							<span class="label-text">Plans</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input type="checkbox" name="perm_batch" class="checkbox checkbox-primary" />
							<span class="label-text">Batch</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input type="checkbox" name="perm_gallery" class="checkbox checkbox-primary" />
							<span class="label-text">Gallery</span>
						</label>
						<label class="flex cursor-pointer items-center gap-2">
							<input type="checkbox" name="perm_reports" class="checkbox checkbox-primary" />
							<span class="label-text">Reports</span>
						</label>
					</div>
				</div>

				<div class="mt-6 flex justify-between">
					<button disabled={loading} type="submit" class="btn btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">
						Save
						{#if loading}<span class="loading loading-spinner loading-sm"></span>{/if}
					</button>
					<a href="/admin/dashboard/employee" class="btn btn-outline btn-primary btn-lg btn-block max-w-[140px] text-2xl font-[600]">Cancel</a>
				</div>
			</form>
		</div>
	</div>
</section>
