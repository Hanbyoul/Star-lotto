import dbConnect from "@/app/lib/mongoose/dbConnect";
import Lottery, { LotterySchema } from "@/app/models/Lottery";
import User, { UserSchema } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

interface BodyParams {
  userId: string;
  round: number;
  numbers: number[];
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body: BodyParams = await req.json();

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
