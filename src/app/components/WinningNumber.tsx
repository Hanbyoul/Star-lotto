"use client";

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getLottoCount } from "../hooks/latestCount";
import LoadingLottery from "./LoadingLottery";

interface IData {
  drwNo: number;
  drwNoDate: Date;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}

const WinningNumber = () => {
  const day = new Date();
  const latestCount = getLottoCount(day);
  const [data, setData] = useState<IData>();
  const [count, setCount] = useState(latestCount);

  const getLottery = async (count: number) => {
    const { data } = await (
      await fetch(`http://localhost:3000/api/lottery?id=${count}`)
    ).json();
    setData(data);
  };

  const inCrease = () => {
    if (count < latestCount) setCount((prev) => prev + 1);
  };

  const deCrease = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  useEffect(() => {
    getLottery(count);
  }, [count]);

  return data ? (
    <Wrapper>
      <DateBox className="text-center">
        <button onClick={deCrease}>{"<"}</button>
        {`${data.drwNo}회 (${data.drwNoDate})`}
        <button onClick={inCrease}>{">"}</button>
      </DateBox>
      <BallBox>
        <Ball $num={data.drwtNo1}>{data.drwtNo1}</Ball>
        <Ball $num={data.drwtNo2}>{data.drwtNo2}</Ball>
        <Ball $num={data.drwtNo3}>{data.drwtNo3}</Ball>
        <Ball $num={data.drwtNo4}>{data.drwtNo4}</Ball>
        <Ball $num={data.drwtNo5}>{data.drwtNo5}</Ball>
        <Ball $num={data.drwtNo6}>{data.drwtNo6}</Ball>+
        <Ball $num={data.bnusNo}>{data.bnusNo}</Ball>
      </BallBox>
    </Wrapper>
  ) : (
    <LoadingLottery />
  );
};

export default WinningNumber;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f5f6fa;
`;

const BallBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 240px;
  height: 50px;
`;

const Ball = styled.div<{ $num: number }>`
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
