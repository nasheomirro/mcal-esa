<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  type Props = {
    value: string;
    placeholder?: string;
    onchange?: HTMLTextareaAttributes["onchange"];
    oninput?: HTMLTextareaAttributes["oninput"];
    onkeydown?: HTMLTextareaAttributes["onkeydown"];
    disabled?: HTMLTextareaAttributes["disabled"];
  };

  let { value = $bindable(), placeholder, onchange, oninput, onkeydown, disabled }: Props = $props();
</script>

<div class="grid grid-cols-[minmax(10px,1fr)] w-full">
  <!-- grow with content trick, as long as this div is exactly like the textarea, we're good -->
  <div
    class="invisible col-start-1 row-start-1 whitespace-pre-wrap break-words font-drawn min-h-3"
  >
    {value + " "}
  </div>
  <textarea
    class="w-full focus:outline-0 resize-none h-full col-start-1 row-start-1 overflow-y-hidden break-words font-drawn"
    rows="1"
    {placeholder}
    {onchange}
    {oninput}
    {onkeydown}
    {disabled}
    bind:value
  ></textarea>
</div>
