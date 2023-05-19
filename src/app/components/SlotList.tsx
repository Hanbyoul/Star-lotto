"use client";

import React from "react";
import styled, { css } from "styled-components";
import SlotLine from "./Slot";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  allSpinState,
  lineStopState,
  numberState,
  listResetState,
  saveBallState,
} from "@/store/atom";
import shuffleArray from "../hooks/ShuffleArray";

const SlotLineList = () => {
  const [numbers, setNumbers] = useRecoilState(numberState);
  const [lineStopCount, setLineStopCount] = useRecoilState(lineStopState);
  const setAllSpin = useSetRecoilState(allSpinState);
  const [saveBall, setSaveBall] = useRecoilState(saveBallState);
  const setListReset = useSetRecoilState(listResetState);

  const reShuffle = () => {
    if (saveBall.length >= 66) {
      return alert("리스트가 가득찼습니다.");
    }

    if (lineStopCount === numbers.length) {
      setLineStopCount(0);
      const numberArray = Array.from({ length: 45 }, (_, idx) => idx + 1);
      setAllSpin(true);
      setListReset(false);
      setNumbers(() => {
        const shuffleNum = shuffleArray(numberArray);
        return shuffleNum;
      });
    }
  };

  const listReset = () => {
    if (lineStopCount === numbers.length && saveBall.length >= 30) {
      setListReset(true);
      setSaveBall([]);
    }
  };

  /*
  ! 리스트 비우기 버튼 조건부 활성화
   - display에는 5줄부터 보이게.
   - stopCount = 6일때만 disable === false
   - saveBall length
  */

  return (
    <Wrapper>
      <DrawArea>
        {numbers.map((line, index) => (
          <SlotLine key={index} line={line} lineIndex={index} />
        ))}
      </DrawArea>
      <Footer>
        <RestartBtn
          onClick={reShuffle}
          disabled={lineStopCount === numbers.length ? false : true}
        >
          다시 뽑기
        </RestartBtn>
        <RemoveBtn
          $saveBall={saveBall}
          onClick={listReset}
          disabled={lineStopCount === numbers.length ? false : true}
        >
          LIST비우기
        </RemoveBtn>
      </Footer>
    </Wrapper>
  );
};

export default SlotLineList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid powderblue;
  width: 700px;
  height: 500px;
`;

const DrawArea = styled.div`
  border: 2px solid orange;
  width: 600px;
  min-height: 350px;
  height: auto;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 9px;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid blue;
  width: 600px;
  height: 100%;
  margin: auto;
`;

const RestartBtn = styled.button`
  width: 100px;
  height: 50px;
  background-color: rgb(234, 59, 61);
  color: white;
  font-size: x-large;
  border-radius: 12px;
  ${(props) =>
    props.disabled === true &&
    css`
      display: none;
    `}
`;

const RemoveBtn = styled.button<{ $saveBall: number[] }>`
  align-self: center;
  width: 100px;
  height: 50px;
  background-color: rgb(234, 59, 61);
  color: white;
  font-size: large;
  border-radius: 12px;
  ${(props) =>
    props.$saveBall.length >= 30
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `}
`;
