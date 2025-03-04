<script lang="ts">
  import { nanoid } from "nanoid";
  import { store } from "$lib/app/store.svelte";
  import { createDebounce, YMDUtils } from "$lib/app/utils";
  import { selection } from "$lib/app/selection.svelte";

  import SelectionTitle from "./SelectionTitle.svelte";
  import ResizableTextArea from "./ResizableTextArea.svelte";

  // store the current selection because of timing issues 
  // with selection.current changing before debounced saves are called.
  const onMountCurrent = $state.snapshot(selection.current);
  const getCurrentContext = () =>
    $state.snapshot(
      store.contexts.find((context) =>
        YMDUtils.isMatch(context.ymd, onMountCurrent)
      )
    );

  // on mount, check if day has any initial context
  const initialContext = getCurrentContext();

  let draft = $state({
    title: initialContext?.title || "",
    value: initialContext?.value || "",
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
        id: nanoid(),
        title: _draft.title,
        value: _draft.value,
        createdOn: now,
        updatedOn: now,
        ymd: onMountCurrent,
      });
    }
  }

  const debouncedSaveDraft = createDebounce(() => saveDraft(), 400);
</script>

<div class="flex flex-col">
  <SelectionTitle />
  <input
    bind:value={draft.title}
    oninput={debouncedSaveDraft}
    placeholder="An Ordinary Day"
    class="focus:outline-none font-drawn mb-10"
  />

  <ResizableTextArea
    bind:value={draft.value}
    oninput={debouncedSaveDraft}
    placeholder="Not all days have to be eventful. Its what makes days that are all the more special."
  />
</div>
