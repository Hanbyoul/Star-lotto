import dbConnect from "@/app/lib/mongoose/dbConnect";
import WinningRound from "@/app/models/WinningRound";
import handleError from "@/app/utils/handleError";
import { getLottoCount } from "@/app/utils/latestCount";
import { NextRequest, NextResponse } from "next/server";

interface ResponseParams {
  drwNo: number;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
  drwNoDate: Date;
  returnValue: string;
}

/**
 * TODO: 서버 배포후 cron-job-org 스케쥴 등록
 * ? lotteryupdate , roundupdate
 * 최신회차 로또 API 업데이트 시간 파악하기.
 *  매주 토요일 20시에 해당회차 판매 마감됨.
 *  매주 토요일 20:35분에 당첨 결과가 나옴
 *  20:35 분 이후로 부터 당첨번호 API 업데이트 시간 파악. (파악 되더라도 널널하게 시간 잡기)
 */

export async function GET(req: NextRequest) {
  try {
    const reqAuth = req.headers.get("authorization");

    if (reqAuth === process.env.UPDATE_AUTH) {
      const now = new Date();
      const currentCount = getLottoCount(now);

      const res = await fetch(
        `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${currentCount}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: ResponseParams = await res.json();
      const { drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo } =
        data;

      if (data.returnValue === "fail") {
        return NextResponse.json(
          { message: "당첨결과가 없습니다." },
          { status: 400 }
        );
      } else {
        await dbConnect();

        await WinningRound.create({
          round: data.drwNo,
          numbers: [
            drwtNo1,
            drwtNo2,
            drwtNo3,
            drwtNo4,
            drwtNo5,
            drwtNo6,
            bnusNo,
          ],
          drawDate: data.drwNoDate,
        });

        return NextResponse.json(
          { message: "당첨번호 업데이트 완료되었습니다." },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "인증에 실패하였습니다." },
        { status: 401 }
      );
    }
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
