<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  type Props = {
    value: string;
    placeholder?: string;
    onchange?: HTMLTextareaAttributes["onchange"];
    oninput?: HTMLTextareaAttributes["oninput"];
    disabled?: HTMLTextareaAttributes["disabled"];
  };

  let { value = $bindable(), placeholder, onchange, oninput, disabled }: Props = $props();
</script>

<div class="grid grid-cols-[minmax(10px,1fr)]">
  <!-- grow with content trick, as long as this div is exactly like the textarea, we're good -->
  <div
    class="invisible min-h-32 col-start-1 row-start-1 h-full whitespace-pre-wrap break-words font-drawn"
  >
    {value + " "}
  </div>
  <textarea
    class="w-full focus:outline-0 resize-none h-full col-start-1 row-start-1 overflow-y-hidden break-words font-drawn"
    {placeholder}
    {onchange}
    {oninput}
    {disabled}
    bind:value
  ></textarea>
</div>
