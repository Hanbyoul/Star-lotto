import dbConnect from "@/app/lib/mongoose/dbConnect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/app/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();
        if (!credentials) return null;
        let user = await User.findOne({ userId: credentials.id });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],
  /**
   * TODO :NextAuth 공부 및 셋팅하기
   * TODO : 로그인 구현하기
   * TODO : 된다면 naver,kakao도 시도 해보기
   * TODO : 로그인 구현 완료시 lotto api db저장 구현하기
   *
   *
   *
   *
   *
   */
};

export default NextAuth(authOptions);
