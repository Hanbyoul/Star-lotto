import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import User, { UserAuth, UserSchema } from "@/app/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body: UserAuth = await req.json();

  console.log("뭘받았냐", body);

  const { userId, password } = body;
  const user = (await User.findOne({ userId })) as UserSchema;
  console.log(user);

  /** 아이디 체크
   * 유저 아이디를  db에 검색하여 일치하는 아이디가 있는지 체크
   * */

  // if (!user) {
  //   return NextResponse.json(
  //     { success: false },
  //     { status: 400 } // status 코드 확인하기 400인지 404인지...
  //   );
  // }

  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  /** 비밀번호 체크
   * db에 있는 user 정보의 password와 사용자가 입력한 password 비교하기
   * bcrypt compare 활용하여 해쉬 처리해서 일치하는지 확인.
   */

  const passwordCheck = await bcrypt.compare(password, user.password);
  console.log("비밀번호 일치유무", passwordCheck);

  // if (!passwordCheck) {
  //   return NextResponse.json({ success: false }, { status: 400 });
  // }

  if (!passwordCheck) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // return NextResponse.json({ success: true }, { status: 200 });
  return NextResponse.json(user);
}

/**
 * TODO: 로그인한 사용자의 홈페이지 내비게이션 링크 수정
 * TODO: 로그인한 사용자 정보 세션에 저장하기
 */
