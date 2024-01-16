import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { PasswordForm } from "@/app/components/MyList/AccountSettings";
import { authOptions } from "../[...nextauth]/route";
import User, { UserSchema } from "@/app/models/User";
import handleError from "@/app/utils/handleError";

interface SessionProps {
  user: {
    userId: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: PasswordForm = await req.json();
    const { oldPassword, newPassword } = body;
    const session = (await getServerSession(authOptions)) as SessionProps;
    const userId = session.user.userId;

    await dbConnect();

    const user = (await User.findOne({ userId })) as UserSchema;

    const passwordCheck = await bcrypt.compare(oldPassword, user.password);

    if (!passwordCheck) {
      return NextResponse.json(
        { message: "현재 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    } else {
      user.password = newPassword;
      user.save();

      return NextResponse.json(
        { message: "비밀번호가 변경되었습니다." },
        { status: 200 }
      );
    }
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
