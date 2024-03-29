"use client";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { currentDrawCountState, lottoProps } from "../GlobalState/atom";
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
  const latestCount = currentDrawCount + 1;
  const [initCount, setInitCount] = useState(latestCount);
  const [lottoData, setLottoData] = useState<lottoProps[]>([]);
  const getLottery = async (count: number) => {
    try {
      setIsLoading(true);
      let fetchURL: string;
      if (handleView === "round") {
        fetchURL = `${process.env.NEXT_PUBLIC_BASE_URL}/stats_lottery?round=${count}`;
      } else {
        fetchURL = `${process.env.NEXT_PUBLIC_BASE_URL}/stats_lottery`;
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
                  className={`${initCount === latestCount ? "disabled" : ""}`}
                  onClick={() => {
                    if (initCount < latestCount)
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

const Container = styled.div`
  position: relative;
  margin-top: 50px;
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  border: solid 1px #e5e7eb;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  @media screen and (max-width: 705px) {
    border-radius: 0px;
    width: 100%;
  }
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
    cursor: pointer;
  }
  &.disabled {
    color: black;
    cursor: default;
    pointer-events: none;
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
  width: 30px;

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
  @media screen and (max-width: 705px) {
    font-size: large;
  }
`;
const NextRound = styled.button`
  width: 30px;
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

  @media screen and (max-width: 705px) {
    font-size: large;
  }
`;
const ChartArea = styled.div``;

const LoadArea = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
