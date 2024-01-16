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
import Loadings from "../components/Loadings";
import AccountSettings from "../components/MyList/AccountSettings";
import handleError from "../utils/handleError";

type ViewType = "Lotto" | "Auth";

interface ResponseMessage {
  message: string;
}

/**
 *
 * TODO: route - status 코드 수정하기.
 * TODO: 당첨결과 페이지 구현하기.
 *
 */

const Page = () => {
  const [totalLotto, setToTalLotto] = useRecoilState(userLottoState);
  const [isLoading, setIsLoading] = useState(false);
  const currentData = useRecoilValue(userPageDataSelector);
  const [handleView, setHandleView] = useState<ViewType>("Lotto");

  const getLotto = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/auth/lottery`);
      console.log("res :", res);
      if (!res.ok) {
        const errMsg: ResponseMessage = await res.json();
        throw new Error(errMsg.message || "서버 오류가 발생했습니다.");
      } else {
        const data = (await res.json()) as lottoProps[];

        setToTalLotto(data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLotto();
  }, []);
  return (
    <Container>
      <TitleArea>
        <Title
          className={`${handleView === "Lotto" ? "disabled font-bold" : ""}`}
          onClick={() => setHandleView("Lotto")}
        >
          Lotto
        </Title>
        <Title
          className={`${handleView === "Auth" ? "disabled font-bold" : ""}`}
          onClick={() => setHandleView("Auth")}
        >
          내 정보 변경
        </Title>
      </TitleArea>
      <Dashboard>
        {isLoading ? (
          <LoadArea>
            <Loadings />
          </LoadArea>
        ) : handleView === "Lotto" ? (
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
                    createAt={lott.createAt}
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
        ) : (
          <AccountSettings />
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

const TitleArea = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 64px;
  border-bottom: solid 2px #e5e7eb;
  font-size: large;
`;

const Title = styled.div`
  margin-left: 25px;

  &:hover {
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
  }
  &.disabled {
    cursor: default; /* 비활성화 상태의 커서 */
    pointer-events: none; /* 클릭 이벤트 비활성화 */
  }
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
