"use client";

import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { getLottoCount } from "../utils/latestCount";
import LoadingLottery from "./Main/Loading/LoadingLottery";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentDrawCountState,
  currentWinningState,
  lottoParams,
} from "@/\bGlobalState/atom";

const WinningNumber = () => {
  const day = new Date();
  const latestCount = getLottoCount(day);
  const [lotto, setLotto] = useRecoilState(currentWinningState);
  const [count, setCount] = useState(latestCount);
  const setCurrentDrawCount = useSetRecoilState(currentDrawCountState);

  const getLottery = async (count: number) => {
    if (lotto?.count === count) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/winningNum?round=${count}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error : ${res.status}`);
      }

      const lottoData: lottoParams = await res.json();
      console.log(lottoData);

      if (!lottoData.success) {
        setCount((prev) => prev - 1);
      } else {
        setLotto(lottoData);
      }
    } catch (error) {
      console.error("Fetching Error", error);
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
    <Container>
      <DateBox>
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
    </Container>
  ) : (
    <LoadingLottery />
  );
};

export default WinningNumber;

const Container = styled.div`
  /* @media screen and (max-width: 705px) {
    margin: 30px 0;
  } */
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
  /* @media screen and (max-width: 705px) {
    width: 350px;
  } */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 270px;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Ball = styled.div<{ $num: number }>`
  /* @media screen and (max-width: 705px) {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  } */
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
