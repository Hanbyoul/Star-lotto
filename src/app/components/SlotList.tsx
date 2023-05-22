"use client";

import React from "react";
import styled, { css } from "styled-components";
import Slot from "./Slot";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allSpinState,
  spinStopState,
  numberState,
  listResetState,
  saveListState,
} from "@/store/atom";
import shuffleArray from "../hooks/ShuffleArray";
import { LINE_LIMITED_COUNT } from "../constant/lineCount";

const SlotList = () => {
  const [numbers, setNumbers] = useRecoilState(numberState);
  const [spinStopCount, setSpinStopCount] = useRecoilState(spinStopState);
  const setAllSpin = useSetRecoilState(allSpinState);
  const saveList = useRecoilValue(saveListState);
  const setListReset = useSetRecoilState(listResetState);

  const reShuffle = () => {
    if (saveList.length >= 60) {
      return alert("리스트가 가득찼습니다.");
    }

    if (spinStopCount === numbers.length) {
      setSpinStopCount(0);
      const numberArray = Array.from({ length: 45 }, (_, idx) => idx + 1);
      setAllSpin(true);
      setListReset(false);
      setNumbers(() => {
        const shuffleNum = shuffleArray(numberArray);
        return shuffleNum;
      });
    }
  };

  /**
   * TODO: LIST RESET 버튼 컴포넌트 변경. >>>SaveLIST
   */

  return (
    <Wrapper>
      <DrawArea>
        {numbers.map((line, index) => (
          <Slot key={index} line={line} lineIndex={index} />
        ))}
      </DrawArea>
      <Footer>
        <RestartBtn
          onClick={reShuffle}
          disabled={spinStopCount === LINE_LIMITED_COUNT ? false : true}
        >
          뽑기
        </RestartBtn>
      </Footer>
    </Wrapper>
  );
};

export default SlotList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawArea = styled.div`
  @media screen and (max-width: 705px) {
    width: 100%;
    height: 100%;
    gap: 5px;
    border-radius: 15px;
  }

  margin: 30px auto;
  width: 700px;
  height: 180px;
  padding: 10px;
  background-color: orange;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-radius: 40px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

const RestartBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 12px;
  background-color: rgb(234, 59, 61);
  color: white;
  font-size: x-large;
  ${(props) =>
    props.disabled &&
    css`
      background-color: gray;
    `}
`;
