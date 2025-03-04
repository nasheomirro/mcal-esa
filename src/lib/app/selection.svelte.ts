import type { YMD } from "./types";
import { YMDUtils } from "./utils";

class CurrentSelection {
  #current: YMD = $state(YMDUtils.LATEST_YMD);

  get current() {
    return this.#current;
  }

  /** checks if the current selection is considered "stale" */
  get isStale() {
    return (
      YMDUtils.differenceInDays(selection.current, YMDUtils.LATEST_YMD) < -6
    );
  }

  // make it so that changing YMD has to go through this fn
  async updateCurrent(ymd: YMD) {
    this.#current = ymd;
  }
}

export const selection = new CurrentSelection();
