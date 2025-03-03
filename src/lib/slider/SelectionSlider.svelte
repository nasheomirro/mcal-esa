<script lang="ts">
  import { onMount } from "svelte";
  import Swiper from "swiper";

  import { selection } from "$lib/app/selection.svelte";
  import SelectionSlide from "./SelectionSlide.svelte";

  import "swiper/css";

  let swiper: Swiper;
  let swiperElement: HTMLElement;

  const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  onMount(() => {
    // initialize swiper
    swiper = new Swiper(swiperElement, {
      direction: "vertical",
      initialSlide: selection.current.month,
    });
  });

  $effect(() => {
    // connect swiper to current selection
    if (swiper && swiper.activeIndex !== selection.current.month) {
      swiper.slideTo(selection.current.month);
    }
  });
</script>

<div class="overflow-hidden flex items-center w-full h-full">
  <div
    bind:this={swiperElement}
    class="swiper w-full max-h-96 !overflow-visible"
  >
    <div class="swiper-wrapper">
      {#each MONTHS as month}
        <SelectionSlide {month} year={selection.current.year} />
      {/each}
    </div>
  </div>
</div>
