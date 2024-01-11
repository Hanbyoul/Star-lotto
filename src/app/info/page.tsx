"use client";

import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { styled } from "styled-components";
import Stats from "../components/MyList/Stats";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  lottoProps,
  userLottoState,
  userPageDataSelector,
} from "@/\bGlobalState/atom";
import LottoList from "../components/MyList/LottoList";
import PageNation from "../components/MyList/PageNation";

const Page = () => {
  const [totalLotto, setToTalLotto] = useRecoilState(userLottoState);
  const [isLoading, setIsLoading] = useState(false);
  const currentData = useRecoilValue(userPageDataSelector);

  const getLotto = async () => {
    setIsLoading(true);
    console.log("DB요청");
    try {
      const res = await fetch(`http://localhost:3000/api/lottery`);
      if (!res.ok) {
        throw new Error(`HTTP error : ${res.status}`);
      }
      const data = (await res.json()) as lottoProps[];

      setToTalLotto(data);
    } catch (error) {
      console.error("Fetching Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLotto();
  }, []);
  console.log(" totalLotto :", totalLotto);
  return (
    <Container>
      <Title>My List</Title>
      <Dashboard>
        <Section className="border-solid border-r">
          {/* 리스트 map 
          로또 Documents Length   총 갯수
          rank === "lose" length 낙첨
          rank !== "lose" length 당첨
          rank === 1 length
          rank === 2 length
          rank === 3 length
          rank === 4 length
          rank === 5 length

          차트 - 범례 가로
            */}
          <Stats />
        </Section>

        {/* totalLotto.length로 파악하면 
    lotto가 없는 경우와
    totalLotto data를 로딩하는 경우를 다 넣기 힘듬..
    로직 변경해야함.


*/}
        <Section className="border-solid border-l">
          {isLoading ? (
            <div>로딩중</div>
          ) : totalLotto.length > 0 ? (
            currentData.map((lott) => (
              <LottoList
                numbers={lott.numbers}
                rank={lott.rank}
                round={lott.round}
                key={lott._id}
              />
            ))
          ) : (
            <div>저장된 로또가 없습니다.</div>
          )}

          <PageNation />
        </Section>
      </Dashboard>
    </Container>
  );
};

// 모바일 사용시 s-content flex 해제

export default Page;

const Container = styled.div`
  margin-top: 50px;
  width: 720px;
  height: 75%;
  background-color: white;
  border-radius: 20px;
  border: solid 1px #e5e7eb;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  border-bottom: solid 2px #e5e7eb;
  font-size: x-large;
`;

const Dashboard = styled.div`
  display: flex;
  min-height: 700px;
`;

const Section = styled.div`
  position: relative;
  width: 50%;
`;

{
  /*
          클라이언트 컴포넌트를 담기 위한 컴포넌트를 하나더 생성.
           거기에 로또 리스트 + 페이지네이션 컴포넌트 생성.

          리스트 map 
          round
          numbers
          rank

          rank === null                     대기
          rank === "lose"                   낙첨
          rank !== "lose" && rank !== null  당첨
          
          페이지네이션 8개 

            */
}
