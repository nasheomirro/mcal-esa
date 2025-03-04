<script lang="ts">
  import { fly } from "svelte/transition";

  import { selection } from "$lib/app/selection.svelte";
  import { store } from "$lib/app/store.svelte";
  import { YMDUtils } from "$lib/app/utils";

  import Lock from "$lib/assets/Lock.svelte";
  import LockBroken from "$lib/assets/LockBroken.svelte";
  import LockUnlocked from "$lib/assets/LockUnlocked.svelte";

  type Props = {
    value: boolean;
    onforcedunlocked: () => void;
  };

  let { value = $bindable(), onforcedunlocked }: Props = $props();

  const context = $derived(
    store.contexts.get(YMDUtils.toId($state.snapshot(selection.current)))
  );

  const lockedState = $derived(
    context?.isForcedUnlocked
      ? "broken"
      : selection.isStale
        ? "locked"
        : "unlocked"
  );

  let lockClickCount = $state(0);
  let hovering = $state(false);

  let freshDaysLeft =
    YMDUtils.differenceInDays(selection.current, YMDUtils.LATEST_YMD) + 7;

  function handleMouseenter() {
    hovering = true;
  }

  function handleMouseleave() {
    hovering = false;
    lockClickCount = 0;
  }

  function handleLockClick() {
    lockClickCount++;
    if (lockClickCount > 1) {
      value = true;
      onforcedunlocked();
    }
  }
</script>

<div
  role="tooltip"
  class="group h-14 absolute top-0 right-0"
  onmouseenter={handleMouseenter}
  onmouseleave={handleMouseleave}
>
  <button
    disabled={lockedState !== "locked"}
    class="w-14 h-14 relative flex items-end {lockedState === 'locked'
      ? 'cursor-pointer'
      : ''}"
    onclick={handleLockClick}
  >
    {#if lockedState === "broken"}
      <LockBroken />
    {:else if lockedState === "locked"}
      <Lock />
    {:else}
      <LockUnlocked />
      <p
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-drawn text-4xl"
      >
        {freshDaysLeft}
      </p>
    {/if}
  </button>

  {#if hovering}
    <div
      transition:fly={{ y: 10 }}
      class="absolute top-full left-1/2 -translate-x-1/2 mt-2"
    >
      <div
        class="w-4 h-4 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div class="bg-surface-150 w-full h-full rotate-45"></div>
      </div>

      <div class="p-4 w-screen max-w-60 bg-surface-150 rounded-md">
        <p class="text-center">
          {#if lockedState === "unlocked"}
            {freshDaysLeft}
            {freshDaysLeft > 1 ? "days" : "day"} left until this entry is locked!
            Make sure to finalize your records and check for typos!
          {:else if lockedState === "locked" && lockClickCount === 0}
            This entry is locked from editing. You can try removing the lock,
            but you can’t put it back!
          {:else if lockedState === "locked" && lockClickCount > 0}
            Are you sure you want to edit the past? This is an accurate record
            of your life. Once you remove this lock, you cannot put it back.
          {:else if lockedState === "broken"}
            The lock had been opened! Unfortunately it is not possible to lock
            it back.
          {/if}
        </p>
      </div>
    </div>
  {/if}
</div>
