import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const reqAuth = req.headers.get("authorization");

  if (reqAuth === process.env.UPDATE_AUTH) {
    console.log("인증성공");
    return NextResponse.json(
      { message: "인증에 성공하였습니다." },
      { status: 200 }
    );
  } else {
    console.log("인증실패");
    return NextResponse.json(
      { message: "인증에 실패하였습니다." },
      { status: 401 }
    );
  }
}
