<script lang="ts">
  import SelectionOverview from "$lib/overview/SelectionOverview.svelte";
  import SelectionSlider from "$lib/slider/SelectionSlider.svelte";
</script>

<div class="flex justify-between px-20 gap-20 min-h-screen relative">
  <div class="grow py-20 max-w-[47.5rem]">
    <SelectionOverview />
  </div>
  <div class="w-full max-w-96 sticky max-h-screen top-0">
    <SelectionSlider />
  </div>
</div>
