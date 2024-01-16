import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import bcrypt from "bcrypt";

import User, { UserAuth, UserSchema } from "@/app/models/User";
import handleError from "@/app/utils/handleError";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body: UserAuth = await req.json();
    const { userId, password } = body;
    const user = (await User.findOne({ userId })) as UserSchema;

    if (!user) {
      return NextResponse.json(
        { message: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
