<script lang="ts">
  import type { HueError } from '$lib/types/hue';
  import LoadingSpinner from '$lib/components/svg/LoadingSpinner/LoadingSpinner.svelte';
  import HueBridge from '$lib/components/svg/HueBridge/HueBridge.svelte';

  let currentStep = 1;
  let errorGettingIP = false;
  let errorTestingIP = false;
  let unauthErrorOnTest = true;
  let ip = '';

  async function testBridgeIP(ip: string) {
    if (!ip) return;
    currentStep = 2;
    errorTestingIP = false;
    unauthErrorOnTest = false;

    try {
      const fetchRes = await fetch(`http://${ip}/api/newdeveloper`);
      const res: { error: HueError }[] = await fetchRes?.json();
      if (res[0]?.error) {
        errorTestingIP = true;
        if (res[0].error?.type === 1 && res[0].error?.description === 'unauthorized user') {
          unauthErrorOnTest = true;
        }
        return;
      }
    } catch (error) {
      errorTestingIP = true;
      return;
    }
  }
  async function handlePairBridgeButtonClick() {
    if (!ip) return;
    currentStep = 3;
  }

  async function handleGetBridgeIPButtonClick() {
    try {
      errorGettingIP = false;
      const fetchRes = await fetch(`https://discovery.meethue.com/`);
      const res: { id: string; internalipaddress: string; port: number }[] = await fetchRes?.json();
      if (!res[0]?.internalipaddress) {
        errorGettingIP = true;
        return;
      }

      const el = document.querySelector('#slide2');
      if (!el) return;
      el.scrollIntoView({
        behavior: 'smooth',
      });

      await testBridgeIP(res[0]?.internalipaddress);
    } catch (error) {
      errorGettingIP = true;
    }
  }
</script>

<div class="m-50 flex w-full flex-col items-center justify-center gap-10">
  <ul class="steps m-4 w-auto text-xl font-bold">
    <li class="{currentStep >= 1 && 'step-primary'} step font-medium">Find Bridge's IP Address</li>
    <li class="{currentStep >= 2 && 'step-primary'} step font-medium">Test IP Address</li>
    <li class="{currentStep >= 3 && 'step-primary'} step font-medium">Establish Connection</li>
  </ul>
</div>

<div class="carousel w-full">
  <div id="slide1" class="carousel-item relative box-border w-full">
    <section
      class="step-1 fex-col card rounded-box m-5 flex w-full items-center justify-center gap-8 bg-base-300 p-10 text-center"
    >
      <h1 class="mb-2 text-2xl">Enter Bridge's IP Address</h1>
      <p class="explain text-xl">
        Make sure you're connected to the same network as the bridge and not using a VPN.
      </p>

      <button
        class="btn-primary btn z-10 text-xl normal-case"
        on:click={() => {
          handleGetBridgeIPButtonClick();
        }}
      >
        Discover IP
      </button>
      {#if errorGettingIP}
        <div>
          <h1 class="my-4 text-2xl">Error Automatically Discovering Bridge IP</h1>
          <p>
            There was an error automatically discovering your bridge's IP. You can enter it manually
            if you know what it is or try auto discovery again.
          </p>
          <div class="my-4 flex flex-row items-end justify-start gap-6 align-bottom">
            <div class="form-control mb-2 w-full max-w-lg">
              <label for="ip" class="font-meium label pb-1">
                <span class="label-text">Enter the bridge's IP address</span>
              </label>
              <input
                id="ip"
                bind:value={ip}
                type="text"
                required={true}
                class="input-bordered input w-full max-w-lg"
              />
            </div>
            <button
              class="btn-primary btn z-10 mb-2 text-xl normal-case "
              on:click={async () => {
                if (!ip) return;
                errorGettingIP = false;
                const slide2 = document.querySelector('#slide2');
                if (!slide2) return;
                slide2.scrollIntoView({
                  behavior: 'smooth',
                });

                //TODO: add ip address validation here
                await testBridgeIP(ip);
              }}
            >
              Submit IP
            </button>
          </div>
        </div>
      {/if}
    </section>
  </div>
  <div id="slide2" class="carousel-item relative w-full">
    <section
      class="step-2 fex-col card rounded-box m-5 flex w-full items-center justify-center gap-2 bg-base-300 p-10 text-center"
    >
      <h1 class="mb-2 text-2xl">Preparing to Pair Bridge</h1>
      {#if !errorTestingIP || (errorTestingIP && unauthErrorOnTest)}
        <div role="status" class="z-10 flex flex-col items-center justify-center">
          <LoadingSpinner
            class="mb-4 w-40 transition-transform {unauthErrorOnTest
              ? 'hover:scale-110 hover:cursor-pointer hover:text-primary'
              : 'dark:text-gray-600'}"
            ;
            text={unauthErrorOnTest ? 'Pair Bridge' : 'Testing...'}
            textStyles="text-l text-center {unauthErrorOnTest ? 'hover:text-primary' : ''}"
            spinnerStyles="text-primary {unauthErrorOnTest
              ? 'motion-safe:animate-pulse'
              : 'animate-spin'}"
            on:click={unauthErrorOnTest ? handlePairBridgeButtonClick : undefined}
          />
        </div>
        {#if unauthErrorOnTest}
          <h2 class="my-2 text-xl">🎉 Successfully Discovered Your Bridge's IP 🎉</h2>
          <div class="flex w-96 flex-row items-center justify-center gap-10">
            <HueBridge class="h-20 w-20" />
            <p>
              You can now complete establishing a connection by pressing the button on your hue
              bridge device and then clicking "Pair Bridge" above.
            </p>
          </div>
        {/if}
      {:else if errorTestingIP && !unauthErrorOnTest}
        <h2>There was an error testing your bridge's IP</h2>
      {/if}
    </section>
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a
        href="#slide1"
        on:click={() => {
          currentStep = 1;
        }}
        class="btn-circle btn">❮</a
      >
      <a
        href="#slide3"
        on:click={() => {
          currentStep = 3;
        }}
        class="btn-circle btn">❯</a
      >
    </div>
  </div>
  <div id="slide3" class="carousel-item relative w-full">
    <section
      class="step-3 fex-col card rounded-box m-5 flex w-full items-center justify-center gap-2 bg-base-300 p-10"
    >
      <div class="conect-container-connect-to-bridge m-4">
        <h1 class="mb-6 text-2xl">Establish Connection</h1>
      </div>
    </section>
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a
        href="#slide2"
        on:click={() => {
          currentStep = 2;
        }}
        class="btn-circle btn">❮</a
      >
    </div>
  </div>
</div>
