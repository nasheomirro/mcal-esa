import { openDB, type DBSchema } from "idb";
import type { YMDContext, Win } from "./types";

export interface McalDBSchema extends DBSchema {
  wins: {
    key: string;
    value: Win;
  };
  contexts: {
    key: string;
    value: YMDContext;
  };
}

const DB_NAME = "mcal_primary_db";

export async function openAppDB() {
  return openDB<McalDBSchema>(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore("wins", { keyPath: "id" });
      db.createObjectStore("contexts", { keyPath: "id" });
    },
  });
}
