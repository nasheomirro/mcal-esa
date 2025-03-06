import { SvelteMap } from "svelte/reactivity";
import type { IDBPDatabase } from "idb";
import { openAppDB, type McalDBSchema } from "./db";
import type { YMDContext, Win } from "./types";

class AppStore {
  #db: IDBPDatabase<McalDBSchema>;
  #wins = new SvelteMap<string, Win>();
  #contexts = new SvelteMap<string, YMDContext>();

  constructor(
    db: IDBPDatabase<McalDBSchema>,
    wins: Win[],
    contexts: YMDContext[]
  ) {
    this.#db = db;
    wins.forEach((i) => this.#wins.set(i.id, i));
    contexts.forEach((i) => this.#contexts.set(i.id, i));
  }

  get wins() {
    return [...this.#wins.values()];
  }

  get contexts() {
    return {
      get: this.#contexts.get.bind(this.#contexts),
      has: this.#contexts.has.bind(this.#contexts),
      values: this.#contexts.values.bind(this.#contexts),
    };
  }

  async createWin(win: Win) {
    await this.#db.add("wins", win);
    this.#wins.set(win.id, win);
  }

  async createContext(context: YMDContext) {
    await this.#db.add("contexts", context);
    this.#contexts.set(context.id, context);
  }

  async updateWin(
    id: string,
    updates: Partial<Pick<Win, "value" | "strength">>
  ) {
    const stale = await this.#db.get("wins", id);
    if (stale) {
      const fresh: Win = { ...stale, ...updates, updatedOn: new Date().toString() };
      await this.#db.put("wins", fresh);
      this.#wins.set(id, fresh);
    }
  }

  async updateContext(
    id: string,
    updates: Partial<Pick<YMDContext, "title" | "value" | "isForcedUnlocked">>
  ) {
    const stale = await this.#db.get("contexts", id);
    if (stale) {
      const fresh: YMDContext = { ...stale, ...updates, updatedOn: (new Date()).toString() };
      await this.#db.put("contexts", fresh);
      this.#contexts.set(id, fresh);
    }
  }

  async deleteWin(id: string) {
    await this.#db.delete("wins", id);
    this.#wins.delete(id);
  }

  async deleteContext(id: string) {
    await this.#db.delete("contexts", id);
    this.#contexts.delete(id);
  }

  /** CLEARS everything from the db! */
  async clear() {
    await Promise.all([this.#db.clear("wins"), this.#db.clear("contexts")]);
    this.#wins.clear();
    this.#contexts.clear();
  }
}

const db = await openAppDB();
const data = await Promise.all([db.getAll("wins"), db.getAll("contexts")]);

export const store = new AppStore(db, ...data);
