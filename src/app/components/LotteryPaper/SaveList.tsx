import {
  currentDrawCountState,
  loadListSelector,
  spinCountState,
} from "@/store/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { css, styled } from "styled-components";
import { nextDrawing } from "../../utils/nextDrawing";
import { dateFormat } from "../../utils/dateFormat";
import { arrChar } from "../../constant/lineCount";
import { useSession } from "next-auth/react";
import { Session } from "../Navigation";

const SaveList = () => {
  const loadList = useRecoilValue(loadListSelector);
  const spinCount = useRecoilValue(spinCountState);
  const currentDrawCount = useRecoilValue(currentDrawCountState);
  const nextDrawDate = nextDrawing(currentDrawCount);
  const listChar = arrChar.slice(0, loadList ? loadList.length : 0);
  const { data } = useSession();
  const session = data as Session;

  console.log("로또 용지 컴포넌트", session);

  /**

   *  TODO (3) Lotto DB 구현
   *  TODO (4) API 업데이트 로직 + cron-job-org 스케쥴 셋팅
   *  TODO (5) MyPage 통계 구현
   *  TODO (6) 기타 DB 통계 구현
   *
   */
  console.log("저장된 번호", loadList);

  const getLotteryNumber = async (lottNum: any, session: any) => {
    // 세션에서 유저 아이디 , lottoNum 을 api로 보낸다.
    // API에서 DB 유저 아이디를 검색하고, 해당 유저의 DB ObjectId를 획득한 다음
    // 로또 번호를 Create 한다.
    // 정상적으로 생성완료시 메세지 창.
    // 비정상적으로 생성될 시 메세지 창.
    if (spinCount === 6) {
      const res = await fetch("http://localhost:3000/api/lottery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lottNum, session }),
      });
      const ok = await res.json();
      console.log("res", ok);
      if (ok.success) {
        alert("로또 번호가 저장되었습니다.");
      } else {
        alert("로또 번호 저장에 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    if (session?.user && loadList.length >= 1) {
      console.log(" 한 세트만 볼꺼야", loadList.slice(-1));
      const lottNum = loadList.slice(-1).flat();
      getLotteryNumber(lottNum, session);
    }
  }, [session, loadList]);

  return (
    <Container>
      <Title>
        <h1>제 {currentDrawCount + 1}회</h1>
        <div>{`추첨일 : ${dateFormat(nextDrawDate)}`}</div>
        {listChar.map((char) => (
          <ListChar key={char}>{char}</ListChar>
        ))}
      </Title>

      <Area>
        {loadList?.map((list, index) => (
          <ListBall key={index}>
            {list.map((ball) => (
              <Ball key={ball} num={ball}>
                {ball}
              </Ball>
            ))}
          </ListBall>
        ))}
      </Area>
    </Container>
  );
};

export default React.memo(SaveList);

const Container = styled.div`
  position: relative;
  border-radius: 25px;
  width: 380px;
  min-height: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: url("/list.png");
  background-position: center center;
  background-size: cover;
`;

const Title = styled.div`
  position: absolute;
  top: 131px;
  text-align: center;
  h1 {
    font-weight: 700;
    font-size: large;
  }
`;

const Area = styled.div`
  position: absolute;
  top: 189px;
`;

const ListChar = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: large;
  font-weight: 700;
  right: 140px;
  top: 17px;
  margin-bottom: 22px;
`;

const ListBall = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
  border-radius: 25px;
  height: 45px;
`;

const Ball = styled.div<{ num: number }>`
  margin-top: 5px;
  margin-right: 2px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
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
