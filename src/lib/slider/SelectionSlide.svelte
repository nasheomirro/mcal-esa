<script lang="ts">
  import type { YMD } from "$lib/app/types";
  import SelectionDay from "./SelectionDay.svelte";

  type Props = { ymd: Pick<YMD, "year" | "month"> };

  const { ymd }: Props = $props();

  const days = $derived.by(() => {
    // pad the start with empty numbers to adjust the start of the days in the UI
    const leftPadding = new Date(ymd.year, ymd.month, 1).getDay();
    const totalDays = new Date(ymd.year, ymd.month + 1, 0).getDate();

    const leftPaddingArr = Array.from({ length: leftPadding }).map(() => 0);
    const totalDaysArr = Array.from({ length: totalDays }).map((_, i) => i + 1);
    return leftPaddingArr.concat(totalDaysArr);
  });
</script>

<div class="swiper-slide">
  <div class="grid grid-cols-7 grid-flow-row-dense gap-2 max-w-96">
    {#each days as day}
      {#if day}
        <SelectionDay ymd={{ day, ...ymd }} />
      {:else}
        <!-- empty box to push the actual days -->
        <div></div>
      {/if}
    {/each}
  </div>
</div>
