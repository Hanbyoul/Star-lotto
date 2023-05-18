import shuffleArray from "@/app/hooks/ShuffleArray";
import { atom, selector } from "recoil";

export type numberKey = number;

const numberArray = Array.from({ length: 45 }, (_, idx) => idx + 1);

const numbers = shuffleArray(numberArray);

export const numberState = atom<numberKey[][]>({
  key: "numberList",
  default: numbers,
});

export const saveList = atom<numberKey[]>({
  key: "BallList",
  default: [],
});

// export const saveSelector = selector({
//   key: "saveSelector",
//   get: ({ get }) => {
//     const lineBall = get(saveList);

//     console.log("line", lineBall);
//     const BallList: number[][] = [];
//     console.log("ball", BallList);

//     BallList.push(lineBall);
//     return BallList;
//   },
// });

export const allSpinning = atom({
  key: "spinning",
  default: false,
});

export const lineStopState = atom<numberKey>({
  key: "stopCount",
  default: 0,
});
