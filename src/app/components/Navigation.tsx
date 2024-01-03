"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export interface Session {
  user?: {
    userId: string;
  };
}

export default function Navigation() {
  const { data } = useSession();
  const session = data as Session;

  console.log("유저세션", session);

  return (
    <div className="flex justify-center relative">
      <Link href={"/"}>
        <img src="/logo.png" alt="logo" width={"270px"} />
      </Link>
      <div className="absolute right-20 top-5 ">
        <ul className="flex">
          {session?.user ? (
            <>
              <li className="mx-3 cursor-pointer">당첨자</li>
              <li className="mx-3 cursor-pointer" onClick={() => signOut()}>
                로그아웃
              </li>
              <li className="mx-3 cursor-pointer">{session.user.userId}</li>
            </>
          ) : (
            <li className="mx-3 cursor-pointer" onClick={() => signIn()}>
              로그인
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// 당첨자 page
// My Page 만들기
