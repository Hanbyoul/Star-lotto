"use client";

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getLottoCount } from "../utils/latestCount";
import LoadingLottery from "./Loading/LoadingLottery";
import { useSetRecoilState } from "recoil";
import { currentDrawCountState } from "@/store/atom";

export interface lottoParams {
  count: number;
  numbers: number[];
  success: boolean;
  drawDate: Date;
}

const WinningNumber = () => {
  const day = new Date();
  const latestCount = getLottoCount(day);
  const [lotto, setLotto] = useState<lottoParams>();
  const [count, setCount] = useState(latestCount);
  const setCurrentDrawCount = useSetRecoilState(currentDrawCountState);

  const getLottery = async (count: number) => {
    const res = await fetch(
      `http://localhost:3000/api/winningNum?round=${count}`
    );
    const lottoData: lottoParams = await res.json();
    console.log(lottoData);

    if (!lottoData.success) {
      setCount((prev) => prev - 1);
    } else {
      setLotto(lottoData);
    }
  };

  const inCrease = () => {
    if (count < latestCount) setCount((prev) => prev + 1);
  };

  const deCrease = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentDrawCount(latestCount);
  }, []);

  useEffect(() => {
    getLottery(count);
  }, [count]);

  return lotto ? (
    <Wrapper>
      <DateBox className="text-center">
        <button onClick={deCrease} disabled={count === 0 ? true : false}>
          {"❮"}
        </button>
        <span>{`${lotto.count}회 (${(lotto.drawDate + "").substring(
          0,
          10
        )})`}</span>
        <button
          onClick={inCrease}
          disabled={count === latestCount ? true : false}
        >
          {"❯"}
        </button>
      </DateBox>
      <BallBox>
        {lotto.numbers?.slice(0, 6).map((num) => (
          <Ball key={num} $num={num}>
            {num}
          </Ball>
        ))}
        +<Ball $num={lotto.numbers[6]}>{lotto.numbers[6]}</Ball>
      </BallBox>
    </Wrapper>
  ) : (
    <LoadingLottery />
  );
};

export default WinningNumber;

const Wrapper = styled.div`
  @media screen and (max-width: 705px) {
    margin: 30px 0;
  }
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f5f6fa;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const BallBox = styled.div`
  @media screen and (max-width: 705px) {
    width: 350px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 270px;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Ball = styled.div<{ $num: number }>`
  @media screen and (max-width: 705px) {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin: auto;
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
