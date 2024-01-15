import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User, { UserSchema } from "@/app/models/User";

interface SessionProps {
  user: {
    userId: string;
  };
}

export async function DELETE() {
  const session = (await getServerSession(authOptions)) as SessionProps;
  const userId = session.user.userId;
  const userDelete = await User.deleteOne({ userId });

  if (!userDelete.deletedCount) {
    return NextResponse.json({ success: false }, { status: 400 });
  } else {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
