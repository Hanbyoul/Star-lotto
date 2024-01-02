import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import User, { SignUser, UserSchema } from "@/app/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body: SignUser = await req.json();

  // ID 충복 체크
  if (!body.password) {
    const userId = body;
    const user = (await User.findOne({ userId })) as UserSchema;

    if (!user) {
      console.log("중복아님!!");
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.log("중복됨");
      return NextResponse.json({ success: false }, { status: 400 });
    }
  }
  // 회원가입 진행
  if (body.password) {
    const { userId, password } = body;
    await User.create({
      userId,
      password,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  }

  /**
   * TODO: 회원 아이디 중복 체크 인증 >> DB에 id가 존재하는지
   * TODO: 로그인 페이지에 회원가입 버튼 추가하기
   * TODO: 타입 any 제거하기. (로그인 페이지+라우터,회원가입 페이지+라우터)
   * TODO: 로그인 session 구현하기
   *
   */
}
