export default function checkLottoRank(
	lottoNumbers: number[],
	winningNumbers: number[],
) {
	let matchCount = 0;
	let isBonusMatched = false;

	// 주 번호 일치 개수 확인
	for (let i = 0; i < 6; i++) {
		if (winningNumbers.slice(0, 6).includes(lottoNumbers[i])) {
			matchCount++;
		}
	}

	// 보너스 번호 일치 여부 확인
	isBonusMatched = lottoNumbers.includes(winningNumbers[6]);

	// 당첨 등수 결정
	if (matchCount === 6) {
		return 1; // 1등
	} else if (matchCount === 5 && isBonusMatched) {
		return 2; // 2등
	} else if (matchCount === 5) {
		return 3; // 3등
	} else if (matchCount === 4) {
		return 4; // 4등
	} else if (matchCount === 3) {
		return 5; // 5등
	}

	return 'lose'; // 당첨되지 않음
}
