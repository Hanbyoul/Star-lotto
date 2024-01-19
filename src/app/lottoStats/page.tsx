"use client";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { currentDrawCountState, lottoProps } from "@/\bGlobalState/atom";
import { useRecoilValue } from "recoil";
import handleError from "../utils/handleError";
import Stats from "../components/Stats";
import Loadings from "../components/Loadings";

type ViewType = "all" | "round";

interface ResponseMessage {
  message: string;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [handleView, setHandleView] = useState<ViewType>("all");
  const currentDrawCount = useRecoilValue(currentDrawCountState);
  const [initCount, setInitCount] = useState(currentDrawCount);
  const [lottoData, setLottoData] = useState<lottoProps[]>([]);

  const getLottery = async (count: number) => {
    try {
      setIsLoading(true);
      let fetchURL: string;
      if (handleView === "round") {
        fetchURL = `http://localhost:3000/api/stats_lottery?round=${count}`;
      } else {
        fetchURL = `http://localhost:3000/api/stats_lottery`;
      }

      const res = await fetch(fetchURL);

      if (!res.ok) {
        const errMsg: ResponseMessage = await res.json();
        throw new Error(errMsg.message || "서버 오류가 발생했습니다.");
      } else {
        const data = (await res.json()) as lottoProps[];
        setLottoData(data);
      }
    } catch (error) {
      setLottoData([]);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLottery(initCount);
  }, [handleView, initCount]);

  return (
    <Container>
      <SectionArea>
        <Section
          className={`${handleView === "all" ? "disabled font-bold" : ""} `}
          onClick={() => setHandleView("all")}
        >
          전체 통계
        </Section>
        <Section
          className={`${handleView === "round" ? "disabled font-bold" : ""} `}
          onClick={() => setHandleView("round")}
        >
          회차별 통계
        </Section>
      </SectionArea>
      {isLoading ? (
        <LoadArea>
          <Loadings />
        </LoadArea>
      ) : (
        <>
          <TitleArea>
            {handleView === "all" ? null : (
              <>
                <PrevRound
                  className={`${initCount === 1 ? "disabled" : ""}`}
                  onClick={() => {
                    if (initCount > 1) setInitCount((prev) => prev - 1);
                  }}
                >
                  ❮
                </PrevRound>

                <Title>{initCount} 회</Title>
                <NextRound
                  className={`${
                    initCount === currentDrawCount ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (initCount < currentDrawCount)
                      setInitCount((prev) => prev + 1);
                  }}
                >
                  ❯
                </NextRound>
              </>
            )}
          </TitleArea>
          <ChartArea>
            <Stats lottoData={lottoData} />
          </ChartArea>
        </>
      )}
    </Container>
  );
}

/// WinningNum 리팩토리 후 fetch URL BASE 생성

const Container = styled.div`
  position: relative;
  margin-top: 50px;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  border: solid 1px #e5e7eb;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
`;

const SectionArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: solid 2px #e5e7eb;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  margin: auto;

  color: rgb(107 114 128);
  &:hover {
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
  }
  &.disabled {
    color: black;
    cursor: default; /* 비활성화 상태의 커서 */
    pointer-events: none; /* 클릭 이벤트 비활성화 */
  }
`;

const TitleArea = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: x-large;
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
const ChartArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadArea = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
