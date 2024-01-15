import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import User, { UserSchema } from "@/app/models/User";
import { SignUser } from "@/app/components/SignUp";

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
  if (body.userId && body.password && body.email) {
    console.log("가입진행", body);
    const { userId, password, email } = body;
    await User.create({
      userId,
      password,
      email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
