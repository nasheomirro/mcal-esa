export type WinStrength = 1 | 2 | 3;

/** primary data type for the application's goal */
export type Win = {
  id: string;
  ymd: YMD;
  value: string;
  strength: WinStrength;
  updatedOn: string;
  createdOn: string;
};

/** extra information explicitly attached to the specified YMD */
export type YMDContext = {
  /** id is made through the context's YMD */
  id: string;
  ymd: YMD;
  title: string;
  value: string;
  updatedOn: string;
  createdOn: string;
  /** overrides the default 'locking' from editing on old-enough days */
  isForcedUnlocked: boolean;
};

export type YMD = {
  year: number;
  month: number;
  day: number;
};

/** format used for exporting/importing user data */
export type ExternalJSONData = {
  wins: Win[];
  contexts: YMDContext[];
};
