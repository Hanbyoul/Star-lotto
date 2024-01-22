import dbConnect from "../../lib/mongoose/dbConnect";
import Lottery, { LotterySchema } from "../../models/Lottery";
import handleError from "../../utils/handleError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const isRound = searchParams.get("round");

    if (!isRound) {
      const allLottery = (await Lottery.find({})) as LotterySchema[];

      if (!allLottery.length) {
        return NextResponse.json(
          { message: "생성된 로또번호가 없습니다." },
          { status: 404 }
        );
      }

      return NextResponse.json(allLottery, { status: 200 });
    } else {
      const roundLottery = (await Lottery.find({
        round: isRound,
      })) as LotterySchema[];

      if (!roundLottery.length) {
        return NextResponse.json(
          { message: "생성된 로또번호가 없습니다." },
          { status: 404 }
        );
      }

      return NextResponse.json(roundLottery, { status: 200 });
    }
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
