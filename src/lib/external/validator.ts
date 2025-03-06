import type { ExternalJSONData, Win, YMDContext } from "$lib/app/types";
import { sampleData } from "./sample";

const { context, win } = sampleData;

const contextKeys = Object.keys(context).sort();
const winKeys = Object.keys(win).sort();

export function isExternalJSONData(obj: any): obj is ExternalJSONData {
  if (!obj.wins || !obj.contexts) return false;

  const areAllWins = obj.wins.every((_win: any) => isWin(_win));
  const areAllContexts = obj.contexts.every((_context: any) =>
    isContext(_context)
  );

  return areAllContexts && areAllWins;
}

function isWin(obj: any): obj is Win {
  let keys = Object.keys(obj).sort();
  if (keys.length < winKeys.length) return false;
  return keys.every((value, index) => value === winKeys[index]);
}

function isContext(obj: any): obj is YMDContext {
  let keys = Object.keys(obj).sort();
  if (keys.length < contextKeys.length) return false;
  return keys.every((value, index) => value === contextKeys[index]);
}
