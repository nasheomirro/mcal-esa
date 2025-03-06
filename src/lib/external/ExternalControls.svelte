<script lang="ts">
  import { store } from "$lib/app/store.svelte";
  import type { ExternalJSONData } from "$lib/app/types";
  import { save, open } from "@tauri-apps/plugin-dialog";
  import { create, readTextFile } from "@tauri-apps/plugin-fs";

  import { isExternalJSONData } from "./validator";

  async function attemptSaveData() {
    const path = await save({
      defaultPath: `snapshot-${new Date().toLocaleDateString().replaceAll("/", "-")}.json`,
      filters: [{ name: "JSON", extensions: ["json"] }],
    });

    if (!path) return;

    const externalData: ExternalJSONData = {
      wins: store.wins,
      contexts: [...store.contexts.values()],
    };

    const jsonData = JSON.stringify(externalData);
    const file = await create(path);
    await file.write(new TextEncoder().encode(jsonData));
    file.close();
  }

  async function loadExternalData() {
    const path = await open({
      directory: false,
      multiple: false,
      filters: [
        {
          name: "JSON",
          extensions: ["json"],
        },
      ],
    });

    if (!path) return;

    const jsonDataString = await readTextFile(path);
    const jsonData = JSON.parse(jsonDataString);

    if (isExternalJSONData(jsonData)) {
      await store.clear();
      jsonData.contexts.forEach((ctx) => store.createContext(ctx));
      jsonData.wins.forEach((win) => store.createWin(win));
      
      location.reload();
    }
  }

  async function handleKeydown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      await attemptSaveData();
    } else if (e.ctrlKey && e.key === "u") {
      e.preventDefault();
      await loadExternalData();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />
