import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose/dbConnect";
import User from "@/app/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  const { id, password } = body;

  await User.create({
    userId: id,
    password,
  });

  console.log("회원가입 완료");

  return NextResponse.redirect(new URL("/", req.url));
}
