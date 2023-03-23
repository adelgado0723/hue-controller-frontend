<script lang="ts">
  import Input from '$lib/components/Input/Input.svelte';
  let currentStep = 3;
</script>

<div class="m-50 flex w-full flex-col items-center justify-center gap-10">
  <ul class="steps m-4 w-auto text-xl font-bold">
    <li class="{currentStep >= 1 && 'step-primary'} step font-medium">Enter Bridge's IP Addres</li>
    <li class="{currentStep >= 2 && 'step-primary'} step font-medium">Connect to the bridge</li>
    <li class="{currentStep >= 3 && 'step-primary'} step font-medium">test the conenction</li>
  </ul>

  <section
    class="step-1 fex-col card rounded-box flex w-auto items-center justify-center gap-2 bg-base-300 p-6"
  >
    <!-- <div class="conect-container-enter-ip m-4"> -->
    <h1 class="text-2xl">Enter Bridge's IP Addres</h1>
    <p class="explain text-xl">
      Make sure you're connected to the same network as the bridge and not using a VPN.
    </p>
    <a class="btn-primary btn max-w-xs text-xl normal-case" href="https://discovery.meethue.com/"
      >Discover IP</a
    >

    <Input id="ip" label="Enter the bridge's IP address" type="text" required={true} />

    <!-- </div> -->
  </section>
  <div class="divider" />
  <section
    class="step-2 fex-col card rounded-box flex w-auto items-center justify-center gap-2 bg-base-300 p-6"
  >
    <div class="conect-container-connect-to-bridge m-4">
      <h1 class="text-2xl">Connect To Bridge Device</h1>
    </div>
  </section>
  <div class="divider" />
  <section
    class="step-3 fex-col card rounded-box flex w-auto items-center justify-center gap-2 bg-base-300 p-6"
  >
    <div class="conect-container-connect-to-bridge m-4">
      <h1 class="text-2xl">Confirm Connection Succeeded</h1>
    </div>
  </section>
</div>
