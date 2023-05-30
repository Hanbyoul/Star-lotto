import shuffleArray from "@/app/utils/ShuffleArray";
import { atom, selector } from "recoil";

export type numberKey = number;

const numberArray = Array.from({ length: 45 }, (_, idx) => idx + 1);

const numbers = shuffleArray(numberArray);

export const numberState = atom<numberKey[][]>({
  key: "numberList",
  default: numbers,
});

export const saveListState = atom<numberKey[]>({
  key: "BallList",
  default: [],
});

export const allSpinState = atom({
  key: "spinning",
  default: false,
});

export const spinStopState = atom<numberKey>({
  key: "stopCount",
  default: 0,
});

export const listResetState = atom({
  key: "resetSwitch",
  default: false,
});

export const currentDrawCountState = atom({
  key: "drawDate",
  default: 0,
});
