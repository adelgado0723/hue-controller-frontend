<script lang="ts">
	import ContactsTable from '$lib/components/ContactsTable.svelte';
	import Signup from '$lib/components/signup/Signup.svelte';
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;
</script>

<div class="flex flex-col items-center h-full w-full">
	<Signup {form} />
	<ContactsTable contacts={data?.contacts} />
</div>
