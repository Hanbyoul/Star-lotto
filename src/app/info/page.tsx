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
import Loadings from "../components/MyList/Loadings";

const Page = () => {
  const [totalLotto, setToTalLotto] = useRecoilState(userLottoState);
  const [isLoading, setIsLoading] = useState(false);
  const currentData = useRecoilValue(userPageDataSelector);

  const getLotto = async () => {
    setIsLoading(true);
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
  return (
    <Container>
      <Title>My List</Title>
      <Dashboard>
        {isLoading ? (
          <LoadArea>
            <Loadings />
          </LoadArea>
        ) : (
          <>
            <Section className="border-solid border-r">
              <Stats />
            </Section>
            <Section className="border-solid border-l">
              {totalLotto.length > 0 ? (
                currentData.map((lott) => (
                  <LottoList
                    numbers={lott.numbers}
                    rank={lott.rank}
                    round={lott.round}
                    key={lott._id}
                  />
                ))
              ) : (
                <NoSavedLottos>
                  <h1>저장된 로또가 없습니다.</h1>
                </NoSavedLottos>
              )}
              <PageNation />
            </Section>
          </>
        )}
      </Dashboard>
    </Container>
  );
};

// 모바일 사용시 s-content flex 해제

export default Page;

const Container = styled.div`
  margin-top: 50px;
  width: 720px;
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
  font-weight: bold;
`;

const Dashboard = styled.div`
  display: flex;
  min-height: 500px;
`;

const Section = styled.div`
  position: relative;
  width: 50%;
`;

const NoSavedLottos = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const LoadArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

{
  /* 리스트 map 
          로또 Documents Length   총 갯수
          rank === "lose" length 낙첨
          rank !== "lose" length 당첨
          rank === 1 length
          rank === 2 length
          rank === 3 length
          rank === 4 length
          rank === 5 length

          차트 - 범례 가로
            */
}
