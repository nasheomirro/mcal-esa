<script lang="ts">
  import { store } from "$lib/app/store.svelte";
  import type { Win, WinStrength } from "$lib/app/types";

  import WinStrengthRadio from "./WinStrengthRadio.svelte";
  import ResizableTextArea from "./ResizableTextArea.svelte";
  import WinLayout from "./WinLayout.svelte";
  import { createDebounce } from "$lib/app/utils";
  import { editing } from "../editing.svelte";

  type Props = {
    win: Win;
  };

  const { win }: Props = $props();

  let draft = $state<{
    value: string;
    strength: WinStrength;
  }>({
    value: win.value,
    strength: win.strength,
  });

  function saveDraft() {
    store.updateWin(win.id, $state.snapshot(draft));
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Backspace" && draft.value === "") {
      store.deleteWin(win.id);
    }
  };

  const debouncedSaveDraft = createDebounce(() => saveDraft(), 400);
</script>

<WinLayout>
  <ResizableTextArea
    placeholder="Press 'Backspace' again to remove this win."
    bind:value={draft.value}
    onkeydown={handleKeydown}
    oninput={debouncedSaveDraft}
    disabled={editing.disabled}
  />
  <WinStrengthRadio
    bind:value={draft.strength}
    onchange={saveDraft}
    disabled={editing.disabled}
  />
</WinLayout>
