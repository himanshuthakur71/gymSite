<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/Stores/userStore';
	import { supabase } from '$lib/supabaseClient';

	// const user_signup = async (email: string, password: string) => {
	// 	let { data, error } = await supabase.auth.signUp({
	// 		email: email,
	// 		password: password
	// 	});

	// 	console.log({
	// 		data,
	// 		error
	// 	});
	// };

	let formFields = { email: '', password: '' };

	let authError = '';
	let loading = false;

	const user_signin = async () => {
		loading = true;
		try {
			let { data, error } = await supabase.auth.signInWithPassword({
				email: formFields.email,
				password: formFields.password
			});

			if (data?.session?.user) {
				$userStore = data?.session?.user;
				goto('/admin/dashboard');
			}

			if (error) {
				authError = error?.message;
			}
		} finally {
			loading = false;
		}
	};

	// const getSession = async () => {
	// 	const { data, error } = await supabase.auth.getSession();
	// 	console.log({
	// 		data,
	// 		error
	// 	});
	// };
</script>

<!-- <button type="button" class=" btn" on:click={getSession}>GET SESSSION</button> -->

<!-- himanshupundir71@gmail.com -->
<!-- password@fitnessacademygym -->
<!-- {JSON.stringify($userStore)} -->
<section>
	<div class="hms-container">
		<div class="flex h-full min-h-screen w-full items-center justify-center">
			<div class="mx-auto my-16 w-full max-w-[540px] rounded bg-base-300 px-8 py-8 shadow-lg">
				<h1 class=" mb-10 text-center text-xl font-bold lg:text-3xl">Login to your account</h1>

				<form on:submit|preventDefault={user_signin}>
					<div class="grid grid-cols-1 gap-6">
						<label class="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-4 w-4 opacity-70"
								><path
									d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
								/><path
									d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
								/></svg
							>
							<input
								type="text"
								class="grow"
								placeholder="Email"
								required
								bind:value={formFields.email}
							/>
						</label>

						<label class="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-4 w-4 opacity-70"
								><path
									fill-rule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clip-rule="evenodd"
								/></svg
							>
							<input
								type="password"
								class="grow"
								placeholder="Password"
								required
								bind:value={formFields.password}
							/>
						</label>
						{#if authError}
							<p class=" text-error">{authError}</p>
						{/if}

						<button type="submit" class=" btn btn-primary text-xl font-bold" disabled={loading}>
							Login
							{#if loading}
								<span class="loading loading-spinner"></span>
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
