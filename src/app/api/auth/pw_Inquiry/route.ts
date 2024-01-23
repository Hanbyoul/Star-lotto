import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose/dbConnect";
import User, { UserSchema } from "../../../models/User";
import handleError from "../../../utils/handleError";
import { UserInput } from "@/app/pwInquiry/page";
import generateRandomPassword from "@/app/utils/generateRandomPassword";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body: UserInput = await req.json();
    const { userId, email } = body;
    await dbConnect();
    const user = (await User.findOne({ userId, email })) as UserSchema;

    if (!user) {
      return NextResponse.json(
        { message: "가입시 입력한 아이디 또는 이메일과 일치하지 않습니다." },
        { status: 400 }
      );
    }

    const newPassword = generateRandomPassword();
    user.password = newPassword;
    user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_SMTP_ID,
        pass: process.env.GMAIL_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_SMTP_ID,
      to: email,
      subject: "임시 비밀번호입니다.",
      html: `<p><strong>${userId}</strong>님의 비밀번호가 재설정되었습니다.<br/>임시 비밀번호는 <span style="background-color: grey; color: white; font-size: 24px; ">${newPassword}</span>입니다.<br/>로그인후 재설정바랍니다.</p>`,
    };

    const mailResult = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + mailResult.response);
    return NextResponse.json(
      { message: "임시 비밀번호가 이메일로 발송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    handleError(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
