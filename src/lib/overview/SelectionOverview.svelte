<script lang="ts">
  import { selection } from "$lib/app/selection.svelte";
  import { fly } from "svelte/transition";
  import SelectionContext from "./context/SelectionContext.svelte";
  import SelectionWins from "./win/SelectionWins.svelte";
</script>

<section class="grid">
  {#key selection.current}
    <div
      class="flex flex-col gap-12 col-start-1 row-start-1"
      in:fly={{ y: 10, delay: 200, duration: 500 }}
      out:fly={{ y: 10, duration: 500 }}
    >
      <SelectionContext />
      <SelectionWins />
    </div>
  {/key}
</section>
