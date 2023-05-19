import shuffleArray from "@/app/hooks/ShuffleArray";
import { atom, selector } from "recoil";

export type numberKey = number;

const numberArray = Array.from({ length: 45 }, (_, idx) => idx + 1);

const numbers = shuffleArray(numberArray);

export const numberState = atom<numberKey[][]>({
  key: "numberList",
  default: numbers,
});

export const saveBallState = atom<numberKey[]>({
  key: "BallList",
  default: [],
});

export const allSpinState = atom({
  key: "spinning",
  default: false,
});

export const lineStopState = atom<numberKey>({
  key: "stopCount",
  default: 0,
});

export const listResetState = atom({
  key: "resetSwitch",
  default: false,
});
