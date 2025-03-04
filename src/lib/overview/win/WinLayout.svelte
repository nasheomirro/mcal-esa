<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="flex justify-between items-center gap-10">
  {@render children()}
</div>