import dbConnect from "@/app/lib/mongoose/dbConnect";
import Lottery, { LotterySchema } from "@/app/models/Lottery";
import User, { UserSchema } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
  const session = (await getServerSession(authOptions)) as SessionProps;

  const userId = session.user.userId;

  await dbConnect();
  const owner = (await User.findOne({ userId })) as UserSchema;

  if (!owner) {
    return NextResponse.json(
      { message: "존재하지 않는 사용자입니다." },
      { status: 400 }
    );
  }

  const lottoData = (await Lottery.find({
    owner: owner._id,
  })) as LotterySchema[];

  if (!lottoData.length) {
    return NextResponse.json(
      { message: "로또가 존재하지 않습니다." },
      { status: 400 }
    );
  }

  return NextResponse.json(lottoData.reverse(), { status: 200 });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body: PostBodyParams = await req.json();

  const { userId, round, numbers } = body;
  const user = (await User.findOne({ userId })) as UserSchema;

  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 });
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

  return NextResponse.json({ success: true }, { status: 200 });
}
