import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { PasswordForm } from "@/app/components/MyList/AccountSettings";
import { authOptions } from "../auth/[...nextauth]/route";
import User, { UserSchema } from "@/app/models/User";

interface SessionProps {
  user: {
    userId: string;
  };
}

export async function POST(req: NextRequest) {
  const body: PasswordForm = await req.json();
  const { oldPassword, newPassword } = body;
  const session = (await getServerSession(authOptions)) as SessionProps;
  const userId = session.user.userId;

  await dbConnect();

  const user = (await User.findOne({ userId })) as UserSchema;

  const passwordCheck = await bcrypt.compare(oldPassword, user.password);

  if (!passwordCheck) {
    return NextResponse.json({ success: false }, { status: 401 });
  } else {
    user.password = newPassword;
    user.save();

    return NextResponse.json({ success: true }, { status: 200 });
  }
}
