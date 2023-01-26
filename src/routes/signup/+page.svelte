<script lang="ts">
	/* import ContactsTable from '$lib/components/ContactsTable.svelte'; */
	import Signup from '$lib/components/Signup/Signup.svelte';
	import type { ActionData } from './$types';
	import type { SignupFormResponse } from '$lib/components/Signup/Signup';
	/* import type { PageData, ActionData } from './$types'; */
	/* export let data: PageData; */
	export let form: ActionData;
	let signupForm = form as SignupFormResponse;
</script>

<div class="flex flex-col items-center h-full w-full">
	<Signup form={signupForm} />
	<!-- <ContactsTable contacts={data?.contacts} /> -->
</div>
