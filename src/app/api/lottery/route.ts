import { headers } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
import next from "next/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const res = await fetch(
    `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${id}`,
    {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return NextResponse.json({ data });
}
