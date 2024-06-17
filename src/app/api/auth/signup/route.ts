import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose/dbConnect';
import User, { UserSchema } from '../../../models/User';
import { SignUser } from '../../../components/Auth/SignUp';
import handleError from '../../../utils/handleError';

export async function POST(req: NextRequest) {
	try {
		await dbConnect();
		const body: SignUser = await req.json();

		if (!body.password) {
			const userId = body;
			const user = (await User.findOne({ userId })) as UserSchema;

			if (!user) {
				return NextResponse.json(
					{ message: '사용 가능한 아이디입니다.' },
					{ status: 200 },
				);
			} else {
				return NextResponse.json(
					{ message: '이미 사용중인 아이디입니다.' },
					{ status: 400 },
				);
			}
		}

		if (body.userId && body.password && body.email) {
			const { userId, password, email } = body;
			await User.create({
				userId,
				password,
				email,
			});

			return NextResponse.json(
				{ message: '회원가입이 완료되었습니다.' },
				{ status: 201 },
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
