<script lang="ts">
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/Stores/userStore';
	import { supabase } from '$lib/supabaseClient';

	let formFields = { email: '', password: '' };
	let passwordInput: HTMLInputElement;
	let authError = '';
	let loading = false;
	let visible = false;

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

	function toggle() {
		visible = !visible;
		passwordInput.setAttribute('type', visible ? 'text' : 'password');
	}
</script>

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
								bind:this={passwordInput}
								type="password"
								class="grow"
								placeholder="Password"
								required
								bind:value={formFields.password}
							/>

							<button type="button" on:click={toggle} class="">
								{#if visible}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.2em"
										height="1.2em"
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
										/>
									</svg>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1.2em"
										height="1.2em"
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
										/>
									</svg>
								{/if}
							</button>
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
