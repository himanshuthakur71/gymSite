<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	const user_signup = async (email: string, password: string) => {
		let { data, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		console.log({
			data,
			error
		});
	};
</script>

<!-- <button
	class="btn btn-primary"
	type="button"
	on:click={() => user_signup('himanshupundir71@gmail.com', 'password@fitnessacademygym')}
	>Create User</button
> -->
