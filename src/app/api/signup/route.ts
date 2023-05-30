import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import User from "@/app/models/User";

export async function GET(req: NextRequest) {
  await dbConnect();
  const data = await User.find({});
  console.log("뭐가 들엇냐", data);

  /**
   * Next-Auth로 로그인 관리 예정.
   * TODO: 해당 API는 회원가입 로직만 구현하기.
   *
   */

  return NextResponse.json("Wow!!!");
}
