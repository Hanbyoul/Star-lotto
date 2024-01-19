"use client";
import Link from "next/link";
import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/react";

export interface Session {
  user?: {
    userId: string;
    createAt: Date;
    email: string;
  };
}

/** 

 * TODO: Gmail SMTP 설정.
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

 */

export default function Navigation() {
  const { data } = useSession();
  const session = data as Session;
  /**
   * TODO: 내비게이션바 스타일, UI 배치 수정 해야함.
   * 모바일 사용 고려
   */

  return (
    <Container>
      <MenuArea>
        <MenuBar>햄버거아이콘</MenuBar>
        <LogoArea>
          <Link href={"/"}>
            <img src="/logo.png" alt="logo" width={"180px"} />
          </Link>
        </LogoArea>

        <ListLink>
          <Link href={"/lottoStats"}>
            <li>통계</li>
          </Link>
          <Link href={"/winnerList"}>
            <li>당첨현황</li>
          </Link>
          {session?.user ? (
            <>
              <Link href={"/info"}>
                <li>내정보</li>
              </Link>
              <li className="user">{session.user.userId}</li>
              <li onClick={() => signOut()}>로그아웃</li>
            </>
          ) : (
            <li onClick={() => signIn()}>로그인</li>
          )}
        </ListLink>
      </MenuArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const MenuArea = styled.div`
  min-width: 705px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-weight: 500;
`;

const LogoArea = styled.div``;

const ListLink = styled.ul`
  display: flex;
  li {
    margin-right: 10px;
    cursor: pointer;
  }
  .user {
    cursor: default;
  }
`;

const MenuBar = styled.span`
  display: none;
`;

// 복구용.
// return (
//   <div className="flex justify-center mb-5 ">
//     <div className="flex justify-between min-w-[700px] items-center bg-white rounded-b-2xl">
//       <div>
//         <Link href={"/"}>
//           <img src="/logo.png" alt="logo" width={"180px"} />
//         </Link>
//       </div>

//       <ul className="flex space-x-4 mr-5 font-semibold">
//         <Link href={"/lottoStats"}>
//           <li className="cursor-pointer">통계</li>
//         </Link>
//         <Link href={"/winnerList"}>
//           <li className="cursor-pointer">당첨현황</li>
//         </Link>
//         {session?.user ? (
//           <>
//             <Link href={"/info"}>
//               <li className="cursor-pointer ">내정보</li>
//             </Link>
//             <li>{session.user.userId}</li>
//             <li className="cursor-pointer" onClick={() => signOut()}>
//               로그아웃
//             </li>
//           </>
//         ) : (
//           <li className="cursor-pointer" onClick={() => signIn()}>
//             로그인
//           </li>
//         )}
//       </ul>
//     </div>
//   </div>
// );
