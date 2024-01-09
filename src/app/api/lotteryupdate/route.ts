import dbConnect from "@/app/lib/mongoose/dbConnect";
import Lottery, { LotterySchema } from "@/app/models/Lottery";
import WinningRound, { WinningNum } from "@/app/models/WinningRound";
import checkLottoRank from "@/app/utils/checkLottoRank";
import { NextRequest, NextResponse } from "next/server";

/**
 * TODO: 서버 배포후 cron-job-org 스케쥴 등록
 * ? lotteryupdate , roundupdate
 * 최신회차 로또 API 업데이트 시간 파악하기.
 *  매주 토요일 20시에 해당회차 판매 마감됨.
 *  매주 토요일 20:35분에 당첨 결과가 나옴
 *  20:35 분 이후로 부터 당첨번호 API 업데이트 시간 파악. (파악 되더라도 널널하게 시간 잡기)
 */

export async function POST(req: NextRequest) {
  const reqAuth = req.headers.get("authorization");
  if (reqAuth === process.env.UPDATE_AUTH) {
    dbConnect();
    const pendingLotto = (await Lottery.find({
      status: "Pending",
    })) as LotterySchema[];
    console.log(pendingLotto);

    if (pendingLotto.length === 0) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    let winningNumber = (await WinningRound.findOne({
      round: pendingLotto[0].round,
    })) as WinningNum | null;

    for (const lotto of pendingLotto) {
      if (!winningNumber || lotto.round !== winningNumber.round) {
        winningNumber = await WinningRound.findOne({ round: lotto.round });
      }

      const resultRank = checkLottoRank(lotto.numbers, winningNumber?.numbers!);
      lotto.status = "Succeed";
      lotto.rank = resultRank;
      await lotto.save();
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "인증에 실패하였습니다." },
      { status: 401 }
    );
  }
}
