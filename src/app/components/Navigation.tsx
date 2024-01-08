"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export interface Session {
  user?: {
    userId: string;
  };
}

/**  현재 홈 , 로그인 페이지만 완료됨.
 * TODO: My Page 만들기
 *  - 내가 산 로또 확인 (페이지 네이션, 당첨 유무)
 *
 * TODO: 당첨자 Page 만들기
 *  - 당첨된 유저 *처리하여 개인정보 보호하면서 , 당첨자 닉네임 표기
 *
 * TODO: 로또 저장 현황
 *  - 일자 별, 회차 별 로또 생성 내역
 *
 * TODO: 통계
 *  - 로또 총 저장 수
 *  - 당첨 배출수
 *  - 로또 낙첨 수
 *
 */

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
