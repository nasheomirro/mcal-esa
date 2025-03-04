<script lang="ts">
  import { selection } from "$lib/app/selection.svelte";
  import { fly } from "svelte/transition";
  import SelectionContext from "./SelectionContext.svelte";
</script>

<section class="grid">
  {#key selection.current}
    <div
      class="col-start-1 row-start-1"
      in:fly={{ y: 10, delay: 200, duration: 500 }}
      out:fly={{ y: 10, duration: 500 }}
    >
      <SelectionContext />
    </div>
  {/key}
</section>
