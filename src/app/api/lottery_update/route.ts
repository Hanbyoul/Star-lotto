import dbConnect from '../../lib/mongoose/dbConnect';
import Lottery, { LotterySchema } from '../../models/Lottery';
import WinningRound, { WinningNum } from '../../models/WinningRound';
import checkLottoRank from '../../utils/checkLottoRank';
import handleError from '../../utils/handleError';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const reqAuth = req.headers.get('authorization');
		if (reqAuth === process.env.UPDATE_AUTH) {
			dbConnect();
			const pendingLotto = (await Lottery.find({
				status: 'Pending',
			})) as LotterySchema[];

			if (pendingLotto.length === 0) {
				return NextResponse.json(
					{ message: '조회된 로또가 없습니다.' },
					{ status: 404 },
				);
			}

			let winningNumber = (await WinningRound.findOne({
				round: pendingLotto[0].round,
			})) as WinningNum | null;

			for (const lotto of pendingLotto) {
				if (!winningNumber || lotto.round !== winningNumber.round) {
					winningNumber = await WinningRound.findOne({ round: lotto.round });
				}

				if (!winningNumber || !winningNumber.numbers) {
					return NextResponse.json(
						{ message: '현재 당첨번호 조회 과정에서 오류가 발생되었습니다.' },
						{ status: 404 },
					);
				}

				const resultRank = checkLottoRank(
					lotto.numbers,
					winningNumber?.numbers,
				);
				lotto.status = 'Succeed';
				lotto.rank = resultRank;
				await lotto.save();
			}

			return NextResponse.json(
				{ message: '추첨 대기 중인 로또 업데이트가 완료되었습니다.' },
				{ status: 200 },
			);
		} else {
			return NextResponse.json(
				{ message: '인증에 실패하였습니다.' },
				{ status: 401 },
			);
		}
	} catch (error) {
		handleError(error);
		return NextResponse.json(
			{ message: '서버 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
