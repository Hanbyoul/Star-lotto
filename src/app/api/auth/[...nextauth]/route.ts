import { DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

interface tokenUser extends JWT {
  userId?: string;
}

interface userInfo extends DefaultUser {
  userId?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userId: { label: "userId", type: "text" },
        password: { label: "passWord", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { userId, password } = credentials;

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            password,
          }),
        });

        const user = await res.json();

        if (res.status === 401) {
          throw new Error("");
        }

        if (res.status === 200 && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const tokenUser = token as tokenUser;
        const userInfo = user as userInfo;
        tokenUser.userId = userInfo.userId;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         userId: { label: "id", type: "text" },
//         password: { label: "password", type: "password" },
//       },

//       async authorize(credentials, req) {
//         /**
//          * TODO: 문제점 1) 토큰정보 가져오는 방법을 모름
//          * TODO: 문제점 2) 만약 여기서 DB에서 확인하는 방식을 구현할 꺼면 Login API route가 필요가 없게됨.
//          * TODO: 일단 여기서는 유저 정보를 서버로 보내서 , 서버에서 검증후 응답받은 데이터를 받아서 ssesion에 저장해야하는 방법을 모색...
//          */

//         const res = fetch("http://localhost:3000/api/login", {
//           method: "POST",
//           body: JSON.stringify(credentials),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         await dbConnect();
//         if (!credentials) return null;
//         const { userId, password } = credentials;
//         const user = await User.findOne({ userId });
//         if (!user) {
//           console.log("아이디 또는 비밀번호가 일치하지 않습니다.");
//           return null;
//         }
//         const pwcheck = await bcrypt.compare(password, user.password);
//         if (!pwcheck) {
//           console.log("비번틀림");
//           return null;
//         }
//         return user;
//       },
//     }),
//   ],
//   /**
//    * TODO :NextAuth 공부 및 셋팅하기
//    * TODO : 로그인 구현하기
//    * 아직 소셜 로그인 구현안함.
//    * TODO :일반 로그인, DB 설계 이후에 진행 예정
//    *
//    *
//    *
//    *
//    *
//    */
// };

// export default NextAuth(authOptions);
