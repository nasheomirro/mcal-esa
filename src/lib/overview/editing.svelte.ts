import { selection } from "$lib/app/selection.svelte";
import { store } from "$lib/app/store.svelte";
import { YMDUtils } from "$lib/app/utils";

class Editing {
  disabled = $derived(
    selection.isStale &&
      !store.contexts.get(YMDUtils.toId($state.snapshot(selection.current)))
        ?.isForcedUnlocked
  );
}

export const editing = new Editing();
