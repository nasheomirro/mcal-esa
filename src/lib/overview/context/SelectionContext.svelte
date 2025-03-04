<script lang="ts">
  import { store } from "$lib/app/store.svelte";
  import { createDebounce, YMDUtils } from "$lib/app/utils";
  import { selection } from "$lib/app/selection.svelte";

  import SelectionTitle from "./SelectionTitle.svelte";
  import ResizableTextArea from "./ResizableTextArea.svelte";
  import SelectionLock from "./SelectionLock.svelte";
  import { editing } from "../editing.svelte";

  // store the current selection because of timing issues
  // with selection.current changing before debounced saves are called.
  const onMountSelection = $state.snapshot(selection.current);
  const getCurrentContext = () =>
    $state.snapshot(store.contexts.get(YMDUtils.toId(onMountSelection)));

  // on mount, check if day has any initial context
  const initialContext = getCurrentContext();

  let draft = $state({
    title: initialContext?.title || "",
    value: initialContext?.value || "",
    isForcedUnlocked: initialContext?.isForcedUnlocked || false,
  });

  // saves draft to db by updating or creating if a previous context doesn't exist
  function saveDraft() {
    const currentContext = getCurrentContext();
    if (currentContext) {
      store.updateContext(currentContext.id, { ...$state.snapshot(draft) });
    } else {
      const now = new Date();
      const _draft = $state.snapshot(draft);
      store.createContext({
        id: YMDUtils.toId(onMountSelection),
        title: _draft.title,
        value: _draft.value,
        isForcedUnlocked: _draft.isForcedUnlocked,
        createdOn: now,
        updatedOn: now,
        ymd: onMountSelection,
      });
    }
  }

  const debouncedSaveDraft = createDebounce(() => saveDraft(), 400);
</script>

<div class="flex flex-col min-h-64 relative">
  <SelectionLock
    bind:value={draft.isForcedUnlocked}
    onforcedunlocked={saveDraft}
  />
  <SelectionTitle />
  <input
    bind:value={draft.title}
    oninput={debouncedSaveDraft}
    placeholder="An Ordinary Day"
    class="focus:outline-none font-drawn mb-10"
    disabled={editing.disabled}
  />

  <ResizableTextArea
    bind:value={draft.value}
    oninput={debouncedSaveDraft}
    placeholder="Not all days have to be eventful. Its what makes days that are all the more special."
    disabled={editing.disabled}
  />
</div>
