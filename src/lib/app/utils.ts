import type { YMD } from "./types";

export class YMDUtils {
  static LATEST_YMD = this.toYMD(new Date());

  /** converts a `Date` object to `YMD` format */
  static toYMD(date: Date): YMD {
    return {
      month: date.getMonth(),
      day: date.getDate(),
      year: date.getFullYear(),
    };
  }

  /** checks whether `a` is in chronological order with `b`, or in simpler terms `a` comes before `b` */
  static isChron(a: YMD, b: YMD) {
    let y = a.year - b.year;
    let m = a.month - b.month;
    let d = a.day && b.day ? a.day - b.day : 0;

    if (y !== 0) return y < 0;
    if (m !== 0) return m < 0;
    return d <= 0;
  }

  /** checks if `a` and `b` are the same */
  static isMatch(a: YMD, b: YMD) {
    return (Object.keys(a) as (keyof YMD)[]).every((key) => a[key] === b[key]);
  }
}
