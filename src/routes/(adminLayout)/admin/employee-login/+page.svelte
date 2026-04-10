<script lang="ts">
	import { enhance } from '$app/forms';

	let { form }: { form: any } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Employee Login</title>
</svelte:head>

<section class="flex min-h-screen items-center justify-center bg-base-200 px-4">
	<div class="w-full max-w-md">
		<div class="mb-8 text-center">
			<a href="/" class="inline-block">
				<img
					src="/images/logo_gym-removebg-preview.png"
					alt="Gym Logo"
					width="100"
					height="100"
					class="mx-auto"
				/>
			</a>
			<h1 class="mt-4 text-3xl font-bold">Employee Login</h1>
			<p class="mt-1 text-gray-500">Sign in with your employee credentials</p>
		</div>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				{#if form?.error}
					<div class="alert alert-error mb-4">
						<span>{form.error}</span>
					</div>
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
					<div class="form-control mb-4">
						<label class="label" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							id="email"
							type="email"
							name="email"
							placeholder="your@email.com"
							class="input input-bordered w-full"
							required
						/>
					</div>

					<div class="form-control mb-6">
						<label class="label" for="password">
							<span class="label-text">Password</span>
						</label>
						<input
							id="password"
							type="password"
							name="password"
							placeholder="Enter your password"
							class="input input-bordered w-full"
							required
						/>
					</div>

					<button type="submit" class="btn btn-primary btn-block" disabled={loading}>
						{#if loading}
							<span class="loading loading-spinner loading-sm"></span>
						{/if}
						Sign In
					</button>
				</form>

				<div class="divider text-xs text-gray-400">or</div>
				<a href="/admin/login" class="btn btn-outline btn-block btn-sm">Admin Login</a>
			</div>
		</div>
	</div>
</section>
