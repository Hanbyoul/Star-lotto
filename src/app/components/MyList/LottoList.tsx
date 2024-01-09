"use client";
import { css, styled } from "styled-components";
export default function LottoList() {
  const lottoNum = [1, 11, 21, 22, 33, 44];
  return (
    <Container>
      <div>1100회</div>
      <ListBall>
        {lottoNum.map((ball) => (
          <Ball key={ball} num={ball}>
            {ball}
          </Ball>
        ))}
        <RoundResult>결과ddddd</RoundResult>
      </ListBall>
    </Container>
  );
}

/**
 * TODO:로또 카드 컴포넌트로 분리하기 (로또 생성현황에서 재사용 예정)
 * TODO: 결과부분 디자인 다시하기
 * TODO: DB 리스트업 하고 페이지네이션 구현하기
 */

// 로또 카드 컴포넌트로 분리하기
// 페이지 네이션

// 로그인 사용자 로또 data

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin-top: 10px;
  padding-left: 10px;
  border-bottom: solid 1px #e5e7eb;
`;

const ListBall = styled.div`
  display: flex;
  width: 100%;
`;

const Ball = styled.div<{ num: number }>`
  margin-right: 5px;
  height: 40px;
  width: 40px;
  min-width: 40px;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${(props) =>
    props.num <= 10
      ? "rgb(246,206,7)"
      : props.num <= 20
      ? "rgb(41,96,244)"
      : props.num <= 30
      ? "rgb(234,59,61)"
      : props.num <= 40
      ? "rgb(191,191,191)"
      : "rgb(16,196,102)"};
`;

const RoundResult = styled.div`
  margin-left: 2em;
  // 백그라운 컬러 , 폰트 , 명칭 : 추첨대기 / 낙첨 / 당첨
  // 결과에 따른 색상 변경
`;
