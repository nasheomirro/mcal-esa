type WinStrength = 1 | 2 | 3;

/** primary data type for the application's goal */
export type Win = {
  id: string;
  ymd: YMD;
  value: string;
  strength: WinStrength;
  updatedOn: Date;
  createdOn: Date;
};

/** extra information explicitly attached to the specified YMD */
export type YMDContext = {
  id: string;
  ymd: YMD;
  title: string;
  value: string;
  updatedOn: Date;
  createdOn: Date;
};

export type YMD = {
  year: number;
  month: number;
  day: number;
};
