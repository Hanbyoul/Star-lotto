"use client";

import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import { styled } from "styled-components";
import Stats from "../components/MyList/Stats";
import { lottoProps } from "@/\bGlobalState/atom";
import LottoList from "../components/MyList/LottoList";
import PageNation from "../components/PageNation";
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
  const [isLoading, setIsLoading] = useState(false);
  const [handleView, setHandleView] = useState<ViewType>("Lotto");

  const [lottoData, setLottoData] = useState<lottoProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pagesToShow = 5;
  const lastLotto = currentPage * pagesToShow;
  const firstLotto = lastLotto - pagesToShow;
  const [viewData, setViewData] = useState<lottoProps[]>([]);

  const getLotto = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/auth/lottery`);

      if (!res.ok) {
        const errMsg: ResponseMessage = await res.json();
        throw new Error(errMsg.message || "서버 오류가 발생했습니다.");
      } else {
        const data = (await res.json()) as lottoProps[];
        setLottoData(data);
        setTotalPage(data.length);
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

  useEffect(() => {
    if (lottoData.length > 0) {
      setViewData(lottoData.slice(firstLotto, lastLotto));
    }
  }, [lottoData, currentPage]);

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
              <Stats lottoData={lottoData} />
            </Section>
            <Section className="border-solid border-l">
              {lottoData.length > 0 ? (
                viewData.map((lott) => (
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
              <PageArea>
                <PageNation
                  totalPage={totalPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pagesToShow={pagesToShow}
                />
              </PageArea>
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

const PageArea = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
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
