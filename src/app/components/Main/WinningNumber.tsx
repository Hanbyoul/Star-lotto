"use client";

import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import LoadingLottery from "./Loading/LoadingLottery";
import { useRecoilValue } from "recoil";
import { currentDrawCountState } from "../../GlobalState/atom";
import handleError from "../../utils/handleError";

interface ResponseMessage {
  message: string;
}

interface lottoParams {
  count: number;
  numbers: number[];
  success: boolean;
  drawDate: Date;
}

const WinningNumber = () => {
  const [lotto, setLotto] = useState<lottoParams | undefined>(undefined);
  const currentDrawCount = useRecoilValue(currentDrawCountState);
  const [count, setCount] = useState(currentDrawCount);

  const getLottery = async (count: number) => {
    if (lotto?.count === count) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/winningNum?round=${count}`
      );

      if (!res.ok) {
        const errMsg: ResponseMessage = await res.json();
        throw new Error(errMsg.message || "서버 오류가 발생했습니다.");
      }

      const lottoData: lottoParams = await res.json();

      setLotto(lottoData);
    } catch (error) {
      setCount((prev) => prev - 1);
      handleError(error);
    }
  };

  useEffect(() => {
    getLottery(count);
  }, [count]);

  return lotto ? (
    <Container>
      <DateBox>
        <PrevRound
          className={`${count === 1 ? "disabled" : ""}`}
          onClick={() => {
            if (count > 1) setCount((prev) => prev - 1);
          }}
        >
          ❮
        </PrevRound>

        <span>{`${lotto.count}회 (${(lotto.drawDate + "").substring(
          0,
          10
        )})`}</span>
        <NextRound
          className={`${count === currentDrawCount ? "disabled" : ""}`}
          onClick={() => {
            if (count < currentDrawCount) setCount((prev) => prev + 1);
          }}
        >
          ❯
        </NextRound>
      </DateBox>
      <BallBox>
        {lotto.numbers?.slice(0, 6).map((num) => (
          <Ball key={`lotto-${num}`} $num={num}>
            {num}
          </Ball>
        ))}
        +<Ball $num={lotto.numbers[6]}>{lotto.numbers[6]}</Ball>
      </BallBox>
    </Container>
  ) : (
    <LoadingLottery />
  );
};

export default WinningNumber;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  justify-content: center;

  @media screen and (max-width: 705px) {
    width: 360px;
  }
`;

const DateBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 35px;
`;

const PrevRound = styled.button`
  position: absolute;
  left: 0px;
  width: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border: 1px solid #e0e0e0;
  margin: auto;
  &:hover {
    font-size: large;
  }

  &.disabled {
    cursor: none;
    pointer-events: none;
    color: #e0e0e0;
  }

  @media screen and (max-width: 705px) {
    &:hover {
      font-size: medium;
    }
  }
`;
const NextRound = styled.button`
  position: absolute;
  right: 0px;
  height: 100%;
  margin: auto;
  width: 30px;

  font-weight: 600;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    font-size: large;
  }

  &.disabled {
    cursor: none;
    pointer-events: none;
    color: #e0e0e0;
  }
  @media screen and (max-width: 705px) {
    &:hover {
      font-size: medium;
    }
  }
`;

const BallBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media screen and (max-width: 705px) {
    width: 100%;
  }
`;

const Ball = styled.div<{ $num: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: ${(props) =>
    props.$num <= 10
      ? "rgb(246,206,7)"
      : props.$num <= 20
      ? "rgb(41,96,244)"
      : props.$num <= 30
      ? "rgb(234,59,61)"
      : props.$num <= 40
      ? "rgb(191,191,191)"
      : "rgb(16,196,102)"};
`;
