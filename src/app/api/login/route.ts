import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import bcrypt from "bcrypt";

import User, { UserAuth, UserSchema } from "@/app/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body: UserAuth = await req.json();

  const { userId, password } = body;
  const user = (await User.findOne({ userId })) as UserSchema;

  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json(user);
}
