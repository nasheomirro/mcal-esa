<script lang="ts">
  import { nanoid } from "nanoid";
  import { store } from "$lib/app/store.svelte";
  import type { WinStrength } from "$lib/app/types";
  import { selection } from "$lib/app/selection.svelte";

  import { editing } from "../editing.svelte";
  import WinStrengthRadio from "./WinStrengthRadio.svelte";
  import ResizableTextArea from "./ResizableTextArea.svelte";
  import WinLayout from "./WinLayout.svelte";

  let draft = $state<{
    value: string;
    strength: WinStrength;
  }>({
    value: "",
    strength: 1,
  });

  function saveDraft() {
    const now = new Date().toString();
    store.createWin({
      id: nanoid(),
      ymd: $state.snapshot(selection.current),
      createdOn: now,
      updatedOn: now,
      ...$state.snapshot(draft),
    });

    draft.value = "";
    draft.strength = 1;
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (draft.value.length >= 3) {
        saveDraft();
      }
    }
  };
</script>

<WinLayout>
  <ResizableTextArea
    placeholder="had a win? type it here!"
    bind:value={draft.value}
    onkeydown={handleKeydown}
    disabled={editing.disabled}
  />
  <WinStrengthRadio bind:value={draft.strength} />
</WinLayout>
