<script lang="ts">
  import { selection } from "$lib/app/selection.svelte";
  import { store } from "$lib/app/store.svelte";
  import { YMDUtils } from "$lib/app/utils";

  import winsEmptyImg from "$lib/assets/wins-empty.png";
  import { editing } from "../editing.svelte";

  import SelectionCreateWin from "./SelectionCreateWin.svelte";
  import SelectionEditWin from "./SelectionEditWin.svelte";

  const wins = $derived(
    store.wins.filter((win) => YMDUtils.isMatch(win.ymd, selection.current))
  );
</script>

{#if !editing.disabled}
  <SelectionCreateWin />
{/if}

{#if wins.length}
  <ul class="flex flex-col gap-6">
    {#each wins as win (win.id)}
      <li>
        <SelectionEditWin {win} />
      </li>
    {/each}
  </ul>
{:else}
  <div class="mt-6 flex justify-center opacity-50">
    <img
      src={winsEmptyImg}
      class="max-w-[30.125rem]"
      alt="a girl laying down on the ground because your wins are empty"
    />
  </div>
{/if}
