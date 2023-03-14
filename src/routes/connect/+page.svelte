<script lang="ts">
  import Input from '$lib/components/Input/Input.svelte';
  let currentStep = 3;
</script>

<div class="m-4 flex w-full flex-col items-center justify-center">
  <ul class="steps m-4">
    <li class="{currentStep >= 1 && 'step-primary'} step font-medium">Enter Bridge's IP Addres</li>
    <li class="{currentStep >= 2 && 'step-primary'} step font-medium">Connect to the bridge</li>
    <li class="{currentStep >= 3 && 'step-primary'} step font-medium">test the conenction</li>
  </ul>
  <div class="conect-container-enter-ip m-4">
    <h1 class="text-2xl">Enter Bridge's IP Addres</h1>
    <p class="explain">
      Make sure you're connected to the same network as the bridge and not using a VPN.
    </p>
    <a class="btn-primary btn text-xl normal-case" href="https://discovery.meethue.com/"
      >Discover IP</a
    >

    <Input id="ip" label="Enter the bridge's IP address" type="text" required={true} />
  </div>
</div>
