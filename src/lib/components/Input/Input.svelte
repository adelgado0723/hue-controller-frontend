<script lang="ts">
  export let value = '';
  export let placeholder = '';
  export let id: string;
  export let label: string;
  export let type = 'text';
  export let disabled = false;
  export let required = false;
</script>

<div class="form-control mb-2 w-full max-w-lg">
  <label for={id} class="font-meium label pb-1">
    <span class="label-text">{label}</span>
  </label>
  <input
    class="input-bordered input w-full max-w-lg"
    {type}
    {placeholder}
    {required}
    {disabled}
    {id}
    name={id}
    {value}
  />
</div>
