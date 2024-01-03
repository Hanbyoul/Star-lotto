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

interface ResUser extends DefaultUser {
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

        const user: ResUser = await res.json();
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
