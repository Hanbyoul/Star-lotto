import { LotteryWinner } from '../components/WinnerList/WinningLotto';

export default function sortWinnersByRank(data: LotteryWinner[]) {
	data.sort((a, b) => a.rank - b.rank);

	return data;
}
