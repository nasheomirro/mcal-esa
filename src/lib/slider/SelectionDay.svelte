<script lang="ts">
  import { selection } from "$lib/app/selection.svelte";
  import { store } from "$lib/app/store.svelte";
  import type { YMD } from "$lib/app/types";
  import { YMDUtils } from "$lib/app/utils";

  type Props = { ymd: YMD };
  const { ymd }: Props = $props();

  const BG_CLASSES = {
    0: "bg-surface-150 opacity-50",
    1: "bg-primary-900 opacity-50",
    2: "bg-primary-800 opacity-50",
    3: "bg-primary-800 opacity-50 shadow-blur-10 shadow-primary-800",
    4: "bg-primary-700 opacity-50 shadow-blur-10 shadow-primary-700",
    5: "bg-primary-600 opacity-50 shadow-blur-12 shadow-primary-600",
    6: "bg-primary-500 opacity-50 shadow-blur-12 shadow-primary-500",
  };

  const SELECTED_CLASSES = {
    selected: "border border-primary-100",
    selectable: "cursor-pointer",
  };

  const isDisabled = $derived(!YMDUtils.isChron(ymd, YMDUtils.LATEST_YMD));
  const isSelected = $derived(YMDUtils.isMatch(ymd, selection.current));
  const points = $derived(
    store.wins
      .filter((win) => YMDUtils.isMatch(ymd, win.ymd))
      .reduce((total, { strength }) => total + strength, 0)
  );

  const activeBgClass = $derived.by(() => {
    if (isDisabled) return BG_CLASSES[0];
    if (points >= 0 && points < 6)
      return BG_CLASSES[points as keyof typeof BG_CLASSES];
    else return BG_CLASSES[6];
  });

  const activeSelectClass = $derived.by(() => {
    if (isDisabled) return "";
    return isSelected ? SELECTED_CLASSES.selected : SELECTED_CLASSES.selectable;
  });
</script>

<label
  class="w-full aspect-square rounded-sm ease-in flex items-center justify-center {activeBgClass} {activeSelectClass}"
>
  <input
    type="radio"
    class="hidden"
    name="calendar-day"
    disabled={isDisabled}
    checked={isSelected}
    onchange={() => selection.updateCurrent(ymd)}
  />
</label>
