<script lang="ts">
	import { AlertType } from '$lib/constants';
	export let message: string;
	export let type: string;
	if (!type) {
	  type = 'error';
	}

	let alertType = '';
	switch (type) {
	  case AlertType.Error:
	    alertType = 'alert-error';
	    break;
	  case AlertType.Success:
	    alertType = 'alert-success';
	    break;
	  case AlertType.Warning:
	    alertType = 'alert-warning';
	    break;
	  case AlertType.Info:
	    alertType = 'alert-info';
	    break;
	  default:
	    alertType = 'alert-error';
	}

	const classes = 'alert shadow-lg  mt-4 ' + alertType;
</script>

<div class={classes}>
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current flex-shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>{message}</span>
	</div>
</div>
