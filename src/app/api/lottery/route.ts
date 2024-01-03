import dbConnect from "@/app/lib/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  console.log("받은 데이터", body);

  return NextResponse.json({ success: true });
}
