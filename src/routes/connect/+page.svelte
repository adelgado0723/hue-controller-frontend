<script lang="ts">
  import Input from '$lib/components/Input/Input.svelte';
  let currentStep = 1;
  let content = '';

  async function handleGetBridgeIPButtonClick() {
    try {
      const fetchRes = await fetch(`https://discovery.meethue.com/`);
      console.log(JSON.stringify(fetchRes, null, 2));
      const res: {id: string, internalipaddress: string, port: number} = await fetchRes?.json();
      content = res?.internalipaddress || 'Error getting Bridge IP';
    } catch (error) {
      // handle error
      console.log(error);
      content = 'error: ' + error;
    }
  }
</script>

<div class="m-50 flex w-full flex-col items-center justify-center gap-10">
  <ul class="steps m-4 w-auto text-xl font-bold">
    <li class="{currentStep >= 1 && 'step-primary'} step font-medium">Enter Bridge's IP Addres</li>
    <li class="{currentStep >= 2 && 'step-primary'} step font-medium">Connect to the bridge</li>
    <li class="{currentStep >= 3 && 'step-primary'} step font-medium">Test the connection</li>
  </ul>
</div>

<div class="carousel w-full">
  <div id="slide1" class="carousel-item relative w-full box-border">
    <section
      class="step-1 fex-col card rounded-box flex w-full items-center justify-center gap-2 bg-base-300 p-12 m-5"
    >
      <h1 class="text-2xl my-6">Enter Bridge's IP Addres</h1>
      <p class="explain text-xl">
        Make sure you're connected to the same network as the bridge and not using a VPN.
      </p>

      <button
        class="btn-primary btn z-10 text-2xl normal-case"
        on:click={() => {
          handleGetBridgeIPButtonClick();
        }}
      >
      Discover IP
      </button>
      <div>{JSON.stringify(content, null, 2)}</div>
      <Input id="ip" label="Enter the bridge's IP address" type="text" required={true} />
    </section>
    <div class="absolute left-5 right-5 top-1/2 flex justify-end">
      <a href="#slide2" on:click={() => { currentStep = 2;}} class="btn-circle btn">❯</a>
    </div>
  </div>
  <div id="slide2" class="carousel-item relative w-full">
    <section
      class="step-2 fex-col card rounded-box flex w-full items-center justify-center gap-2 bg-base-300 p-12 m-5"
    >
      <div class="conect-container-connect-to-bridge m-4">
        <h1 class="text-2xl my-6">Connect To Bridge Device</h1>
      </div>
    </section>
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" on:click={() => { currentStep = 1;}} class="btn-circle btn">❮</a>
      <a href="#slide3" on:click={() => { currentStep = 3;}} class="btn-circle btn">❯</a>
    </div>
  </div>
  <div id="slide3" class="carousel-item relative w-full">
    <section
      class="step-3 fex-col card rounded-box flex w-full items-center justify-center gap-2 bg-base-300 p-12 m-5"
    >
      <div class="conect-container-connect-to-bridge m-4">
        <h1 class="text-2xl my-6">Confirm Connection Succeeded</h1>
      </div>
    </section>
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2"  on:click={() => { currentStep = 2;}} class="btn-circle btn">❮</a>
    </div>
  </div>
</div>
