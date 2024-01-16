import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import User from "@/app/models/User";
import handleError from "@/app/utils/handleError";

interface SessionProps {
  user: {
    userId: string;
  };
}

export async function DELETE() {
  try {
    dbConnect();
    const session = (await getServerSession(authOptions)) as SessionProps;
    const userId = session.user.userId;

    const userDelete = await User.deleteOne({ userId });

    if (!userDelete.deletedCount) {
      return NextResponse.json(
        { message: "탈퇴에 실패하였습니다." },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ message: "탈퇴되었습니다." }, { status: 200 });
    }
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
