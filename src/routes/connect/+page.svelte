<script lang="ts">
  import Input from '$lib/components/Input/Input.svelte';
  import type { HueError } from '$lib/types/hue';
  import LoadingSpinner from '$lib/components/svg/LoadingSpinner/LoadingSpinner.svelte';
  let currentStep = 1;
  let ip = '';
  let errorGettingIP = false;
  let errorTestingIP = false;
  let unauthErrorOnTest = false;

  async function testBridgeIP(ip: string) {
    if (!ip) return;

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

  async function handleGetBridgeIPButtonClick() {
    try {
      const fetchRes = await fetch(`https://discovery.meethue.com/`);
      const res: { id: string; internalipaddress: string; port: number }[] = await fetchRes?.json();
      if (!res[0]?.internalipaddress) {
        errorGettingIP = true;
        return;
      }
      ip = res[0]?.internalipaddress;

      const el = document.querySelector('#slide2');
      if (!el) return;
      el.scrollIntoView({
        behavior: 'smooth',
      });

      await testBridgeIP(ip);
    } catch (error) {
      ip = 'error: ' + error;
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
      class="step-1 fex-col card rounded-box m-5 flex w-full items-center justify-center gap-2 bg-base-300 p-10"
    >
      <h1 class="mb-6 text-2xl">Enter Bridge's IP Address</h1>
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
      {#if errorGettingIP}
        <div>
          <h1 class="my-4 text-2xl">Error Automatically Discovering Bridge IP</h1>
          <p>
            There was an error automatically discovering your bridge's IP. You can enter it manually
            if you know what it is or try auto discovery again.
          </p>
          <div class="my-4 flex flex-row items-end justify-start gap-6 align-bottom">
            <Input id="ip" label="Enter the bridge's IP address" type="text" required={true} />
            <button
              class="btn-primary btn z-10 mb-2 text-xl normal-case "
              on:click={() => {
                const el = document.querySelector('#slide2');
                if (!el) return;
                el.scrollIntoView({
                  behavior: 'smooth',
                });
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
      class="step-2 fex-col card rounded-box m-5 flex w-full items-center justify-center gap-2 bg-base-300 p-10"
    >
      <div class="conect-container-connect-to-bridge m-4">
        <h1 class="mb-8 text-2xl">Testing IP Address</h1>
        <div role="status" class="flex flex-col items-center justify-center">
          <LoadingSpinner
            classes={`h-28 w-28 ${
              unauthErrorOnTest ? 'animate-spin' : ''
            } fill-primary text-gray-200 dark:text-gray-600`}
          />
        </div>
        {#if unauthErrorOnTest}
          <h2>Successfully Discovered Your Bridge's IP 🎉</h2>
          <p class="my-4">
            You can now complete establishing a connection by pressing the button on the bridge and then
            clicking the button below.
          </p>{/if}
      </div>
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
