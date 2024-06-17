export function resultDateFormat(date: Date) {
	if (typeof date === 'string') {
		const baseDate = new Date(date);
		const year = baseDate.getFullYear();
		const month = baseDate.getMonth() + 1;
		const day = baseDate.getDate();
		const hour = baseDate.getHours();
		const minute = baseDate.getMinutes();
		const second = baseDate.getSeconds();

		const createLotteryDate = `${year}.${month.toString().padStart(2, '0')}.${day
			.toString()
			.padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute
			.toString()
			.padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

		return createLotteryDate;
	}

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dayOfWeek = date.getDay();

	const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];

	const nextWiningDate = `${year}/${month.toString().padStart(2, '0')}/${day
		.toString()
		.padStart(2, '0')}(${daysInKorean[dayOfWeek]})`;

	return nextWiningDate;
}
