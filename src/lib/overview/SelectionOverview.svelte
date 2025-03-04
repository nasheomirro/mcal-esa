<script lang="ts">
  import { selection } from "$lib/app/selection.svelte";
  import { fly } from "svelte/transition";

  import SelectionContext from "./context/SelectionContext.svelte";
  import SelectionWins from "./win/SelectionWins.svelte";

  const fixWindowScrollY = () => {
    if (window.scrollY > 0) {
      window.scrollTo({
        behavior: "instant",
        top: 0,
      });
    }
  };
</script>

<section class="grid">
  {#key selection.current}
    <div
      class="flex flex-col gap-12 col-start-1 row-start-1"
      in:fly={{ y: 10, delay: 300, duration: 300 }}
      out:fly={{ y: 10, duration: 300 }}
      onoutroend={fixWindowScrollY}
    >
      <SelectionContext />
      <SelectionWins />
    </div>
  {/key}
</section>
