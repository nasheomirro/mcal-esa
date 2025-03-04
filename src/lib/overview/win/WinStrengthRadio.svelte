<script lang="ts">
  import type { WinStrength } from "$lib/app/types";
  import StrengthIcon from "$lib/assets/StrengthIcon.svelte";

  type Props = {
    value: WinStrength;
    onchange?: HTMLInputElement["onchange"];
    disabled?: HTMLInputElement["disabled"];
  };

  let { value = $bindable(), onchange, disabled }: Props = $props();
</script>

{#snippet input(v: number)}
  <label class={!disabled ? "cursor-pointer" : ""}>
    <div class="w-8 h-8 {value < v ? 'opacity-50' : ''}">
      <StrengthIcon />
    </div>
    <input
      {onchange}
      bind:group={value}
      value={v}
      type="radio"
      class="hidden"
      {disabled}
    />
  </label>
{/snippet}

<div class="flex gap-2">
  {@render input(1)}
  {@render input(2)}
  {@render input(3)}
</div>
