export function nextRoundDate(currentCount: number) {
	const baseDate = new Date('2002-12-07');
	const AddDay = currentCount * 7;
	baseDate.setDate(baseDate.getDate() + AddDay);
	return baseDate;
}
