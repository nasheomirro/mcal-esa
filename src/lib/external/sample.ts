import type { Win, YMDContext } from "$lib/app/types";

const win: Win = {
  id: "",
  createdOn: '',
  updatedOn: '',
  strength: 1,
  value: "",
  ymd: {
    year: 1,
    day: 1,
    month: 1,
  },
};

const context: YMDContext = {
  id: "",
  createdOn: '',
  updatedOn: '',
  title: "",
  value: "",
  ymd: {
    year: 1,
    month: 1,
    day: 1,
  },
  isForcedUnlocked: false
};

/** 
 * contains correctly-formatted data for testing external data to be uploaded in.
 * NOTE that sample data only contains keys that are required (no partials)
 */
export const sampleData = {
  win,
  context,
};
