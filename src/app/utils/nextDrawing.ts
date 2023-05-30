export function nextDrawing(currentCount: number) {
  let baseDate = new Date("2002-12-07");
  let AddDay = currentCount * 7;
  baseDate.setDate(baseDate.getDate() + AddDay);
  return baseDate;
}
