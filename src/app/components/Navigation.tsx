"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { useEffect } from "react";

interface Session {
  user?: {
    userId: string;
  };
}

export default function Navigation() {
  const { data } = useSession();
  const session = data as Session;

  return (
    <div className="flex justify-center relative">
      <Link href={"/"}>
        <img src="/logo.png" alt="logo" width={"270px"} />
      </Link>
      <div className="absolute right-20 top-5 ">
        <ul className="flex">
          {session?.user ? (
            <>
              <li className="mx-3">당첨자</li>
              <li className="mx-3" onClick={() => signOut()}>
                로그아웃
              </li>
              <li className="mx-3">{session.user.userId}</li>
            </>
          ) : (
            <li className="mx-3" onClick={() => signIn()}>
              로그인
            </li>
          )}
        </ul>
        {/* <Link href={"/"} className="mx-5">
          당첨자
        </Link>
        <Link href={"/login"} className="mx-5">
          로그인
        </Link>
        <Link href={"/info"} className="mx-5">
          내정보
        </Link> */}
      </div>
    </div>
  );
}

/**
 * 로그인 버튼을 누르면
 * 내가 만든 로그인 폼으로 NextAuth pages 설정.
 * 아이디 또는 비밀번호가 틀렸을 경우 alter 메세지 출력.
 * 로그인시 로그인 내비 제거, userId 표기 및 로그아웃 내비 생성
 *
 * 이후.... 유저 기능 추가하기......
 *
 *
 */
