import dbConnect from '../../lib/mongoose/dbConnect';
import Lottery from '../../models/Lottery';
import handleError from '../../utils/handleError';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const round = searchParams.get('round');
		await dbConnect();

		const lottoDocs = await Lottery.find({
			round,
			status: 'Succeed',
			rank: { $ne: 'lose' },
		}).populate('owner', 'userId');

		if (!lottoDocs.length) {
			return NextResponse.json(
				{ message: '조회된 데이터가 없습니다.' },
				{ status: 404 },
			);
		}

		return NextResponse.json({ lottoDocs }, { status: 200 });
	} catch (error) {
		handleError(error);
		return NextResponse.json(
			{ message: '서버 오류가 발생했습니다.' },
			{ status: 500 },
		);
	}
}
