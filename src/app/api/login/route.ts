import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import bcrypt from "bcrypt";

import User, { UserAuth, UserSchema } from "@/app/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body: UserAuth = await req.json();

  console.log("뭘받았냐", body);

  const { userId, password } = body;
  const user = (await User.findOne({ userId })) as UserSchema;
  console.log(user);

  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json(user);
}

/**
 * TODO: 로그인한 사용자의 홈페이지 내비게이션 링크 수정
 * TODO: 로그인한 사용자 정보 세션에 저장하기
 */
