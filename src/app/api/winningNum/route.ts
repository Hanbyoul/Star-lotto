import { NextRequest, NextResponse } from "next/server";
import next from "next/types";

/**
 * TODO: API에서 최신회차를 받으면 DB를 업데이트 시킨다.
 * TODO: API !ROUND(회차)가 존재하지 않을 경우 업데이트 시킨다.
 *
 *
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");
  const id = 1069;

  const res = await fetch(
    `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${id}`,
    {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  console.log(data);
  return NextResponse.json({ data });
}

/**
 * TODO 1 : Mongoose Connect 셋팅하기.
 * TODO 2 : LOTTO ROUND DB 저장 기능 구축.
 * TODO 3 : USER 소셜미디어 없이 , 로그인,가입 기능 구축. (개인정보 보호차원 ID,PassWord 만 입력받음)
 * TODO 4 : User,Lotto Schema 설계하기
 */
