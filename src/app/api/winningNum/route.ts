import dbConnect from '../../lib/mongoose/dbConnect';
import WinningRound, { WinningNum } from '../../models/WinningRound';
import handleError from '../../utils/handleError';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const round = searchParams.get('round');
		await dbConnect();
		const winningNumber = (await WinningRound.findOne({ round })) as WinningNum;

		if (!winningNumber) {
			return NextResponse.json(
				{ message: '당첨번호 조회에 실패하였습니다.' },
				{ status: 400 },
			);
		}

		const { round: count, numbers, drawDate } = winningNumber;

		return NextResponse.json(
			{ count, numbers, drawDate, message: '당첨번호 조회에 성공하였습니다.' },
			{ status: 200 },
		);
	} catch (error) {
		handleError(error);
		return NextResponse.json(
			{ message: '서버 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
