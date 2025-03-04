<script lang="ts">
  import { selection } from "$lib/app/selection.svelte";

  const monthNames: { [k: number]: string } = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const title = $derived.by(() => {
    const left = selection.current.day % 10;
    let ending =
      left === 1 ? "st" : left === 2 ? "nd" : left === 3 ? "rd" : "th";

    // special exception
    if (selection.current.day >= 11 && selection.current.day <= 13) {
      ending = "th";
    }

    return `${monthNames[selection.current.month]} ${selection.current.day + ending}`;
  });
</script>

<h1 class="text-6xl">{title}</h1>
