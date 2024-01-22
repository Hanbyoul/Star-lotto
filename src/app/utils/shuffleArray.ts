import { LINE_LIMITED_COUNT } from "../constant/lineCount";

export default function shuffleArray(array: number[]) {
  const numbers: number[][] = [];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  for (let i = 0; i < LINE_LIMITED_COUNT; i++) {
    let mix = array.splice(0, 10);
    array.splice(44, 0, ...mix);
    numbers.push([...array]);
  }

  return numbers;
}
