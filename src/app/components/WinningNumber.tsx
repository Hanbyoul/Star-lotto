"use client";

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getLottoCount } from "../utils/latestCount";
import LoadingLottery from "./Loading/LoadingLottery";
import { useSetRecoilState } from "recoil";
import { currentDrawCountState } from "@/store/atom";

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
  const setCurrentDrawCount = useSetRecoilState(currentDrawCountState);

  const getLottery = async (count: number) => {
    const { data } = await (
      await fetch(`http://localhost:3000/api/winningNum?id=${count}`)
    ).json();

    /**
     * ?현재 날짜가 추첨일이 되어 count가 증가 했으나 , API가 업데이트 하지 않았을 경우 -1 하여 렌더링이 됨.
     * if (data?.returnValue === "fail") {
     * setCount((prev) => prev - 1);
     * }
     */

    /**
     * 프론트단 에서는 DB에있는 최신 회차를  백앤드를 통해 가져오도록 로직을 변경해야함.
     * TODO: 프론트에선 DB에있는 DATA를 백을 통해서 받아야 한다
     */

    setData(data);
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

  return data ? (
    <Wrapper>
      <DateBox className="text-center">
        <button onClick={deCrease} disabled={count === 0 ? true : false}>
          {"❮"}
        </button>
        {`${data.drwNo}회 (${data.drwNoDate})`}
        <button
          onClick={inCrease}
          disabled={count === latestCount ? true : false}
        >
          {"❯"}
        </button>
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
