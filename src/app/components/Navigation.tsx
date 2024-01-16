"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export interface Session {
  user?: {
    userId: string;
    createAt: Date;
    email: string;
  };
}

/**  현재 홈 , 로그인 페이지만
//  * TODO: My Page 만들기
//  *  - 내가 산 로또 확인 (페이지 네이션, 당첨 유무)
 *


 * TODO: 마이리스트 페이지 개인정보 수정 및 계정 생성 날짜 업데이트.
 * TODO: 마이리스트 페이지 로또 생성 날짜 업데이트
 * TODO: 사용자 Schema email 추가 및 nextAuth 추가 설정.
 * TODO: Gmail SMTP 설정.
 * 
 * 
 * 
 * TODO: 당첨자 Page 만들기
 *  - 당첨된 유저 아이디 뒷자리 3개 *처리하여 개인정보 보호하면서
 *  - 생성 날짜
 *  - 당첨 등수 (오름차순 - 낮은 등수 순으로)
 * 
 *
 * 
 *
 * TODO: 통계 ( 전체 / 회차 )
 *  - 로또 총 저장 수
 *  - 당첨 배출수
 *  - 로또 낙첨 수
 * 
 *
 * 
 * TODO: 계정 변경 기능.
 * P/W 변경
 * 비밀번호 찾기?
 *  - 이메일 인증
 *  - 가입이 입력한 TEXT로 체크
 *  
 *  ㄴ 하여 일치하면 새 비밀번호 지정 및 저장 업데이트 
 * 
 *  당첨시 이메일로 당첨 안내 메일 발송.  (가입시 이메일 수신 체크 항목 생성)
 * 
 * 

 * 회원탈퇴 기능.
 *  - 인증방법 : 사용자 pw 확인후 탈퇴 가능.
 *  - 탈퇴시 컨펌 메세지.
 * 
 */

export default function Navigation() {
  const { data } = useSession();
  const session = data as Session;
  /**
   * TODO: 내비게이션바 스타일, UI 배치 수정 해야함.
   * 모바일 사용 고려
   */
  return (
    <div className="flex justify-center relative">
      <Link href={"/"}>
        <img src="/logo.png" alt="logo" width={"270px"} />
      </Link>

      <div className="absolute right-20 top-5 ">
        <ul className="flex">
          <li className="mx-3 cursor-pointer">통계</li>
          <Link href={"/winnerList"}>
            <li className="mx-3 cursor-pointer">당첨현황</li>
          </Link>
          {session?.user ? (
            <>
              <Link href={"/info"}>
                <li className="mx-3 cursor-pointer">내정보</li>
              </Link>
              <li className="mx-3">{session.user.userId}</li>
              <li className="mx-3 cursor-pointer" onClick={() => signOut()}>
                로그아웃
              </li>
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
