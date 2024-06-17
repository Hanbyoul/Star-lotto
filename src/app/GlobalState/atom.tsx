import { getLottoCount } from '../utils/latestCount';
import shuffleArray from '../utils/shuffleArray';
import sortingArray from '../utils/sortingArray';
import { atom, selector } from 'recoil';

export type RankType = 1 | 2 | 3 | 4 | 5 | 'lose' | null;
export type StatusType = 'Succeed' | 'Pending';

export interface LottoProps {
	round?: number;
	numbers?: number[];
	rank?: RankType;
	status?: StatusType;
	_id?: string;
	createAt?: Date;
}

let prevList: number[][] = [];

export const allSpinState = atom({
	key: 'AllSpin',
	default: false,
});

const numberArray = Array.from({ length: 45 }, (_, idx) => idx + 1);

const numbers = shuffleArray(numberArray);

export const numberState = atom<number[][]>({
	key: 'numberList',
	default: numbers,
});

export const spinCountState = atom<number>({
	key: 'stopCount',
	default: 0,
});

export const spinStopState = atom<{ [key: number]: boolean }>({
	key: 'spinBtnState',
	default: {
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
	},
});

export const saveListState = atom<number[]>({
	key: 'BallList',
	default: [],
});

export const isDuplicateState = atom<number[]>({
	key: 'Duplicate',
	default: [0, 0, 0, 0, 0, 0],
});

export const loadListSelector = selector({
	key: 'loadListSelector',
	get: ({ get }) => {
		const loadList: number[][] = [];
		const saveList = get(saveListState);
		const spinStopCount = get(spinCountState);

		if (!(saveList.length % 6) && spinStopCount === 6) {
			const CopyList = [...saveList];

			for (let i = 0; i < saveList.length / 6; i++) {
				const sortBall = sortingArray(CopyList.splice(0, 6));

				loadList.push(sortBall);
			}
			prevList = [...loadList];
			return loadList;
		} else {
			return prevList;
		}
	},
});

export const currentDrawCountState = atom({
	key: 'drawDate',
	default: getLottoCount(new Date()),
});
