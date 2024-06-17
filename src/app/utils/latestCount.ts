export function getLottoCount(currentDay: Date) {
	const start = new Date('2002-12-07');
	const end = new Date(currentDay);
	let count = 0;

	while (start <= end) {
		if (start.getDay() === 6) {
			count++;
		}
		start.setDate(start.getDate() + 1);
	}

	return count;
}
