import { atom } from "recoil";

export type numberKey = number;

const numbers = Array.from({ length: 45 }, (_, idx) => idx + 1);

export const numberState = atom<numberKey[]>({
  key: "numberList",
  default: numbers,
});

export const selectList = atom<numberKey[]>({
  key: "BallList",
  default: [],
});
