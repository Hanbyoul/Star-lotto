import dbConnect from "@/app/lib/mongoose/dbConnect";
import WinningRound, { WinningNum } from "@/app/models/WinningRound";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const round = searchParams.get("round");
  await dbConnect();
  const winningNumber = (await WinningRound.findOne({ round })) as WinningNum;

  if (winningNumber === null) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const { round: count, numbers, drawDate } = winningNumber;

  return NextResponse.json(
    { count, numbers, drawDate, success: true },
    { status: 200 }
  );
}
