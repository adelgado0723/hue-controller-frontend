<script>
	import { enhance, applyAction } from '$app/forms';
	import ContactsTable from '$lib/components/ContactsTable.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Signup from '$lib/components/signup/Signup.svelte';
	export let data;
	export let form;
	console.log(form);
</script>

<Signup data={data} form={form} />
<ContactsTable contacts={data?.contacts} />

<!-- <style> -->
<!-- 	@tailwind base; -->
<!--   @tailwind components; -->
<!--   @tailwind utilities; -->
<!---->
<!-- 	label { -->
<!-- 		color : ; -->
<!-- 	} -->
<!-- </style> -->
