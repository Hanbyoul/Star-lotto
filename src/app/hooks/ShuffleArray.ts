export default function shuffleArray(array: number[]) {
  const lineSize = [7, 8, 7, 8, 7, 8];

  const numbers: number[][] = [];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  lineSize.forEach((size) => {
    let line: number[] = array.splice(0, size);
    numbers.push(line);
  });

  return numbers;
}
