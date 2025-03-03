type WinStrength = 1 | 2 | 3;

/** primary data type for the application's goal */
type Win = {
  id: string;
  ymd: YMD;
  value: string;
  strength: WinStrength;
  updatedOn: Date;
  createdOn: Date;
};

/** extra information explicitly attached to the specified YMD */
type YMDContext = {
  id: string;
  ymd: YMD;
  title: string;
  value: string;
  updatedOn: Date;
  createdOn: Date;
};

type YMD = {
  y: number;
  m: number;
  d: number;
};
