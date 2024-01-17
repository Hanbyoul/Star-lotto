import dbConnect from "@/app/lib/mongoose/dbConnect";
import Lottery, { LotterySchema } from "@/app/models/Lottery";
import User, { UserSchema } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import handleError from "@/app/utils/handleError";

interface PostBodyParams {
  userId: string;
  round: number;
  numbers: number[];
}
interface SessionProps {
  user: {
    userId: string;
  };
}

export async function GET() {
  try {
    await dbConnect();
    const session = (await getServerSession(authOptions)) as SessionProps;
    const userId = session.user.userId;
    const owner = (await User.findOne({ userId })) as UserSchema;

    if (!owner) {
      return NextResponse.json(
        { message: "존재하지 않는 사용자입니다." },
        { status: 404 }
      );
    }

    const lottoData = (await Lottery.find({
      owner: owner._id,
    })) as LotterySchema[];

    if (!lottoData.length) {
      return NextResponse.json(
        { message: "생성된 로또번호가 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(lottoData.reverse(), { status: 200 });
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body: PostBodyParams = await req.json();
    const { userId, round, numbers } = body;
    const user = (await User.findOne({ userId })) as UserSchema;

    if (!user) {
      return NextResponse.json(
        { message: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    const lotto = (await Lottery.create({
      owner: user._id,
      round,
      numbers,
    })) as LotterySchema;

    if (!user.lotto) {
      user.lotto = [];
    }

    user.lotto.push(lotto._id);
    await user.save();

    return NextResponse.json(
      { message: "로또 번호가 생성되었습니다." },
      { status: 201 }
    );
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
