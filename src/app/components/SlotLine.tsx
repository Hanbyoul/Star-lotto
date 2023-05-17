"use client";

import { numberKey, numberState, selectList } from "@/store/atom";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

interface IBallProps {
  num: number;
}

const SlotLine = () => {
  const shuffleArray = (array: numberKey[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const numbers = useRecoilValue(numberState);
  const [hydrated, setHydrated] = useState(false);
  const shuffleNum = shuffleArray([...numbers]);
  const [currentBall, setCurrentBall] = useState(shuffleNum);
  const [selectBall, setSelectBall] = useRecoilState(selectList);
  // const shuffleNumber = shuffleArray([...numbers]);
  // console.log(shuffleNumber);
  // const NewNum = [...shuffleNumber];
  // console.log(NewNum);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    removeBall();
  }, [selectBall]);

  const saveBall = () => {
    setSelectBall((prev) => {
      const target = 33;
      const CopyList = [...prev];
      CopyList.push(target);
      return CopyList;
    });
  };

  const removeBall = () => {
    setCurrentBall((prev) => {
      const newBall = prev.filter((n) => !selectBall.includes(n));
      return newBall;
    });
  };

  console.log(selectBall);
  console.log(currentBall.length);
  return (
    <Container>
      <ViewZone>
        <Line>
          {hydrated &&
            currentBall.map((n) => (
              <Ball key={n + ""} num={n}>
                {n}
              </Ball>
            ))}
        </Line>
      </ViewZone>
      {/* <StopBtn onClick={removeBall}>정지</StopBtn> */}
      <StopBtn onClick={saveBall}>선택</StopBtn>
    </Container>
  );
};

export default SlotLine;
const Container = styled.div`
  position: relative;
`;
const spin = keyframes`

  0% { transform: translateY(-3780px); }
  100% { transform: translateY(0px); }
  
`;

const ViewZone = styled.div`
  border: 4px solid brown;
  height: 91px;
  width: 91px;

  /* overflow: hidden; */
`;
const Line = styled.div`
  /* animation: ${spin} 5s 1; */
  animation: ${spin} 30s linear infinite;
  display: flex;
  flex-direction: column;
`;
const Ball = styled.div<IBallProps>`
  height: 84px;
  width: 84px;
  font-size: xx-large;
  color: white;
  background-color: ${(props) =>
    props.num <= 10
      ? "rgb(246,206,7)"
      : props.num <= 20
      ? "rgb(41,96,244)"
      : props.num <= 30
      ? "rgb(234,59,61)"
      : props.num <= 40
      ? "rgb(191,191,191)"
      : "rgb(16,196,102)"};
  border-radius: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StopBtn = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 25px;
  background-color: red;
  position: relative;
  top: 100px;
`;

// 컴포넌트 작명 고민해보기

// 상태관리를 어떻게 할지 고민하기

// 슬롯머신 형식으로 가려면
//li 태그로 1~45까지의 숫자 배열을 생성하여 map돌리고
// 우선은 숫자 하나에 대해서 슬롯 기능을 넣어서 만들어보자.

//
