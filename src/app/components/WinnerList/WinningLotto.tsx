"use client";

import { styled } from "styled-components";
import { currentDrawCountState } from "../../../GlobalState/atom";
import sortWinnersByRank from "../../utils/sortWinnersByRank";
import handleError from "../../utils/handleError";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Winner from "./Winner";
import Loadings from "../Loadings";
import PageNation from "../PageNation";
type LottoData = {
  lottoDocs: LotteryWinner[];
};
export interface LotteryWinner {
  createAt: Date;
  numbers: number[];
  owner: { userId: string };
  rank: number;
}

interface ResponseMessage {
  message: string;
}

export default function WinningLotto() {
  const currentDrawCount = useRecoilValue(currentDrawCountState);
  const [initCount, setInitCount] = useState(currentDrawCount);
  const [isLoading, setIsLoading] = useState(false);

  const [lottoData, setLottoData] = useState<LotteryWinner[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pagesToShow = 8;
  const lastLotto = currentPage * pagesToShow;
  const firstLotto = lastLotto - pagesToShow;
  const [viewData, setViewData] = useState<LotteryWinner[]>([]);

  const getWinningLotto = async (count: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/winningList?round=${count}`
      );

      if (!res.ok) {
        const errMsg: ResponseMessage = await res.json();
        throw new Error(errMsg.message || "서버 오류가 발생했습니다.");
      }

      const { lottoDocs }: LottoData = await res.json();

      const data = lottoDocs && sortWinnersByRank(lottoDocs);

      setLottoData(data);
      setTotalPage(data.length);
    } catch (error) {
      handleError(error);
      setLottoData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWinningLotto(initCount);
    setCurrentPage(1);
  }, [initCount]);

  useEffect(() => {
    if (lottoData.length > 0) {
      setViewData(lottoData.slice(firstLotto, lastLotto));
    }
  }, [lottoData, currentPage]);

  return (
    <Container>
      {isLoading ? (
        <div className="mt-48">
          <Loadings />
        </div>
      ) : (
        <>
          <RoundArea>
            <PrevRound
              className={`${initCount === 1 ? "disabled" : ""}`}
              onClick={() => {
                if (initCount > 1) setInitCount((prev) => prev - 1);
              }}
            >
              ❮
            </PrevRound>
            <Round>제 {initCount}회 당첨자</Round>
            <NextRound
              className={`${initCount === currentDrawCount ? "disabled" : ""}`}
              onClick={() => {
                if (initCount < currentDrawCount)
                  setInitCount((prev) => prev + 1);
              }}
            >
              ❯
            </NextRound>
          </RoundArea>
          {lottoData.length > 0 ? (
            <WinnerList>
              {viewData?.map((lotto, index) => (
                <Winner key={`lotto-${index}`} {...lotto} />
              ))}
            </WinnerList>
          ) : (
            <>
              <NoneUser>당첨자가 없습니다.</NoneUser>
            </>
          )}
          <PageArea>
            <PageNation
              totalPage={totalPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagesToShow={pagesToShow}
            />
          </PageArea>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoundArea = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Round = styled.div`
  font-weight: 500;
`;

const PrevRound = styled.button`
  width: 20px;
  font-weight: 600;
  margin-right: 10px;
  &:hover {
    font-size: large;
  }

  &.disabled {
    cursor: none;
    pointer-events: none;
    color: #e0e0e0;
  }
`;
const NextRound = styled.button`
  width: 20px;
  font-weight: 600;
  margin-left: 10px;

  &:hover {
    font-size: large;
  }

  &.disabled {
    cursor: none;
    pointer-events: none;
    color: #e0e0e0;
  }
`;

const WinnerList = styled.div`
  border: solid 2px #e5e7eb;
`;

const PageArea = styled.div`
  position: absolute;
  bottom: 20px;
`;

const NoneUser = styled.div`
  margin-top: 3em;
  font-size: x-large;
`;
