import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import User from "@/app/models/User";
import { SignUser, UserSchema } from "@/app/@types/mongodb";

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
}
