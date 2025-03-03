import type { YMD } from "./types";
import { YMDUtils } from "./utils";

class CurrentSelection {
  #current: YMD = $state(YMDUtils.LATEST_YMD);
  get current() {
    return this.#current;
  }
  // make it so that changing YMD has to go through this fn
  updateCurrent(ymd: YMD) {
    this.#current = ymd;
  }
}

export const selection = new CurrentSelection();
